// SSO Test Utility
// This file can be used to test SSO functionality during development
// Add this to your browser console or create a test page

export const createTestSSOUrl = (userData: any) => {
  const token = encodeURIComponent(JSON.stringify({
    uid: userData.uid || "test_user_123",
    email: userData.email || "test@example.com",
    name: userData.name || "Test User",
    yearOfStudy: userData.yearOfStudy || "3rd Year",
    role: userData.role || "student",
    isAdmin: userData.isAdmin || false,
    shellDomain: "https://bcombuddy.netlify.app",
    microAppDomain: window.location.origin,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
    firebaseToken: "test_firebase_token"
  }));

  const testUrl = `${window.location.origin}?token=${token}&sso=true&shell=https://bcombuddy.netlify.app`;
  
  console.log('🧪 Test SSO URL created:', testUrl);
  console.log('📋 Test user data:', userData);
  
  return testUrl;
};

// Example usage:
// const testUrl = createTestSSOUrl({
//   name: "John Doe",
//   email: "john.doe@university.edu",
//   role: "student",
//   yearOfStudy: "3rd Year"
// });
// window.location.href = testUrl;

export const clearSSOData = () => {
  localStorage.removeItem('user_data');
  console.log('🧹 SSO data cleared from localStorage');
};

export const getCurrentSSOData = () => {
  const data = localStorage.getItem('user_data');
  if (data) {
    console.log('📊 Current SSO data:', JSON.parse(data));
    return JSON.parse(data);
  } else {
    console.log('📊 No SSO data found');
    return null;
  }
};
