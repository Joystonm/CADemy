# Appwrite Setup Instructions

## Current Issues
The application is showing these errors:
- Collection with ID `68b7049a0039f2e5a7d1` not found (404)
- CORS errors from `http://localhost:3000`
- Authentication errors (401)

## Required Appwrite Configuration

### 1. Project Settings
- Project ID: `68b70063002d7a9c54ff`
- Endpoint: `https://nyc.cloud.appwrite.io/v1`

### 2. Platform Configuration
Add a new Web platform in your Appwrite project:
- Name: `CADemy Local`
- Hostname: `localhost:3000`

### 3. Database Setup
Create a database with ID: `68b704910029e5b8673c`

#### Collections to create:

**User Progress Collection**
- Collection ID: `68b7049a0039f2e5a7d1`
- Attributes:
  - `userId` (string, required)
  - `completedTutorials` (string array)
  - `completedChallenges` (string array) 
  - `totalXP` (integer, default: 0)
  - `badges` (string array)

**User Profiles Collection**
- Collection ID: `user-profiles`
- Attributes:
  - `userId` (string, required)
  - `displayName` (string)
  - `email` (string)
  - `createdAt` (datetime)

### 4. Permissions
Set appropriate read/write permissions for authenticated users on both collections.

### 5. Authentication
Enable Email/Password authentication in the Auth section.

## Environment Variables
Ensure your `.env` file has:
```
VITE_APPWRITE_ENDPOINT=https://nyc.cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=68b70063002d7a9c54ff
VITE_APPWRITE_PROJECT_NAME=Cademy
VITE_APPWRITE_DATABASE_ID=68b704910029e5b8673c
VITE_APPWRITE_USER_PROGRESS_COLLECTION_ID=68b7049a0039f2e5a7d1
VITE_APPWRITE_USER_PROFILES_COLLECTION_ID=user-profiles
```

## Fallback Behavior
The application now works offline using localStorage if Appwrite is not available:
- Progress is saved locally
- Authentication state is maintained
- All features work without database connection

## Testing
After setup, the application should:
1. Connect to Appwrite successfully
2. Allow user registration/login
3. Save progress to both local storage and database
4. Sync data when connection is restored
