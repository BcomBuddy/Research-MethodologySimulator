# SSO Integration Setup

This document describes the JWT-based Single Sign-On (SSO) integration for the Research and Methodology Simulator micro-app.

## Environment Variables

Add the following environment variables to your `.env` file:

```env
# SSO Configuration
REACT_APP_SHELL_DOMAIN=https://bcombuddy.netlify.app
REACT_APP_APP_TYPE=simulator

# Firebase Configuration (existing)
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```

## SSO URL Format

When users access this app from the BcomBuddy shell, the URL will be:
```
https://your-app.netlify.app?token=ENCODED_JWT_TOKEN&sso=true&shell=https://bcombuddy.netlify.app
```

## JWT Token Structure

The token contains user data with the correct micro-app domain:
```json
{
  "uid": "user_id",
  "email": "user@example.com", 
  "name": "User Name",
  "yearOfStudy": "1st Year",
  "role": "student",
  "isAdmin": false,
  "shellDomain": "https://bcombuddy.netlify.app",
  "microAppDomain": "https://your-app.netlify.app",
  "iat": 1234567890,
  "exp": 1234654290,
  "firebaseToken": "firebase_jwt_token"
}
```

## Implementation Features

### Authentication Service (`src/services/authService.ts`)
- `validateTokenFromShell()` - Parse and validate JWT from URL parameters
- `getUserData()` - Retrieve stored user data
- `isAuthenticated()` - Check authentication status
- `logout()` - Clear data and redirect to shell
- `cleanUrl()` - Remove token parameters from URL

### Authentication Hook (`src/hooks/useAuth.ts`)
- Manages both SSO and Firebase authentication
- Automatic token validation on app load
- Loading state during authentication
- Prioritizes SSO authentication over Firebase

### Protected Route Component (`src/components/ProtectedRoute.tsx`)
- Route protection component
- Loading spinner during authentication
- Authentication required message for unauthenticated users

### App Integration
- Seamless integration with existing Firebase authentication
- SSO user information display
- Proper logout handling for both authentication methods

## Security Considerations

- Validates token structure before parsing
- Checks token expiration before using
- Cleans sensitive data from URL after validation
- Uses HTTPS in production
- Handles invalid or expired tokens gracefully

## Usage

1. Users access the app through the BcomBuddy dashboard
2. The shell application redirects with JWT token in URL parameters
3. The micro-app validates the token and extracts user data
4. User is automatically logged in and can access protected content
5. Logout redirects back to the shell application

## Fallback Behavior

- If no SSO token is present, falls back to Firebase authentication
- If SSO token is invalid/expired, shows authentication required message
- Maintains existing Firebase authentication functionality for direct access
