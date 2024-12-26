import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import {
  createPost,
  fetchPostByPostId,
  getInfinitePosts,
  getRecentPosts,
  likeEvent,
  likePost,
  searchPosts,
  updatePost,
} from "../appwrite/api";

//==========================
// Post
//==========================
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, category }: { payload: any; category: string }) =>
      createPost(payload, category),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, category }: { payload: any; category: string }) =>
      updatePost(payload, category),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data],
      });
    },
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      category,
      likesArray,
    }: {
      postId: string;
      category: string;
      likesArray: string[];
    }) => likePost(postId, category, likesArray),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
    },
  });
};

export const useGetPostById = (postId: string, category: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId, category],
    queryFn: () => fetchPostByPostId(postId, category),
    enabled: !!postId,
  });
};

export const useSearchPosts = (searchTerm: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
    queryFn: () => searchPosts(searchTerm),
    enabled: !!searchTerm,
  });
};

export const useGetPosts = (
  category: "event" | "economic" | "district" | "province"
) => {
  //@ts-ignore
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS, category], // Include category in the query key
    queryFn: ({ pageParam }) => getInfinitePosts({ pageParam, category }), // Pass category to the query function
    getNextPageParam: (lastPage: any) => {
      // Stop fetching if there are no more documents
      if (!lastPage.hasMore) return null;

      return lastPage.nextCursor; // Use the cursor from the last page
    },
  });
};

// export const useDeletePost = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ postId, imageId }: { postId: string; imageId: string }) =>
//       deletePost(postId, imageId),
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
//       });
//     },
//   });
// };

// // Likes and Saves

// export const useSavePost = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
//       savePost(postId, userId),
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
//       });
//       queryClient.invalidateQueries({
//         queryKey: [QUERY_KEYS.GET_POSTS],
//       });
//       queryClient.invalidateQueries({
//         queryKey: [QUERY_KEYS.GET_CURRENT_USER],
//       });
//     },
//   });
// };

// export const useDeleteSavedPost = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({ savedRecordId }: { savedRecordId: string }) => {
//       console.log("savedRecordId in mutation", savedRecordId);
//       return deleteSavedPost(savedRecordId);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
//       });
//       queryClient.invalidateQueries({
//         queryKey: [QUERY_KEYS.GET_POSTS],
//       });
//       queryClient.invalidateQueries({
//         queryKey: [QUERY_KEYS.GET_CURRENT_USER],
//       });
//     },
//   });
// };
