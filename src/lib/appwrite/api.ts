"use server";

import { ID, Query } from "node-appwrite";
import {
  DATABASE_ID,
  databases,
  DISTRICT_COLLECTION_ID,
  ECONOMIC_COLLECTION_ID,
  ENDPOINT,
  EVENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID,
  PROJECT_ID,
  PROVINCE_COLLECTION_ID,
  storage,
  SUB_SERVICES_COLLECTION_ID,
  USER_COLLECTION_ID,
} from "../appwrite.config";
import { currentUser } from "@clerk/nextjs/server";
import { extractFileId } from "../utils";

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

    switch (category) {
      case "event":
        await createEvent(payload, user.id, latitude, longitude, category);
        break;
      case "economic":
        await createEconomic(payload, user.id, latitude, longitude, category);
        break;
      case "district":
        await createDistrict(payload, user.id, latitude, longitude, category);
        break;
      case "province":
        await createProvince(payload, user.id, latitude, longitude, category);
        break;
      default:
        throw new Error("Invalid category");
    }

    return { success: true };
  } catch (error) {
    console.log(error);
  }
};

const createEvent = async (
  payload: PayloadData,
  userId: string,
  latitude: number,
  longitude: number,
  category: string
) => {
  const { date, title, tiptap, images, youtubeUrl, subServices, district } =
    payload;

  try {
    const eventDocument = await databases.createDocument(
      DATABASE_ID!,
      EVENT_COLLECTION_ID!,
      ID.unique(),
      {
        userId,
        date,
        title,
        description: tiptap,
        longitude,
        latitude,
        images,
        district,
        youtubeUrl,
        category,
      }
    );

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
            parentId: eventDocument.$id,
            idx,
          }
        );
      });

    return { success: true };
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

const createEconomic = async (
  payload: PayloadData,
  userId: string,
  latitude: number,
  longitude: number,
  category: string
) => {
  const { title, tiptap, images, youtubeUrl, subServices, district } = payload;

  try {
    // CREATE ECONOMIC DOCUMENT
    const economicDocument = await databases.createDocument(
      DATABASE_ID!,
      ECONOMIC_COLLECTION_ID!,
      ID.unique(),
      {
        userId,
        title,
        description: tiptap,
        longitude,
        latitude,
        images,
        district,
        youtubeUrl,
        category,
      }
    );

    // CREATE SUB_SERVICES
    subServices
      .filter(
        (subService: any) =>
          subService.description.trim() !== "" || subService.images.length > 0
      )
      .map(async (subService: any, idx: number) => {
        const { description, images } = subService;
        const response = await databases.createDocument(
          DATABASE_ID!,
          SUB_SERVICES_COLLECTION_ID!,
          ID.unique(),
          {
            description,
            images,
            parentId: economicDocument.$id,
            idx,
          }
        );
        return response;
      });

    return { success: true };
  } catch (error) {
    console.error("Error creating economic:", error);
    throw error;
  }
};

const createDistrict = async (
  payload: PayloadData,
  userId: string,
  latitude: number,
  longitude: number,
  category: string
) => {
  const { title, tiptap, images, youtubeUrl, subServices, province } = payload;

  try {
    // // CREATE DISTRICT DOCUMENT
    const districtDocument = await databases.createDocument(
      DATABASE_ID!,
      DISTRICT_COLLECTION_ID!,
      ID.unique(),
      {
        userId,
        title,
        description: tiptap,
        longitude,
        latitude,
        images,
        province,
        youtubeUrl,
        category,
      }
    );

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
            parentId: districtDocument.$id,
            idx,
          }
        );
      });

    return { success: true };
  } catch (error) {
    console.error("Error creating district:", error);
    throw error;
  }
};

