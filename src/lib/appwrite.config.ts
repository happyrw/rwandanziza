import * as sdk from "node-appwrite";

export const {
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  USER_COLLECTION_ID,
  EVENT_COLLECTION_ID,
  ECONOMIC_COLLECTION_ID,
  DISTRICT_COLLECTION_ID,
  PROVINCE_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
  SUB_SERVICES_COLLECTION_ID,
} = process.env;

const client = new sdk.Client();

client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
