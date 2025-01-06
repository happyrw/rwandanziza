"use server";

import { ID, Query } from "node-appwrite";
import {
  DATABASE_ID,
  databases,
  ENDPOINT,
  NEXT_PUBLIC_BUCKET_ID,
  PROJECT_ID,
  POSTS_COLLECTION_ID,
  storage,
  SUB_SERVICES_COLLECTION_ID,
  USER_COLLECTION_ID,
} from "../appwrite.config";
import { currentUser } from "@clerk/nextjs/server";
import { extractFileId } from "../utils";

/**
 * USER RELATED FUNCTIONS
 */
export async function saveUserToDB() {
  const user = await currentUser();
  const email = user?.emailAddresses[0].emailAddress;

  if (!user?.id || !email) {
    throw new Error("User data not available");
  }

  const existingUser = await databases.listDocuments(
    DATABASE_ID!,
    USER_COLLECTION_ID!,
    [Query.equal("email", email)]
  );

  if (existingUser.total === 0) {
    await databases.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        userId: user.id,
        email: email,
      }
    );
  }

  return { success: true };
}

/**
 * FILE RELATED FUNCTIONS
 */
export const createFile = async (files: File[]) => {
  try {
    // CREATE MAIN_IMAGES
    const uploadPromises = files.map(async (file: any, index: any) => {
      const fileId = ID.unique();
      const fileName = `mainImage-${index}.jpeg`;
      const response = await storage.createFile(
        NEXT_PUBLIC_BUCKET_ID!,
        fileId,
        new File([file], fileName, { type: file.type })
      );

      return {
        id: response.$id,
        url: `${ENDPOINT}/storage/buckets/${NEXT_PUBLIC_BUCKET_ID}/files/${response.$id}/view?project=${PROJECT_ID}`,
      };
    });
    const filesInfo = await Promise.all(uploadPromises);
    return filesInfo;
  } catch (error) {
    console.log("Error during file upload:", error);
  }
};

export const deleteFile = async (fileIdToDelete: string) => {
  try {
    await storage.deleteFile(NEXT_PUBLIC_BUCKET_ID!, fileIdToDelete);
    return { success: true };
  } catch (error) {
    console.log(error);
  }
};

const safeDeleteFile = async (fileId: string) => {
  try {
    await storage.deleteFile(NEXT_PUBLIC_BUCKET_ID!, fileId);
    return { success: true };
  } catch (error: any) {
    if (error.code === 404) {
      console.warn(`File with ID ${fileId} not found.`);
      return;
    } else {
      throw error;
    }
  }
};

/**
 * CREATION RELATED FUNCTIONS
 */
