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
import { createAdminClient, createSessionClient } from '../appwrite';
import { appwriteConfig } from '../appwrite/config';
import { parseStringify } from '../utils';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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

export const handleError = async (error: unknown, message: string) => {
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
        accountId,
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

    const cookieStore = await cookies();
    cookieStore.set('appwrite-session', session.secret, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });

    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    handleError(error, 'Failed to verify OTP');
  }
};

export const getCurrentUser = async () => {
  try {
    const { databases, account } = await createSessionClient();

    const result = await account.get();

    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usercollectionId,
      [Query.equal('accountId', result.$id)]
    );

    if (user.total <= 0) return null;

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log('Error getting current user:', error);
    return null;
  }
};

export const logout = async () => {
  const { account } = await createSessionClient();

  try {
    await account.deleteSession('current');
    const cookieStore = await cookies();
    cookieStore.delete('appwrite-session');
  } catch (error) {
    handleError(error, 'Failed to sign out user');
  } finally {
    redirect('/sign-in');
  }
};

export const loginUser = async (email: string) => {
  try {
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      await sendEmailOTP({ email });
      return parseStringify({ accountId: null, error: 'User not found' });
    }

    return parseStringify({ accountId: existingUser.accountId });
  } catch (error) {
    handleError(error, 'Failed to login user');
  }
};
