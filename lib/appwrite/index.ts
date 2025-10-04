'use server';

import { Account, Avatars, Client, Databases, Storage } from 'node-appwrite';
import { appwriteConfig } from '@/lib/appwrite/config';
import { cookies } from 'next/headers';
import { unstable_noStore as noStore } from 'next/cache';

export const createSessionClient = async () => {
  noStore();
  const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId);

  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('appwrite-session');

    if (!session?.value) throw new Error('No session');

    client.setSession(session.value);
  } catch {
    throw new Error('No session');
  }

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
  noStore(); // safe to add here too
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
