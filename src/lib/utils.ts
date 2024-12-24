import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow, parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const formatDateTime = (dateString: Date | string) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    // weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    year: "numeric", // numeric year (e.g., '2023')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // abbreviated month name (e.g., 'Oct')
    day: "2-digit", // numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "en-US",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function formatTimeAgo(isoTimestamp: string): string {
  const now = new Date();
  const timestamp = parseISO(isoTimestamp);

  // Check if the time is within a few seconds
  const secondsDifference = Math.floor(
    (now.getTime() - timestamp.getTime()) / 1000
  );
  if (secondsDifference < 60) {
    return "now";
  }

  // Format using `formatDistanceToNow` from date-fns
  return formatDistanceToNow(timestamp, { addSuffix: true });
}

export function extractFileId(url: string): string | null {
  const regex = /files\/([a-zA-Z0-9]+)\//;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList?.includes(userId);
};

export const formatLikes = (likes: number): string => {
  if (likes >= 1_000_000) {
    return (likes / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (likes >= 1_000) {
    return (likes / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return likes.toString();
};

{
  /*

  /file\/([a-zA-Z0-9]+)\//
  
  try {
    const mainImages = [] as any;
    const subServiceImages = [] as any;
    const subServices = [] as any[];

    formData.forEach((value, key) => {
      if (key.startsWith("mainImages")) {
        mainImages.push(value);
      }
    });

    formData.forEach((value, key) => {
      const subServiceImagesRegex = /^subServices\[\d+\]\[images\]/;
      if (subServiceImagesRegex.test(key)) {
        subServiceImages.push(value);
      }
    });

    formData.forEach((value, key) => {
      // Match keys like "subServices[0][name]" or "subServices[0][description]"
      const nameRegex = /^subServices\[\d+\]\[name\]$/;
      const descriptionRegex = /^subServices\[\d+\]\[description\]$/;

      if (nameRegex.test(key)) {
        const index = key.match(/\d+/)![0] as any; // Extract the index number
        if (!subServices[index]) {
          subServices[index] = {}; // Initialize the subservice object if not already done
        }
        subServices[index].name = value; // Add the name to the correct subservice
      }

      if (descriptionRegex.test(key)) {
        const index = key.match(/\d+/)![0] as any; // Extract the index number
        if (!subServices[index]) {
          subServices[index] = {}; // Initialize the subservice object if not already done
        }
        subServices[index].description = value; // Add the description to the correct subservice
      }
    });

    // CREATE MAIN_IMAGES
    // const mainImageUploadPromises = mainImages.map(
    //   async (file: any, index: any) => {
    //     const fileId = ID.unique();
    //     const fileName = `mainImage-${index}.jpeg`;
    //     const response = await storage.createFile(
    //       NEXT_PUBLIC_BUCKET_ID!,
    //       fileId,
    //       new File([file], fileName, { type: file.type })
    //     );
    //     return `${ENDPOINT}/storage/buckets/${NEXT_PUBLIC_BUCKET_ID}/files/${response.$id}/view?project=${PROJECT_ID}`;
    //   }
    // );

    // const mainImageUrls = await Promise.all(mainImageUploadPromises);

    // const latitude = parseFloat(formData.get("latitude") as string);
    // const longitude = parseFloat(formData.get("longitude") as string);

    // if (isNaN(latitude) || isNaN(longitude)) {
    //   throw new Error("Invalid latitude or longitude values");
    // }

    // // CREATE EVENT_DOCUMENT
    // const eventDocument = await databases.createDocument(
    //   DATABASE_ID!,
    //   EVENT_COLLECTION_ID!,
    //   ID.unique(),
    //   {
    //     userId: user.id,
    //     date: formData.get("date"),
    //     title: formData.get("title"),
    //     description: formData.get("tiptap"),
    //     latitude,
    //     longitude,
    //     youtubeUrl: formData.get("youtubeUrl"),
    //     images: mainImageUrls,
    //   }
    // );
  
  */
}
