import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import {
  createPost,
  getRecentPosts,
  likeEvent,
  likePost,
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

// export const useGetPostById = (postId: string) => {
//   return useQuery({
//     queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
//     queryFn: () => getPostById(postId),
//     enabled: !!postId,
//   });
// };

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

// export const useGetPosts = () => {
//   //@ts-ignore
//   return useInfiniteQuery({
//     queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
//     queryFn: getInfinitePosts,
//     getNextPageParam: (lastPage) => {
//       if (lastPage && lastPage.documents.length === 0) return null;

//       const lastId = lastPage?.documents[lastPage?.documents.length - 1].$id;
//       return lastId;
//     },
//   });
// };

// export const useSearchPosts = (searchTerm: string) => {
//   return useQuery({
//     queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
//     queryFn: () => searchPosts(searchTerm),
//     enabled: !!searchTerm,
//   });
// };

// // Likes and Saves

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