const createProvince = async (
  payload: PayloadData,
  userId: string,
  latitude: number,
  longitude: number,
  category: string
) => {
  const { title, tiptap, images, youtubeUrl, subServices } = payload;

  try {
    // // CREATE PROVINCE DOCUMENT
    const provinceDocument = await databases.createDocument(
      DATABASE_ID!,
      PROVINCE_COLLECTION_ID!,
      ID.unique(),
      {
        userId,
        title,
        description: tiptap,
        longitude,
        latitude,
        images,
        youtubeUrl,
        category,
      }
    );

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
            parentId: provinceDocument.$id,
            idx,
          }
        );
      });

    return { success: true };
  } catch (error) {
    console.error("Error creating province:", error);
    throw error;
  }
};

/**
 * UPDATING RELATED FUNCTIONS
 */

export const updatePost = async (payload: PayloadData, category: string) => {
  try {
    const user = await currentUser();
    if (!user?.id) throw new Error("Issue with user");

    const post = await fetchPostByPostId(payload.postId!, category);
    if (!post) throw new Error("Post not found");

    if (post.userId !== user.id)
      throw new Error("You don't have permission to proceed");

    const latitude = parseFloat(payload.latitude);
    const longitude = parseFloat(payload.longitude);

    if (isNaN(latitude) || isNaN(longitude)) {
      throw new Error("Invalid latitude or longitude values");
    }

    switch (category) {
      case "event":
        await updateEvent(payload, latitude, longitude);
        break;
      case "economic":
        await updateEconomic(payload, latitude, longitude);
        break;
      case "district":
        await updateDistrict(payload, latitude, longitude);
        break;
      case "province":
        await updateProvince(payload, latitude, longitude);
        break;
      default:
        throw new Error("Invalid category");
    }

    return { success: true };
  } catch (error) {
    console.log(error);
  }
};

