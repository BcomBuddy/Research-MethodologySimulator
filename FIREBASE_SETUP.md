# Firebase Authentication Setup

This project uses Firebase Authentication for user login and management.

## Firebase Configuration

The Firebase configuration is already set up in `src/firebase/config.ts` with the following credentials:

- **Project ID**: bcombuddy-e8708
- **Auth Domain**: bcombuddy-e8708.firebaseapp.com
- **API Key**: AIzaSyCiV1NRc2py3v9ca9MVob7BYK_hntj2phg

## Authentication Methods Enabled

1. **Email/Password Authentication**
   - Users can sign in with email and password
   - Proper error handling for invalid credentials

2. **Google Sign-In**
   - Users can sign in with their Google account
   - Popup-based authentication flow

## Features

- ✅ **Email/Password Login**: Full validation and error handling
- ✅ **Google Sign-In**: One-click authentication
- ✅ **Error Handling**: User-friendly error messages
- ✅ **Loading States**: Proper loading indicators during authentication
- ✅ **Persistent Sessions**: Users stay logged in across browser sessions
- ✅ **Account Creation Redirect**: Links to Shell App signup page
- ✅ **Modular Architecture**: Clean separation of authentication logic

## Error Messages

The app handles various Firebase authentication errors:

- Invalid email format
- Wrong password
- User not found
- Account disabled
- Too many failed attempts
- Network errors
- Popup blocked/closed
- Account exists with different credentials

## Usage

1. **Login Page**: Users see the login form on first visit
2. **Email/Password**: Enter credentials and click "Sign In"
3. **Google Sign-In**: Click "Sign in with Google" button
4. **Create Account**: Click "Create a new account" to go to Shell App signup
5. **Logout**: Use the "Sign Out" button in the sidebar

## Development

To test the authentication:

1. Run `npm run dev`
2. Open the application in your browser
3. Try logging in with test credentials
4. Test Google sign-in (ensure popups are allowed)
5. Test error scenarios (wrong password, invalid email, etc.)

## Security Notes

- All authentication is handled securely through Firebase
- No sensitive data is stored locally
- User sessions are managed by Firebase Auth
- Proper error handling prevents information leakage
