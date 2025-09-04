# Appwrite Setup Guide for CADemy

This guide will help you set up Appwrite for the CADemy project.

## 1. Create Appwrite Project

1. Go to [Appwrite Cloud](https://cloud.appwrite.io) or set up your own Appwrite instance
2. Create a new project
3. Copy your Project ID

## 2. Update Configuration

1. Open `src/lib/appwrite.js`
2. Replace `YOUR_PROJECT_ID` with your actual project ID
3. If using self-hosted Appwrite, update the endpoint URL

## 3. Create Database and Collections

### Database
- Create a database named `cademy-db`
- Copy the database ID and update `DATABASE_ID` in `src/lib/appwrite.js`

### Collections

#### User Profiles Collection
- Collection ID: `user-profiles`
- Attributes:
  - `userId` (String, required, size: 255)
  - `displayName` (String, required, size: 255)
  - `email` (String, required, size: 255)
  - `createdAt` (DateTime, required)

- Permissions:
  - Read: `users`
  - Write: `users`

#### User Progress Collection
- Collection ID: `user-progress`
- Attributes:
  - `userId` (String, required, size: 255)
  - `completedTutorials` (String, array: true, required: false)
  - `completedChallenges` (String, array: true, required: false)
  - `totalXP` (Integer, required, default: 0)
  - `badges` (String, array: true, required: false)

- Permissions:
  - Read: `users`
  - Write: `users`

- Indexes:
  - Create index on `userId` field for faster queries

## 4. Set up Authentication

1. Go to Auth section in Appwrite Console
2. Enable Email/Password authentication
3. Configure any additional settings as needed

## 5. Deploy Cloud Function

1. Install Appwrite CLI: `npm install -g appwrite-cli`
2. Login to Appwrite: `appwrite login`
3. Navigate to the functions directory: `cd functions/progress-calculation`
4. Deploy the function: `appwrite functions createDeployment --functionId=progress-calculation`

### Function Configuration
- Function ID: `progress-calculation`
- Runtime: Node.js 18.0
- Entry point: `src/main.js`
- Trigger: Manual (called from client)

### Environment Variables
The function will automatically have access to:
- `APPWRITE_FUNCTION_ENDPOINT`
- `APPWRITE_FUNCTION_PROJECT_ID`
- `APPWRITE_API_KEY` (you need to create an API key with appropriate permissions)

## 6. Create API Key

1. Go to Settings > API Keys in Appwrite Console
2. Create a new API key with the following scopes:
   - `databases.read`
   - `databases.write`
3. Copy the API key and add it to your function's environment variables

## 7. Test the Integration

1. Start your development server: `npm start`
2. Try registering a new user
3. Complete a tutorial or challenge to test progress tracking
4. Check the dashboard to see if data is being saved correctly

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure your domain is added to the allowed origins in Appwrite Console
2. **Permission Errors**: Verify that collections have proper read/write permissions for users
3. **Function Errors**: Check function logs in Appwrite Console for debugging

### Database Rules

Make sure your collections have the following permission rules:

```
Read: users
Write: users
```

This ensures users can only access their own data.

## Security Notes

- Never expose your API keys in client-side code
- Use Appwrite's built-in security features
- Regularly review and update permissions
- Monitor function execution logs for any suspicious activity