const updateProvince = async (
  payload: PayloadData,
  latitude: number,
  longitude: number
) => {
  const { title, tiptap, images, youtubeUrl, subServices, postId } = payload;

  try {
    // Update the province document
    const provinceDocument = await databases.updateDocument(
      DATABASE_ID!,
      PROVINCE_COLLECTION_ID!,
      postId!,
      {
        title,
        description: tiptap,
        longitude,
        latitude,
        images,
        youtubeUrl,
      }
    );

    // Retrieve existing sub-services for the province
    const existingSubServices = await databases.listDocuments(
      DATABASE_ID!,
      SUB_SERVICES_COLLECTION_ID!,
      //@ts-ignore
      [Query.equal("parentId", postId)]
    );

    const existingSubServiceIds = existingSubServices.documents.map(
      (doc) => doc.$id
    );

    // Process sub-services
    if (subServices && subServices.length > 0) {
      for (const subService of subServices) {
        const { id, description, images } = subService as any;

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
            // Create new sub-service
            await databases.createDocument(
              DATABASE_ID!,
              SUB_SERVICES_COLLECTION_ID!,
              ID.unique(),
              { description, images, parentId: postId }
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
    }

    return provinceDocument.$id;
  } catch (error) {
    console.error("Error updating province:", error);
    throw error;
  }
};

const updateDistrict = async (
  payload: PayloadData,
  latitude: number,
  longitude: number
) => {
  const { title, tiptap, images, youtubeUrl, subServices, postId } = payload;
  try {
    // Update the province document
    const districtDocument = await databases.updateDocument(
      DATABASE_ID!,
      DISTRICT_COLLECTION_ID!,
      postId!,
      {
        title,
        description: tiptap,
        longitude,
        latitude,
        images,
        youtubeUrl,
      }
    );

    // Retrieve existing sub-services for the province
    const existingSubServices = await databases.listDocuments(
      DATABASE_ID!,
      SUB_SERVICES_COLLECTION_ID!,
      //@ts-ignore
      [Query.equal("parentId", postId)]
    );

    const existingSubServiceIds = existingSubServices.documents.map(
      (doc) => doc.$id
    );

    // Process sub-services
    if (subServices && subServices.length > 0) {
      for (const subService of subServices) {
        const { id, description, images } = subService as any;

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
            // Create new sub-service
            await databases.createDocument(
              DATABASE_ID!,
              SUB_SERVICES_COLLECTION_ID!,
              ID.unique(),
              { description, images, parentId: postId }
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
    }

    return districtDocument.$id;
  } catch (error) {
    console.error("Error updating district:", error);
    throw error;
  }
};

const updateEconomic = async (
  payload: PayloadData,
  latitude: number,
  longitude: number
) => {
  const { title, tiptap, images, youtubeUrl, subServices, postId } = payload;

  try {
    // Update the province document
    const economicDocument = await databases.updateDocument(
      DATABASE_ID!,
      ECONOMIC_COLLECTION_ID!,
      postId!,
      {
        title,
        description: tiptap,
        longitude,
        latitude,
        images,
        youtubeUrl,
      }
    );

    // Retrieve existing sub-services for the province
    const existingSubServices = await databases.listDocuments(
      DATABASE_ID!,
      SUB_SERVICES_COLLECTION_ID!,
      //@ts-ignore
      [Query.equal("parentId", postId)]
    );

    const existingSubServiceIds = existingSubServices.documents.map(
      (doc) => doc.$id
    );

    // Process sub-services
    if (subServices && subServices.length > 0) {
      for (const subService of subServices) {
        const { id, description, images } = subService as any;

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
            // Create new sub-service
            await databases.createDocument(
              DATABASE_ID!,
              SUB_SERVICES_COLLECTION_ID!,
              ID.unique(),
              { description, images, parentId: postId }
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
    }

    return economicDocument.$id;
  } catch (error) {
    console.error("Error updating economic:", error);
    throw error;
  }
};

const updateEvent = async (
  payload: PayloadData,
  latitude: number,
  longitude: number
) => {
  const { title, tiptap, images, youtubeUrl, subServices, date, postId } =
    payload;

  try {
    // Update the province document
    const eventDocument = await databases.updateDocument(
      DATABASE_ID!,
      EVENT_COLLECTION_ID!,
      postId!,
      {
        title,
        date,
        description: tiptap,
        longitude,
        latitude,
        images,
        youtubeUrl,
      }
    );

    // Retrieve existing sub-services for the province
    const existingSubServices = await databases.listDocuments(
      DATABASE_ID!,
      SUB_SERVICES_COLLECTION_ID!,
      //@ts-ignore
      [Query.equal("parentId", postId)]
    );

    const existingSubServiceIds = existingSubServices.documents.map(
      (doc) => doc.$id
    );

    // Process sub-services
    if (subServices && subServices.length > 0) {
      for (const subService of subServices) {
        const { id, description, images } = subService as any;

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
            // Create new sub-service
            await databases.createDocument(
              DATABASE_ID!,
              SUB_SERVICES_COLLECTION_ID!,
              ID.unique(),
              { description, images, parentId: postId }
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
    }

    return eventDocument.$id;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

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

/**
 * FETCHING DATA FROM DATABASE
 */

export const getRecentPosts = async () => {
  try {
    const [event, economic, district, province] = await Promise.all([
      databases.listDocuments(DATABASE_ID!, EVENT_COLLECTION_ID!, [
        Query.orderDesc("$createdAt"),
        Query.limit(20),
      ]),
      databases.listDocuments(DATABASE_ID!, ECONOMIC_COLLECTION_ID!, [
        Query.orderDesc("$createdAt"),
        Query.limit(20),
      ]),
      databases.listDocuments(DATABASE_ID!, DISTRICT_COLLECTION_ID!, [
        Query.orderDesc("$createdAt"),
        Query.limit(20),
      ]),
      databases.listDocuments(DATABASE_ID!, PROVINCE_COLLECTION_ID!, [
        Query.orderDesc("$createdAt"),
        Query.limit(20),
      ]),
    ]);

    return [
      ...event.documents,
      ...economic.documents,
      ...district.documents,
      ...province.documents,
    ];
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw error;
  }
};

export const getInfinitePosts = async ({
  pageParam,
  category,
}: {
  pageParam?: string; // Cursor for pagination
  category: "event" | "economic" | "district" | "province"; // Category to fetch
}) => {
  const limit = 20; // Number of posts per fetch

  const queries = (cursor?: string) => [
    Query.orderDesc("$updatedAt"),
    Query.limit(limit),
    ...(cursor ? [Query.cursorAfter(cursor)] : []),
  ];

  try {
    // Map category to collection IDs
    const collectionMap = {
      event: EVENT_COLLECTION_ID,
      economic: ECONOMIC_COLLECTION_ID,
      district: DISTRICT_COLLECTION_ID,
      province: PROVINCE_COLLECTION_ID,
    };

    // Get the collection ID for the selected category
    const collectionId = collectionMap[category];

    if (!collectionId) {
      throw new Error(`Invalid category: ${category}`);
    }

    // Fetch data from the selected collection
    const response = await databases.listDocuments(
      DATABASE_ID!,
      collectionId!,
      queries(pageParam)
    );

    // Get the last document ID as the cursor for pagination
    const nextCursor = response.documents.length
      ? response.documents[response.documents.length - 1].$id
      : null;

    // Check if there are more posts to fetch
    const hasMore = response.documents.length === limit;

    // Return the fetched documents, cursor, and hasMore flag
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
    const [event, economic, district, province] = await Promise.all([
      databases.listDocuments(DATABASE_ID!, EVENT_COLLECTION_ID!, [
        Query.equal("userId", userId),
        Query.orderDesc("$createdAt"),
      ]),
      databases.listDocuments(DATABASE_ID!, ECONOMIC_COLLECTION_ID!, [
        Query.equal("userId", userId),
        Query.orderDesc("$createdAt"),
      ]),
      databases.listDocuments(DATABASE_ID!, DISTRICT_COLLECTION_ID!, [
        Query.equal("userId", userId),
        Query.orderDesc("$createdAt"),
      ]),
      databases.listDocuments(DATABASE_ID!, PROVINCE_COLLECTION_ID!, [
        Query.equal("userId", userId),
        Query.orderDesc("$createdAt"),
      ]),
    ]);

    return [
      ...event.documents,
      ...economic.documents,
      ...district.documents,
      ...province.documents,
    ];
  } catch (error) {
    console.error("Failed to fetch posts by user ID:", error);
    throw error;
  }
};

export const fetchPostByPostId = async (
  postId: string,
  category: string | null
) => {
  try {
    switch (category) {
      case "event":
        const eventPost = await databases.listDocuments(
          DATABASE_ID!,
          EVENT_COLLECTION_ID!,
          [Query.equal("$id", postId)]
        );

        if (eventPost.documents.length === 0) {
          throw new Error("Province post not found");
        }

        const eventData = eventPost.documents[0];

        const subServicesEn = await databases.listDocuments(
          DATABASE_ID!,
          SUB_SERVICES_COLLECTION_ID!,
          [Query.equal("parentId", postId), Query.orderAsc("idx")]
        );

        eventData.subServices = subServicesEn.documents;
        return eventData;
      case "economic":
        const economicPost = await databases.listDocuments(
          DATABASE_ID!,
          ECONOMIC_COLLECTION_ID!,
          [Query.equal("$id", postId)]
        );

        if (economicPost.documents.length === 0) {
          throw new Error("Province post not found");
        }

        const economicData = economicPost.documents[0];

        const subServicesE = await databases.listDocuments(
          DATABASE_ID!,
          SUB_SERVICES_COLLECTION_ID!,
          [Query.equal("parentId", postId), Query.orderAsc("idx")]
        );

        economicData.subServices = subServicesE.documents;
        return economicData;
      case "district":
        const districtPost = await databases.listDocuments(
          DATABASE_ID!,
          DISTRICT_COLLECTION_ID!,
          [Query.equal("$id", postId)]
        );

        if (districtPost.documents.length === 0) {
          throw new Error("Province post not found");
        }

        const districtData = districtPost.documents[0];

        const subServicesD = await databases.listDocuments(
          DATABASE_ID!,
          SUB_SERVICES_COLLECTION_ID!,
          [Query.equal("parentId", postId), Query.orderAsc("idx")]
        );

        districtData.subServices = subServicesD.documents;
        return districtData;
      case "province":
        const provincePost = await databases.listDocuments(
          DATABASE_ID!,
          PROVINCE_COLLECTION_ID!,
          [Query.equal("$id", postId)]
        );

        if (provincePost.documents.length === 0) {
          throw new Error("Province post not found");
        }

        const provinceData = provincePost.documents[0];

        const subServicesP = await databases.listDocuments(
          DATABASE_ID!,
          SUB_SERVICES_COLLECTION_ID!,
          [Query.equal("parentId", postId), Query.orderAsc("idx")]
        );

        provinceData.subServices = subServicesP.documents;
        return provinceData;
      default:
        throw new Error("Invalid category");
    }
  } catch (error) {
    console.log("Failed to fetch posts by user ID:", error);
    throw error;
  }
};

/**
 * DELETE DATA FROM DATABASE
 */

export const deletePost = async (postId: string, category: string) => {
  try {
    const user = await currentUser();
    if (!user?.id) throw new Error("Issue with user");

    const post = await fetchPostByPostId(postId, category);
    if (!post) throw new Error("Post not found");

    if (post.userId !== user.id)
      throw new Error("You don't have permission to proceed.");

    switch (category) {
      case "event":
        await deleteEvent(postId, post);
        break;
      case "economic":
        await deleteEconomic(postId, post);
        break;
      case "district":
        await deleteDistrict(postId, post);
        break;
      case "province":
        await deleteProvince(postId, post);
        break;
      default:
        throw new Error("Invalid category");
    }

    return { success: true };
  } catch (error) {
    console.log(error);
  }
};

const deleteEvent = async (postId: string, post: any) => {
  try {
    // Delete all sub-service images
    if (post.subServices && post.subServices.length > 0) {
      for (const subService of post.subServices) {
        if (subService.images && subService.images.length > 0) {
          const deleteFilePromises = subService.images.map((image: string) => {
            const fileId = extractFileId(image);
            try {
              return storage.deleteFile(NEXT_PUBLIC_BUCKET_ID!, fileId!);
            } catch (error: any) {
              if (error.code === 404) {
                return;
              } else {
                throw error;
              }
            }
          });

          await Promise.allSettled(deleteFilePromises);
        }
      }

      // Delete all sub-service documents
      const deleteSubServicePromises = post.subServices.map(
        (subService: any) => {
          return databases.deleteDocument(
            DATABASE_ID!,
            SUB_SERVICES_COLLECTION_ID!,
            subService.$id
          );
        }
      );

      await Promise.all(deleteSubServicePromises);
    }

    // Delete all post images
    if (post.images && post.images.length > 0) {
      const deletePostImagesPromises = post.images.map((image: string) => {
        const fileId = extractFileId(image);
        try {
          return storage.deleteFile(NEXT_PUBLIC_BUCKET_ID!, fileId!);
        } catch (error: any) {
          if (error.code === 404) {
            return;
          } else {
            throw error;
          }
        }
      });

      await Promise.allSettled(deletePostImagesPromises);
    }

    await databases.deleteDocument(DATABASE_ID!, EVENT_COLLECTION_ID!, postId);

    return { success: true };
  } catch (error) {
    console.error("Error deleting district:", error);
    throw error;
  }
};

const deleteEconomic = async (postId: string, post: any) => {
  try {
    // Delete all sub-service images
    if (post.subServices && post.subServices.length > 0) {
      for (const subService of post.subServices) {
        if (subService.images && subService.images.length > 0) {
          const deleteFilePromises = subService.images.map((image: string) => {
            const fileId = extractFileId(image);
            try {
              return storage.deleteFile(NEXT_PUBLIC_BUCKET_ID!, fileId!);
            } catch (error: any) {
              if (error.code === 404) {
                return;
              } else {
                throw error;
              }
            }
          });

          await Promise.allSettled(deleteFilePromises);
        }
      }

      // Delete all sub-service documents
      const deleteSubServicePromises = post.subServices.map(
        (subService: any) => {
          return databases.deleteDocument(
            DATABASE_ID!,
            SUB_SERVICES_COLLECTION_ID!,
            subService.$id
          );
        }
      );

      await Promise.all(deleteSubServicePromises);
    }

    // Delete all post images
    if (post.images && post.images.length > 0) {
      const deletePostImagesPromises = post.images.map((image: string) => {
        const fileId = extractFileId(image);
        try {
          return storage.deleteFile(NEXT_PUBLIC_BUCKET_ID!, fileId!);
        } catch (error: any) {
          if (error.code === 404) {
            return;
          } else {
            throw error;
          }
        }
      });

      await Promise.allSettled(deletePostImagesPromises);
    }

    await databases.deleteDocument(
      DATABASE_ID!,
      ECONOMIC_COLLECTION_ID!,
      postId
    );

    return { success: true };
  } catch (error) {
    console.error("Error deleting economic:", error);
    throw error;
  }
};

const deleteDistrict = async (postId: string, post: any) => {
  try {
    // Delete all sub-service images
    if (post.subServices && post.subServices.length > 0) {
      for (const subService of post.subServices) {
        if (subService.images && subService.images.length > 0) {
          const deleteFilePromises = subService.images.map((image: string) => {
            const fileId = extractFileId(image);
            try {
              return storage.deleteFile(NEXT_PUBLIC_BUCKET_ID!, fileId!);
            } catch (error: any) {
              if (error.code === 404) {
                return;
              } else {
                throw error;
              }
            }
          });

          await Promise.allSettled(deleteFilePromises);
        }
      }

      // Delete all sub-service documents
      const deleteSubServicePromises = post.subServices.map(
        (subService: any) => {
          return databases.deleteDocument(
            DATABASE_ID!,
            SUB_SERVICES_COLLECTION_ID!,
            subService.$id
          );
        }
      );

      await Promise.all(deleteSubServicePromises);
    }

    // Delete all post images
    if (post.images && post.images.length > 0) {
      const deletePostImagesPromises = post.images.map((image: string) => {
        const fileId = extractFileId(image);
        try {
          return storage.deleteFile(NEXT_PUBLIC_BUCKET_ID!, fileId!);
        } catch (error: any) {
          if (error.code === 404) {
            return;
          } else {
            throw error;
          }
        }
      });

      await Promise.allSettled(deletePostImagesPromises);
    }

    await databases.deleteDocument(
      DATABASE_ID!,
      DISTRICT_COLLECTION_ID!,
      postId
    );

    return { success: true };
  } catch (error) {
    console.error("Error deleting district:", error);
    throw error;
  }
};

const deleteProvince = async (postId: string, post: any) => {
  try {
    // Delete all sub-service images
    if (post.subServices && post.subServices.length > 0) {
      for (const subService of post.subServices) {
        if (subService.images && subService.images.length > 0) {
          const deleteFilePromises = subService.images.map((image: string) => {
            const fileId = extractFileId(image);
            try {
              return storage.deleteFile(NEXT_PUBLIC_BUCKET_ID!, fileId!);
            } catch (error: any) {
              if (error.code === 404) {
                return;
              } else {
                throw error;
              }
            }
          });

          await Promise.allSettled(deleteFilePromises);
        }
      }

      // Delete all sub-service documents
      const deleteSubServicePromises = post.subServices.map(
        (subService: any) => {
          return databases.deleteDocument(
            DATABASE_ID!,
            SUB_SERVICES_COLLECTION_ID!,
            subService.$id
          );
        }
      );

      await Promise.all(deleteSubServicePromises);
    }

    // Delete all post images
    if (post.images && post.images.length > 0) {
      const deletePostImagesPromises = post.images.map((image: string) => {
        const fileId = extractFileId(image);
        try {
          return storage.deleteFile(NEXT_PUBLIC_BUCKET_ID!, fileId!);
        } catch (error: any) {
          if (error.code === 404) {
            return;
          } else {
            throw error;
          }
        }
      });

      await Promise.allSettled(deletePostImagesPromises);
    }

    await databases.deleteDocument(
      DATABASE_ID!,
      PROVINCE_COLLECTION_ID!,
      postId
    );

    return { success: true };
  } catch (error) {
    console.error("Error deleting province:", error);
    throw error;
  }
};

/**
 * LIKE POST
 */

export const likePost = async (
  postId: string,
  category: string,
  likesArray: string[]
) => {
  try {
    const post = await fetchPostByPostId(postId, category);
    if (!post) throw Error;

    switch (category) {
      case "event":
        await likeEvent(postId, likesArray);
        break;
      case "economic":
        await likeEconomic(postId, likesArray);
        break;
      case "district":
        await likeDistrict(postId, likesArray);
        break;
      case "province":
        await likeProvince(postId, likesArray);
        break;
      default:
        throw new Error("Invalid category");
    }
  } catch (error) {
    console.log(error);
  }
};

export const likeEvent = async (postId: string, likesArray: string[]) => {
  try {
    const updatedLikes = await databases.updateDocument(
      DATABASE_ID!,
      EVENT_COLLECTION_ID!,
      postId,
      {
        likes: likesArray,
      }
    );

    return updatedLikes;
  } catch (error) {
    console.log(error);
  }
};

export const likeEconomic = async (postId: string, likesArray: string[]) => {
  try {
    const updatedLikes = await databases.updateDocument(
      DATABASE_ID!,
      ECONOMIC_COLLECTION_ID!,
      postId,
      {
        likes: likesArray,
      }
    );

    return updatedLikes;
  } catch (error) {
    console.log(error);
  }
};

export const likeDistrict = async (postId: string, likesArray: string[]) => {
  try {
    const updatedLikes = await databases.updateDocument(
      DATABASE_ID!,
      DISTRICT_COLLECTION_ID!,
      postId,
      {
        likes: likesArray,
      }
    );

    return updatedLikes;
  } catch (error) {
    console.log(error);
  }
};

export const likeProvince = async (postId: string, likesArray: string[]) => {
  try {
    const updatedLikes = await databases.updateDocument(
      DATABASE_ID!,
      PROVINCE_COLLECTION_ID!,
      postId,
      {
        likes: likesArray,
      }
    );

    return updatedLikes.$id;
  } catch (error) {
    console.log(error);
  }
};

/**
 * SEARCH POST
 */

export const searchPosts = async (searchTerm: string) => {
  try {
    const [event, economic, district, province] = await Promise.all([
      databases.listDocuments(DATABASE_ID!, EVENT_COLLECTION_ID!, [
        Query.search("title", searchTerm),
      ]),
      databases.listDocuments(DATABASE_ID!, ECONOMIC_COLLECTION_ID!, [
        Query.search("title", searchTerm),
      ]),
      databases.listDocuments(DATABASE_ID!, DISTRICT_COLLECTION_ID!, [
        Query.search("title", searchTerm),
      ]),
      databases.listDocuments(DATABASE_ID!, PROVINCE_COLLECTION_ID!, [
        Query.search("title", searchTerm),
      ]),
    ]);

    const allPosts = [
      ...event.documents,
      ...economic.documents,
      ...district.documents,
      ...province.documents,
    ];

    return allPosts;
  } catch (error) {
    console.log(error);
  }
};
