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

export const subCategory = {
  Hotels: {
    items: [
      {
        name: "5-star",
        description: "Luxury accommodations with premium amenities.",
      },
      {
        name: "4-star",
        description: "High-quality accommodations with excellent service.",
      },
      {
        name: "3-star",
        description: "Comfortable hotels with essential services.",
      },
      {
        name: "2-star",
        description: "Budget-friendly hotels with basic facilities.",
      },
      {
        name: "Boutique Hotels",
        description: "Small, stylish hotels with personalized service.",
      },
      {
        name: "Budget Hotels",
        description: "Affordable stays for travelers on a budget.",
      },
      {
        name: "Resorts",
        description: "Relaxing stays with extensive leisure facilities.",
      },
      {
        name: "Hostels",
        description: "Shared, affordable lodging for backpackers.",
      },
    ],
  },
  Restaurants: {
    items: [
      {
        name: "Fine Dining",
        description: "Upscale restaurants offering gourmet cuisine.",
      },
      {
        name: "Casual Dining",
        description: "Relaxed settings with a variety of meals.",
      },
      {
        name: "Cafés",
        description: "Coffee shops serving snacks and beverages.",
      },
      {
        name: "Fast Food",
        description: "Quick-service restaurants for on-the-go meals.",
      },
      {
        name: "Street Food",
        description: "Authentic local cuisine served outdoors.",
      },
      { name: "Vegetarian/Vegan", description: "Plant-based dining options." },
    ],
  },
  Gyms: {
    items: [
      {
        name: "Health Clubs",
        description: "Fitness centers with a range of facilities.",
      },
      {
        name: "Yoga Studios",
        description: "Spaces dedicated to yoga and mindfulness.",
      },
      {
        name: "CrossFit Gyms",
        description: "High-intensity functional training gyms.",
      },
      {
        name: "Pilates Studios",
        description: "Studios offering pilates for flexibility and strength.",
      },
      {
        name: "Martial Arts Centers",
        description: "Training centers for martial arts disciplines.",
      },
    ],
  },
  Churches: {
    items: [
      {
        name: "Historical Churches",
        description: "Churches with rich historical significance.",
      },
      {
        name: "Temples",
        description: "Places of worship for various religions.",
      },
      { name: "Mosques", description: "Islamic places of worship." },
      { name: "Synagogues", description: "Jewish places of worship." },
      {
        name: "Shrines",
        description: "Sacred places for worship and reflection.",
      },
    ],
  },
  Parks: {
    items: [
      {
        name: "National Parks",
        description: "Protected areas for wildlife and nature.",
      },
      { name: "City Parks", description: "Green spaces within urban areas." },
      {
        name: "Botanical Gardens",
        description: "Gardens featuring diverse plant species.",
      },
      {
        name: "Nature Reserves",
        description: "Conservation areas for flora and fauna.",
      },
      {
        name: "Beaches",
        description: "Coastal areas for relaxation and recreation.",
      },
      {
        name: "Hiking Trails",
        description: "Paths for outdoor walking and exploration.",
      },
    ],
  },
  GenocideMemorials: {
    items: [
      {
        name: "Genocide Memorial Sites",
        description: "Sites commemorating victims of genocide.",
      },
      {
        name: "Holocaust Museums",
        description: "Museums dedicated to Holocaust remembrance.",
      },
      {
        name: "War Memorials",
        description: "Monuments honoring soldiers and war victims.",
      },
    ],
  },
  Entertainment: {
    items: [
      { name: "Cinemas", description: "Theaters showing the latest movies." },
      {
        name: "Theatres",
        description: "Venues for live drama and performances.",
      },
      {
        name: "Nightclubs",
        description: "Places for music, dancing, and nightlife.",
      },
      {
        name: "Casinos",
        description: "Venues offering gambling and entertainment.",
      },
      {
        name: "Amusement Parks",
        description: "Parks with rides and attractions for fun.",
      },
    ],
  },
  Shopping: {
    items: [
      {
        name: "Malls",
        description: "Large shopping centers with diverse stores.",
      },
      {
        name: "Souvenir Shops",
        description: "Shops offering local crafts and gifts.",
      },
      {
        name: "Flea Markets",
        description: "Outdoor markets selling unique and second-hand items.",
      },
      {
        name: "Art Galleries",
        description: "Spaces showcasing art exhibitions and sales.",
      },
    ],
  },
  Adventure: {
    items: [
      {
        name: "Zip-lining",
        description: "High-speed rides through treetops or canyons.",
      },
      { name: "Rafting", description: "White-water river adventures." },
      { name: "Kayaking", description: "Water adventures in narrow boats." },
      {
        name: "Mountain Biking",
        description: "Cycling on challenging off-road trails.",
      },
      {
        name: "Rock Climbing",
        description: "Climbing activities on natural or artificial surfaces.",
      },
    ],
  },
  Sauna: {
    items: [
      {
        name: "Finnish Sauna",
        description: "Traditional dry heat sauna with high temperatures.",
      },
      {
        name: "Infrared Sauna",
        description: "Uses infrared light to directly heat the body.",
      },
      {
        name: "Steam Rooms",
        description: "High humidity rooms with lower temperatures.",
      },
      {
        name: "Salt Sauna",
        description: "Infused with salt to promote relaxation and skin health.",
      },
      {
        name: "Bio Sauna",
        description: "Lower temperature sauna with added aromatherapy.",
      },
      {
        name: "Ice Sauna",
        description: "Alternates between heat and ice for unique relaxation.",
      },
    ],
  },
};

export const experience = [
  {
    url: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1",
    name: "Traditional Intore Dance",
    caption:
      "Experience the elegance and energy of Rwanda's traditional Intore dance, a celebration of culture and pride.",
  },
  {
    url: "https://images.unsplash.com/photo-1556761175-4b46a572b786",
    name: "Local Cuisine Tastings",
    caption:
      "Indulge in Rwanda's delicious local dishes like brochettes, ugali, and the famous isombe.",
  },
  {
    url: "https://images.pexels.com/photos/1441021/pexels-photo-1441021.jpeg",
    name: "Handcrafted Arts & Crafts",
    caption:
      "Explore unique, handmade crafts such as traditional Agaseke baskets and vibrant Imigongo art.",
  },
];

export const activities = [
  {
    name: "Gorilla Trekking",
    caption:
      "Embark on a thrilling journey to observe majestic mountain gorillas in their natural habitat.",
    src: "/rwanda3.jpg", // Replace with your actual image path
  },
  {
    name: "Hiking Volcanoes",
    caption:
      "Conquer the peaks of dormant volcanoes while enjoying panoramic views and lush greenery.",
    src: "/rwanda3.jpg", // Replace with your actual image path
  },
  {
    name: "Kayaking on Lake Kivu",
    caption:
      "Paddle through serene waters, explore hidden coves, and enjoy the tranquility of Lake Kivu.",
    src: "/rwanda3.jpg", // Replace with your actual image path
  },
];

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
