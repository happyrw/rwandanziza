import AllNewsPost from "@/components/News/AllNewsPost";
import { searchNewsPosts } from "@/lib/appwrite/api";

const dashboardHiddenToken = process.env.NEXT_PUBLIC_DASHBOARD_HIDDEN_TOKEN;

const LocalNews = ({ newsPost }: { newsPost: any }) => {
  // const news = [
  //   {
  //     title: "Local Festival Brings Joy to the Community",
  //     description:
  //       "The annual festival drew large crowds and featured music, food, and cultural performances.",
  //     url: "#",
  //     imageUrl: "/rwanda3.jpg",
  //   },
  //   {
  //     title: "New Hiking Trail Opens in National Park",
  //     description:
  //       "The new trail offers stunning views and a closer look at the region's diverse wildlife.",
  //     url: "#",
  //     imageUrl: "/rwanda3.jpg",
  //   },
  //   // Add more static news items as needed
  // ];

  return (
    <div className="bg-gray-100 p-2 rounded-md shadow-md max-w-4xl mx-auto">
      <div className="relative">
        <h3 className="text-3xl text-start font-bold text-gray-800 mb-6 border-b pb-3">
          Local News
        </h3>
        <div className="absolute bottom-1 bg-sky-800 rounded-lg w-[100px] h-[3px]" />
      </div>
      {newsPost.localNews.length ? (
        newsPost.localNews.slice(0, 2).map((article: any, index: any) => (
          <div
            key={index}
            className="mb-6 flex items-start flex-col bg-white p-4 rounded-md shadow hover:shadow-lg transition-shadow"
          >
            <img
              src={article.images[0]}
              alt="news"
              className="w-full h-64 lg:h-40 object-cover rounded-md mr-4"
            />
            <div>
              <h4 className="text-xl line-clamp-1 text-start font-semibold text-gray-700 my-2 hover:text-blue-600 transition-colors">
                {article.title}
              </h4>
              <div
                className="prose prose-lg text-sm text-gray-600 mb-3 text-start line-clamp-2"
                dangerouslySetInnerHTML={{ __html: article.description }}
              />
              <a
                href={`/post?postId=${article.$id}&category=${article.category}&dash=${dashboardHiddenToken}`}
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 underline font-medium transition-colors"
              >
                Read more
              </a>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600 mb-2">No news available</p>
      )}
      <AllNewsPost posts={newsPost.localNews} />
    </div>
  );
};

const TravelTips = ({ newsPost }: { newsPost: any }) => {
  // const tips = [
  //   {
  //     title: "Top 10 Travel Tips for First-Time Visitors",
  //     description:
  //       "Discover the best travel tips to make your first visit unforgettable.",
  //     url: "#",
  //     imageUrl: "/rwanda3.jpg",
  //   },
  //   {
  //     title: "How to Pack Light for Your Trip",
  //     description:
  //       "Learn how to pack efficiently and travel light with these simple tips.",
  //     url: "#",
  //     imageUrl: "/rwanda3.jpg",
  //   },
  //   // Add more static travel tips as needed
  // ];

  return (
    <div className="bg-gray-100 p-2 rounded-md shadow-md max-w-4xl mx-auto">
      <div className="relative">
        <h3 className="text-3xl text-start font-bold text-gray-800 mb-6 border-b pb-3">
          Travel Tips
        </h3>
        <div className="absolute bottom-1 bg-sky-800 rounded-lg w-[100px] h-[3px]" />
      </div>
      {newsPost.tipsNews.length ? (
        newsPost.tipsNews.slice(0, 2).map((tip: any, index: any) => (
          <div
            key={index}
            className="mb-6 flex items-start flex-col bg-white p-4 rounded-md shadow hover:shadow-lg transition-shadow"
          >
            <img
              src={tip.images[0]}
              alt="travel tip"
              className="w-full h-64 lg:h-40 object-cover rounded-md mr-4"
            />
            <div>
              <h4 className="text-xl text-start line-clamp-1 font-semibold text-gray-700 my-2 hover:text-blue-600 transition-colors">
                {tip.title}
              </h4>
              <div
                className="prose prose-lg text-sm text-gray-600 mb-3 text-start line-clamp-2"
                dangerouslySetInnerHTML={{ __html: tip.description }}
              />
              <a
                href={`/post?postId=${tip.$id}&category=${tip.category}&dash=${dashboardHiddenToken}`}
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 underline font-medium transition-colors"
              >
                Read more
              </a>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600 mb-2">No tips available</p>
      )}
      <AllNewsPost posts={newsPost.tipsNews} />
    </div>
  );
};

const CulturalHighlights = ({ newsPost }: { newsPost: any }) => {
  // const highlights = [
  //   {
  //     title: "Traditional Dance Festival Celebrates Local Culture",
  //     description:
  //       "Experience the vibrant dance traditions of the region at this annual festival.",
  //     url: "#",
  //     imageUrl: "/rwanda3.jpg",
  //   },
  //   {
  //     title: "Explore the Rich History of Local Art",
  //     description:
  //       "Learn about the historical significance and modern interpretations of local art.",
  //     url: "#",
  //     imageUrl: "/rwanda3.jpg",
  //   },
  //   // Add more static cultural highlights as needed
  // ];

  return (
    <div className="bg-gray-100 p-2 rounded-md shadow-md max-w-4xl mx-auto">
      <div className="relative">
        <h3 className="text-3xl text-start font-bold text-gray-800 mb-6 border-b pb-3">
          Cultural Highlights
        </h3>
        <div className="absolute bottom-1 bg-sky-800 rounded-lg w-[100px] h-[3px]" />
      </div>
      {newsPost.culturalNews.length ? (
        newsPost.culturalNews.slice(0, 2).map((highlight: any, index: any) => (
          <div
            key={index}
            className="mb-6 flex items-start flex-col bg-white p-4 rounded-md shadow hover:shadow-lg transition-shadow"
          >
            <img
              src={highlight.images[0]}
              alt="cultural highlight"
              className="w-full h-64 lg:h-40 object-cover rounded-md mr-4"
            />
            <div>
              <h4 className="text-xl text-start line-clamp-1 font-semibold text-gray-700 my-2 hover:text-blue-600 transition-colors">
                {highlight.title}
              </h4>
              <div
                className="prose prose-lg text-sm text-gray-600 mb-3 text-start line-clamp-2"
                dangerouslySetInnerHTML={{ __html: highlight.description }}
              />
              <a
                href={`/post?postId=${highlight.$id}&category=${highlight.category}&dash=${dashboardHiddenToken}`}
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 underline font-medium transition-colors"
              >
                Read more
              </a>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600 mb-2">No highlights available</p>
      )}
      <AllNewsPost posts={newsPost.culturalNews} />
    </div>
  );
};

const GuestBlogs = ({ newsPost }: { newsPost: any }) => {
  // const blogs = [
  //   {
  //     title: "Exploring the Hidden Gems of Rwanda",
  //     description:
  //       "Join our guest blogger as they uncover lesser-known spots that offer incredible experiences.",
  //     url: "#",
  //     imageUrl: "/rwanda3.jpg",
  //   },
  //   {
  //     title: "A Culinary Adventure in Kigali",
  //     description:
  //       "Discover the vibrant food scene in Kigali through the eyes of our guest foodie.",
  //     url: "#",
  //     imageUrl: "/rwanda3.jpg",
  //   },
  //   // Add more static guest blogs as needed
  // ];

  return (
    <div className="bg-gray-100 p-2 rounded-md shadow-md max-w-4xl mx-auto">
      <div className="relative">
        <h3 className="text-3xl text-start font-bold text-gray-800 mb-6 border-b pb-3">
          Guest Blogs
        </h3>
        <div className="absolute bottom-1 bg-sky-800 rounded-lg w-[100px] h-[3px]" />
      </div>
      {newsPost.guestNews.length ? (
        newsPost.guestNews.slice(0, 2).map((blog: any, index: any) => (
          <div
            key={index}
            className="mb-6 flex items-start flex-col bg-white p-4 rounded-md shadow hover:shadow-lg transition-shadow"
          >
            <img
              src={blog.images[0]}
              alt="guest blog"
              className="w-full h-64 lg:h-40 object-cover rounded-md mr-4"
            />
            <div>
              <h4 className="text-xl text-start line-clamp-1 font-semibold text-gray-700 my-2 hover:text-blue-600 transition-colors">
                {blog.title}
              </h4>
              <div
                className="prose prose-lg text-sm text-gray-600 mb-3 text-start line-clamp-2"
                dangerouslySetInnerHTML={{ __html: blog.description }}
              />
              <a
                href={`/post?postId=${blog.$id}&category=${blog.category}&dash=${dashboardHiddenToken}`}
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 underline font-medium transition-colors"
              >
                Read more
              </a>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600 mb-2">No guest blogs available</p>
      )}
      <AllNewsPost posts={newsPost.guestNews} />
    </div>
  );
};

const Banner = () => {
  return (
    <div className="bg-blue-600 text-white py-5 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">
        Welcome to <br />
        <span className="text-yellow-400 italic underline">Tourism News</span>
      </h1>
      <p className="text-lg mt-4 px-10 text-center">
        Stay updated with the latest news and travel tips!
      </p>
    </div>
  );
};

const HeroSection = () => {
  return (
    <div
      className="bg-cover bg-center text-white text-center py-2 lg:py-10"
      style={{ backgroundImage: "url('/rwanda3.jpg')" }}
    >
      <h2 className="text-5xl font-bold">
        Explore the{" "}
        <span className="text-yellow-400 italic underline">Rwanda</span>
      </h2>
      <p className="text-2xl mt-4">
        Discover new places, cultures, and experiences.
      </p>
    </div>
  );
};

const Categories = ({ newsPost }: { newsPost: any }) => {
  return (
    <div className="lg:container mx-auto grid grid-cols-1 md:grid-cols-2 justify-around my-2">
      <div className="flex-1 mx-2 p-2 text-center">
        <LocalNews newsPost={newsPost} />
      </div>
      <div className="flex-1 mx-2 p-2 text-center">
        <TravelTips newsPost={newsPost} />
      </div>
      <div className="flex-1 mx-2 p-2 text-center">
        <CulturalHighlights newsPost={newsPost} />
      </div>
      <div className="flex-1 mx-2 p-2 text-center">
        <GuestBlogs newsPost={newsPost} />
      </div>
    </div>
  );
};

const HomePage = async () => {
  const newsPost = await searchNewsPosts();
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <Banner />
        <HeroSection />
      </div>
      <Categories newsPost={newsPost} />
    </div>
  );
};

export default HomePage;