export const createPost = async (payload: PayloadData, category: string) => {
  try {
    const user = await currentUser();
    if (!user?.id) throw new Error("Issue with user");

    const latitude = parseFloat(payload.latitude);
    const longitude = parseFloat(payload.longitude);

    if (isNaN(latitude) || isNaN(longitude)) {
      throw new Error("Invalid latitude or longitude values");
    }

    const {
      title,
      tiptap,
      images,
      youtubeUrl,
      date,
      subServices,
      subCategory,
      city,
      item,
      province,
      district,
    } = payload;

    const postDocument = await databases.createDocument(
      DATABASE_ID!,
      POSTS_COLLECTION_ID!,
      ID.unique(),
      {
        userId: user.id,
        category,
        title,
        description: tiptap,
        latitude,
        longitude,
        images,
        subCategory,
        city,
        item,
        province,
        district,
        youtubeUrl,
        date: date || null,
      }
    );

    if (subServices && subServices.length > 0) {
      subServices
        .filter(
          (subService: any) =>
            subService.description.trim() !== "" || subService.images.length > 0
        )
        .map(async (subService: any, idx: number) => {
          const { description, images } = subService;
          await databases.createDocument(
            DATABASE_ID!,
            SUB_SERVICES_COLLECTION_ID!,
            ID.unique(),
            {
              description,
              images,
              parentId: postDocument.$id,
              idx,
            }
          );
        });
    }

    return { success: true };
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

/**
 * UPDATING RELATED FUNCTIONS
 */
export const updatePost = async (payload: PayloadData) => {
  try {
    const user = await currentUser();
    if (!user?.id) throw new Error("Issue with user");

    // Fetch the post to validate ownership and existence
    const post = await fetchPostByPostId(payload.postId!);
    if (!post) throw new Error("Post not found");

    if (post.userId !== user.id)
      throw new Error("You don't have permission to proceed");

    const latitude = parseFloat(payload.latitude);
    const longitude = parseFloat(payload.longitude);

    if (isNaN(latitude) || isNaN(longitude)) {
      throw new Error("Invalid latitude or longitude values");
    }

    const {
      title,
      tiptap,
      images,
      youtubeUrl,
      subServices,
      date,
      category,
      subCategory,
      city,
      item,
      province,
      district,
    } = payload;

    // Update the main post document
    const updatedPost = await databases.updateDocument(
      DATABASE_ID!,
      POSTS_COLLECTION_ID!,
      payload.postId!,
      {
        title,
        description: tiptap,
        latitude,
        longitude,
        images,
        subCategory,
        city,
        item,
        province,
        district,
        youtubeUrl,
        date: date || null,
        category,
      }
    );

    // Handle subServices if applicable
    if (subServices && subServices.length > 0) {
      await processSubServices(payload.postId!, subServices);
    }

    console.log("updatedPost", updatePost);

    return { success: true, postId: updatedPost.$id };
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

const processSubServices = async (
  parentId: string,
  subServices: any[]
): Promise<void> => {
  try {
    // Fetch existing sub-services for the parent post
    const existingSubServices = await databases.listDocuments(
      DATABASE_ID!,
      SUB_SERVICES_COLLECTION_ID!,
      //@ts-ignore
      [Query.equal("parentId", parentId)]
    );

    const existingSubServiceIds = existingSubServices.documents.map(
      (doc) => doc.$id
    );

    // Process each sub-service from the payload
    for (const [index, subService] of subServices.entries()) {
      const { id, description, images } = subService;

      if (description.trim() !== "" || images.length > 0) {
        if (id && existingSubServiceIds.includes(id)) {
          // Update existing sub-service
          await databases.updateDocument(
            DATABASE_ID!,
            SUB_SERVICES_COLLECTION_ID!,
            id,
            { description, images }
          );
        } else {
          // Create new sub-service (assign idx only for new ones)
          await databases.createDocument(
            DATABASE_ID!,
            SUB_SERVICES_COLLECTION_ID!,
            ID.unique(),
            { description, images, parentId, idx: index } // Add idx for new sub-services
          );
        }
      }
    }

    // Delete sub-services that are no longer in the payload
    const payloadSubServiceIds = subServices
      .map((s: any) => s.id)
      .filter(Boolean);
    const subServicesToDelete = existingSubServiceIds.filter(
      (id) => !payloadSubServiceIds.includes(id)
    );

    for (const subServiceId of subServicesToDelete) {
      await databases.deleteDocument(
        DATABASE_ID!,
        SUB_SERVICES_COLLECTION_ID!,
        subServiceId
      );
    }
  } catch (error) {
    console.error("Error processing sub-services:", error);
    throw error;
  }
};

/**
 * DELETE DATA FROM DATABASE
 */
export const deletePost = async (postId: string) => {
  try {
    const user = await currentUser();
    if (!user?.id) throw new Error("Issue with user");

    // Fetch the post
    const post = await databases.getDocument(
      DATABASE_ID!,
      POSTS_COLLECTION_ID!,
      postId
    );
    if (!post) throw new Error("Post not found");

    // Check permissions
    if (post.userId !== user.id) {
      throw new Error("You don't have permission to proceed.");
    }

    // Delete all sub-services if they exist
    if (post.subServices && post.subServices.length > 0) {
      for (const subService of post.subServices) {
        if (subService.images && subService.images.length > 0) {
          const deleteFilePromises = subService.images.map((image: string) => {
            const fileId = extractFileId(image);
            return safeDeleteFile(fileId!);
          });

          await Promise.allSettled(deleteFilePromises);
        }

        await databases.deleteDocument(
          DATABASE_ID!,
          SUB_SERVICES_COLLECTION_ID!,
          subService.$id
        );
      }
    }

    // Delete all post images if they exist
    if (post.images && post.images.length > 0) {
      const deletePostImagesPromises = post.images.map((image: string) => {
        const fileId = extractFileId(image);
        return safeDeleteFile(fileId!);
      });

      await Promise.allSettled(deletePostImagesPromises);
    }

    // Delete the post document
    await databases.deleteDocument(DATABASE_ID!, POSTS_COLLECTION_ID!, postId);

    return { success: true };
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

/**
 * FETCHING DATA FROM DATABASE
 */
// export const getRecentPosts = async () => {
//   try {
//     const recentPosts = await databases.listDocuments(
//       DATABASE_ID!,
//       POSTS_COLLECTION_ID!,
//       [Query.orderDesc("$createdAt"), Query.limit(20)]
//     );

//     return recentPosts.documents;
//   } catch (error) {
//     console.error("Failed to fetch recent posts:", error);
//     throw error;
//   }
// };

export const getInfinitePosts = async ({
  pageParam,
  category,
}: {
  pageParam?: string;
  category?: string;
}) => {
  const limit = 20;

  const queries = (cursor?: string) => [
    Query.orderDesc("$createdAt"),
    Query.limit(limit),
    ...(category
      ? [
          Query.or([
            Query.equal("subCategory", category),
            Query.equal("category", category),
          ]),
        ]
      : []),
    ...(cursor ? [Query.cursorAfter(cursor)] : []),
  ];

  try {
    const response = await databases.listDocuments(
      DATABASE_ID!,
      POSTS_COLLECTION_ID!,
      queries(pageParam)
    );

    // Determine the next cursor
    const nextCursor = response.documents.length
      ? response.documents[response.documents.length - 1].$id
      : null;

    // Check if there are more posts
    const hasMore = response.documents.length === limit;

    // Return the fetched documents, next cursor, and hasMore flag
    return {
      documents: response.documents,
      nextCursor,
      hasMore,
    };
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw error;
  }
};

export const fetchPostByUserId = async (userId: string) => {
  try {
    const userPost = await databases.listDocuments(
      DATABASE_ID!,
      POSTS_COLLECTION_ID!,
      [Query.equal("userId", userId), Query.orderDesc("$createdAt")]
    );

    return userPost;
  } catch (error) {
    console.error("Failed to fetch posts by user ID:", error);
    throw error;
  }
};

export const fetchPostByPostId = async (postId: string) => {
  try {
    const post = await databases.getDocument(
      DATABASE_ID!,
      POSTS_COLLECTION_ID!,
      postId
    );

    if (!post) {
      throw new Error("Post not found");
    }

    // Fetch all associated sub-services for the post
    const subServices = await databases.listDocuments(
      DATABASE_ID!,
      SUB_SERVICES_COLLECTION_ID!,
      [Query.equal("parentId", postId), Query.orderAsc("idx")]
    );

    post.subServices = subServices.documents;
    console.log("Post", post);
    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};

// export const fetchPostBySubCategory = async (subcategory: string) => {
//   try {
//     // Use listDocuments with a filter on the `subcategory` field
//     const response = await databases.listDocuments(
//       DATABASE_ID!,
//       POSTS_COLLECTION_ID!,
//       [Query.equal("subcategory", subcategory)]
//     );

//     return response.documents; // Return the array of posts
//   } catch (error) {
//     console.error("Error fetching posts by subcategory:", error);
//     throw error;
//   }
// };

/**
 * LIKE POST
 */
export const likePost = async (postId: string, likesArray: string[]) => {
  try {
    const updatedPost = await databases.updateDocument(
      DATABASE_ID!,
      POSTS_COLLECTION_ID!,
      postId,
      {
        likes: likesArray,
      }
    );

    return updatedPost;
  } catch (error) {
    console.error("Error liking post:", error);
    throw error;
  }
};

/**
 * SEARCH POST
 */
export const searchPosts = async (
  searchTerm?: string,
  limit = 10,
  offset = 0
) => {
  try {
    const queries = [];
    if (searchTerm) {
      queries.push(
        Query.or([
          Query.search("title", searchTerm),
          Query.equal("item", searchTerm),
        ])
      );
    }

    const searchResults = await databases.listDocuments(
      DATABASE_ID!,
      POSTS_COLLECTION_ID!,
      [...queries, Query.limit(limit), Query.offset(offset)]
    );

    return searchResults.documents;
  } catch (error) {
    console.error("Error searching posts:", error);
    throw error;
  }
};

// ||query implementation
export const searchPostsByTitle = async () => {
  try {
    // Fetch all documents from the database
    const searchResults = await databases.listDocuments(
      DATABASE_ID!,
      POSTS_COLLECTION_ID!
    );

    // Filter posts where subcategory === 'experience'
    const experiences = searchResults.documents.filter(
      (post) => post.subCategory === "experience"
    );
    const activities = searchResults.documents.filter(
      (post) => post.subCategory === "activity"
    );
    const tips = searchResults.documents.filter(
      (post) => post.subCategory === "tips"
    );

    return { experiences, activities, tips };
  } catch (error) {
    console.error("Error searching posts:", error);
    throw error;
  }
};

export const searchNewsPosts = async () => {
  try {
    // Fetch all documents from the database
    const searchResults = await databases.listDocuments(
      DATABASE_ID!,
      POSTS_COLLECTION_ID!,
      [Query.equal("category", "News")]
    );

    // Filter posts where subcategory === 'experience'
    const localNews = searchResults.documents.filter(
      (post) => post.subCategory === "localNews"
    );
    const tipsNews = searchResults.documents.filter(
      (post) => post.subCategory === "tips"
    );
    const culturalNews = searchResults.documents.filter(
      (post) => post.subCategory === "culturalNews"
    );
    const guestNews = searchResults.documents.filter(
      (post) => post.subCategory === "guestNews"
    );

    return { localNews, culturalNews, tipsNews, guestNews };
  } catch (error) {
    console.error("Error searching posts:", error);
    throw error;
  }
};
