'use server';

/* 
    create account flow
    users eneter username and email
    check if user already exists using email
    sent otp to email
    create secret key for session
    create new user doc if new user
    return user accountId used to complete login
    verify otp and auth to login
*/

import { Query, ID } from 'node-appwrite';
import { createAdminClient } from '../appwrite';
import { appwriteConfig } from '../appwrite/config';
import { parseStringify } from '../utils';
import { cookies } from 'next/headers';

export const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();

  if (!appwriteConfig.databaseId || !appwriteConfig.usercollectionId) {
    throw new Error('Appwrite databaseId or usercollectionId is not defined');
  }

  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usercollectionId,
    [Query.equal('email', email)]
  );

  return result.total > 0 ? result.documents[0] : null;
};

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

export const sendEmailOTP = async (email: { email: string }) => {
  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailToken(ID.unique(), email.email);

    return session.userId;
  } catch (error) {
    handleError(error, 'Failed to send email OTP');
  }
};

export const createAccount = async ({
  username,
  email,
}: {
  username: string;
  email: string;
}) => {
  const existingUser = await getUserByEmail(email);

  const accountId = await sendEmailOTP({ email });

  if (!accountId) {
    throw new Error('Failed to send email OTP');
  }

  if (!existingUser) {
    const { databases } = await createAdminClient();

    if (!appwriteConfig.databaseId || !appwriteConfig.usercollectionId) {
      throw new Error('Appwrite databaseId or usercollectionId is not defined');
    }

    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usercollectionId,
      ID.unique(),
      {
        username,
        email,
        avatar: '',
        account_id: accountId,
      }
    );
  }

  return parseStringify({ accountId });
};

export const verifySecret = async ({
  accountId,
  password,
}: {
  accountId: string;
  password: string;
}) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createSession(accountId, password);

    (await cookies()).set('appwrite-session', session.secret, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    handleError(error, 'Failed to verify OTP');
  }
};
