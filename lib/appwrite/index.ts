'use server';

import { Account, Avatars, Client, Databases, Storage } from 'node-appwrite';
import { getAppwriteConfig } from '@/lib/appwrite/config';
import { cookies } from 'next/headers';
import { unstable_noStore as noStore } from 'next/cache';

export const createSessionClient = async () => {
  noStore();
  const config = getAppwriteConfig();
  const client = new Client()
    .setEndpoint(config.endpointUrl)
    .setProject(config.projectId);

  const cookieStore = await cookies();
  const session = cookieStore.get('appwrite-session');

  if (!session?.value) {
    throw new Error('No session');
  }

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
  noStore(); // safe to add here too

  // Get config at runtime to ensure environment variables are loaded
  const config = getAppwriteConfig();

  const client = new Client()
    .setEndpoint(config.endpointUrl)
    .setProject(config.projectId)
    .setKey(config.secretKey);

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
