import React from "react";

type PreviewProps = {
  data: {
    date: Date;
    title: string;
    tiptap: string;
    latitude: string;
    longitude: string;
    subServices: {
      name: string;
      images: string[]; // Array of image URLs (blob URLs in your case)
      description: string;
    }[];
    images: string[]; // Array of image URLs (blob URLs in your case)
    youtubeUrl: string;
  };
};

const PreviewComponent: React.FC<PreviewProps> = ({ data }) => {
  // Limit to the first 4 images and display the rest as +n if there are more
  const displayImages = data.images.slice(0, 4);
  const remainingImagesCount = data.images.length - 4;

  return (
    <div className="p-6 border border-gray-300 rounded-lg shadow-md bg-white">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        {data.title}
      </h2>

      {/* Date */}
      <p className="text-sm text-gray-500 mb-4">
        Posted on: {new Date(data.date).toLocaleString()}
      </p>

      {/* Description (Tiptap content) */}
      <div
        className="description mb-6 text-gray-700"
        dangerouslySetInnerHTML={{ __html: data.tiptap }}
      />

      {/* Latitude and Longitude */}
      <p className="text-sm text-gray-500 mb-2">Latitude: {data.latitude}</p>
      <p className="text-sm text-gray-500 mb-4">Longitude: {data.longitude}</p>

      {/* Images */}
      <div className="image-preview flex flex-wrap gap-4 mb-6">
        {displayImages.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`image-${index}`}
            className="w-24 h-24 object-cover rounded-md shadow-sm"
          />
        ))}
        {remainingImagesCount > 0 && (
          <div className="w-24 h-24 flex items-center justify-center bg-gray-200 text-gray-700 rounded-md">
            +{remainingImagesCount}
          </div>
        )}
      </div>

      {/* Sub Services */}
      <div className="sub-services mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Sub Services
        </h3>
        {data.subServices.map((subService, index) => (
          <div key={index} className="sub-service mb-6">
            <h4 className="font-semibold text-md text-gray-800 mb-2">
              {subService.name}
            </h4>
            <div
              className="sub-service-description mb-2 text-gray-700"
              dangerouslySetInnerHTML={{ __html: subService.description }}
            />
            <div className="image-preview flex flex-wrap gap-4 mb-4">
              {subService.images.slice(0, 4).map((imageUrl, idx) => (
                <img
                  key={idx}
                  src={imageUrl}
                  alt={`sub-service-image-${idx}`}
                  className="w-24 h-24 object-cover rounded-md shadow-sm"
                />
              ))}
              {subService.images.length > 4 && (
                <div className="w-24 h-24 flex items-center justify-center bg-gray-200 text-gray-700 rounded-md">
                  +{subService.images.length - 4}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* YouTube URL */}
      <div className="youtube-url mt-6">
        <p className="font-semibold text-gray-900">YouTube URL:</p>
        <a
          href={data.youtubeUrl}
          className="text-blue-600 underline block break-all max-w-full"
          target="_blank"
          rel="noopener noreferrer"
        >
          {data.youtubeUrl}
        </a>
      </div>
    </div>
  );
};

export default PreviewComponent;
