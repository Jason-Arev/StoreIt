// node-appwrite

import { Client, Account, Databases, Storage, Avatars } from 'node-appwrite';
import { appwriteConfig } from './config';

export const createSessionClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId);

  // For client-side usage, we'll handle sessions differently
  // This function should only be used server-side where cookies are available
  // For client-side, use the regular appwrite client from 'appwrite' package

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
  };
};

// Server-side session client that uses cookies
export const createServerSessionClient = async () => {
  const { cookies } = await import('next/headers');

  const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId);

  const session = (await cookies()).get('appwrite-session');

  if (!session || !session.value) throw new Error('No session found');

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
  };
};

export const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.secretKey);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
    get avatars() {
      return new Avatars(client);
    },
  };
};
