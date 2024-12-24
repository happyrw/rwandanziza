// Define Payload and SubService types
interface SubService {
  name: string;
  description: string;
  images: string[];
}

interface PayloadData {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: any[];
  $updatedAt: string;
  category: string;
  creator: string | null;
  date: string;
  description: string;
  district: string;
  images: string[];
  latitude: string;
  likes: any[];
  longitude: string;
  title: string;
  userId: string;
  tiptap: string;
  province: string;
  youtubeUrl?: string;
  subServices: SubService[];
  postId?: string | undefined;
}
