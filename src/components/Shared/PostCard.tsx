import { formatTimeAgo } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import PostStatus from "./PostStatus";

const PostCard = ({ post }: { post: PayloadData }) => {
  const { user } = useUser();

  return (
    <div className="rounded-lg overflow-hidden shadow-lg border shadow-black/5">
      <div className="relative aspect-video">
        <img
          src={post.images[0]}
          alt="post-image"
          className="absolute w-full h-full object-cover hover:scale-105 transition-transform duration-200"
        />
      </div>
      <div className="p-4">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap font-bold text-xl">
          {post.title}
        </p>
        <p className="text-[10px]">{formatTimeAgo(post.$createdAt)}</p>
        <p className="text-[10px]">{post.category}</p>
        <hr className="h-[1px] bg-black/5 mx-auto my-4" />
        <PostStatus post={post} userId={user?.id} />
      </div>
    </div>
  );
};

export default PostCard;
