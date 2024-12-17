"use server";

// import fetch from "node-fetch";
import { ID, Query } from "node-appwrite";
import {
  DATABASE_ID,
  databases,
  ENDPOINT,
  NEXT_PUBLIC_BUCKET_ID,
  PROJECT_ID,
  storage,
  USER_COLLECTION_ID,
} from "../appwrite.config";
import { currentUser } from "@clerk/nextjs/server";
import { InputFile } from "node-appwrite/file";

export async function saveUserToDB() {
  const user = await currentUser();
  const email = user?.emailAddresses[0].emailAddress;

  if (!user?.id || !email) {
    throw new Error("User data not available");
  }

  const existingUser = await databases.listDocuments(
    DATABASE_ID!,
    USER_COLLECTION_ID!,
    [Query.equal("email", email)]
  );

  if (existingUser.total === 0) {
    await databases.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        userId: user.id,
        email: email,
      }
    );
  }

  return { success: true };
}

export async function createFiles(formData: any) {
  try {
    const { images } = formData; // Array of image URLs

    await uploadFile(images[0]);

    // const result = await storage.createFile()
    // const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/<YOUR_BUCKET_ID>/files/${result.$id}/view?project=<YOUR_PROJECT_ID>`;
    return null; // Return the file URL
  } catch (error) {
    console.error("Error uploading files:", error);
    throw error; // Ensure errors bubble up
  }
}

const uploadFile = async (images: any) => {
  const response = await fetch(images);
  const blob = await response.blob();
  const file = new File([blob], "uploaded-image.png", { type: blob.type });
  try {
    const uploadedFile = await storage.createFile(
      NEXT_PUBLIC_BUCKET_ID!,
      ID.unique(),
      images
    );
    console.log("Uploading", uploadedFile);
  } catch (error) {
    console.log(error);
  }
};
