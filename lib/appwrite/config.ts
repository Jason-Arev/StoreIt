// Function to get config at runtime to ensure environment variables are loaded
export const getAppwriteConfig = () => {
  const config = {
    endpointUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
    usercollectionId: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION,
    filescollectionId: process.env.NEXT_PUBLIC_APPWRITE_FILES_COLLECTION,
    bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET,
    secretKey: process.env.NEXT_APPWRITE_KEY,
  };

  // Validate that all required environment variables are present
  const missingVars = Object.entries(config).filter(([, value]) => !value);

  if (missingVars.length > 0) {
    console.error(
      'Missing required environment variables:',
      missingVars.map(([key]) => key)
    );
    throw new Error(
      `Missing required environment variables: ${missingVars.map(([key]) => key).join(', ')}`
    );
  }

  return {
    endpointUrl: config.endpointUrl!,
    projectId: config.projectId!,
    databaseId: config.databaseId!,
    usercollectionId: config.usercollectionId!,
    filescollectionId: config.filescollectionId!,
    bucketId: config.bucketId!,
    secretKey: config.secretKey!,
  };
};

// Export static config for backward compatibility (but use function above in critical paths)
export const appwriteConfig = {
  endpointUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
  usercollectionId: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION!,
  filescollectionId: process.env.NEXT_PUBLIC_APPWRITE_FILES_COLLECTION!,
  bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET!,
  secretKey: process.env.NEXT_APPWRITE_KEY!,
};
