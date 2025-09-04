import { Client, Account, Databases, Functions } from 'appwrite';

const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const functions = new Functions(client);

export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const USER_PROGRESS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USER_PROGRESS_COLLECTION_ID;
export const USER_PROFILES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USER_PROFILES_COLLECTION_ID;

export default client;
