import PostStatus from "@/components/Shared/PostStatus";
import { useAuth } from "@clerk/nextjs";

const GridPostList = ({ posts }: { posts: any[] }) => {
  const { userId } = useAuth();

  return (
    <div className="grid grid-cols-1 gap-2 mb-2">
      {posts.map((post) => (
        <div
          key={post.$id}
          className="border rounded-lg overflow-hidden bg-white hover:shadow-sm transition-shadow duration-300 flex md:min-h-48"
        >
          <div className="relative w-1/2 h-full">
            <img
              src={post.images[0]}
              alt="post-image"
              className="absolute w-full h-full object-cover"
            />
          </div>
          <div className="p-2 flex flex-col justify-between w-1/2">
            <h2 className="text-[20px] font-semibold text-gray-800 truncate">
              {post.title}
            </h2>
            <div
              className="prose prose-sm text-gray-600 mt-2 line-clamp-3 text-sm md:text-lg"
              dangerouslySetInnerHTML={{ __html: post.description }}
            />
            <div className="mt-3">
              <PostStatus post={post} userId={userId!} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridPostList;
