// "use client";

// import Loading from "@/app/Loading";
// import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
// import PostCard from "./Shared/PostCard";

// const HomeComponent = () => {
//   const {
//     data: posts,
//     isPending: isPostLoading,
//     isError: isErrorPost,
//   } = useGetRecentPosts();

//   return (
//     <div>
//       {isPostLoading && !posts ? (
//         <Loading />
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 remove-scrollbar">
//           {posts?.map((post: any) => (
//             <PostCard key={post.$id} post={post} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomeComponent;
