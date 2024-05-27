import { Auth } from "firebase/auth";

declare module "firebase/auth" {
  interface AccessToken {
    accessToken: string;
    expirationTime: number;
  }
  
  interface ProviderData {
    providerId: string;
    email: string;
  }
  
  interface StsTokenManager {
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
  }
  
  interface User {
    displayName: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    metadata: {
      createdAt: string;
      lastLoginAt: string;
      lastSignInTime: string;
      creationTime: string;
    };
    phoneNumber: string | null;
    photoURL: string | null;
    proactiveRefresh: {
      isRunning: boolean;
      timerId: string | null;
      errorBackoff: number;
    };
    providerData: ProviderData[];
    providerId: string;
    reloadUserInfo: {
      localId: string;
      email: string;
      displayName: string;
      photoUrl: string;
      emailVerified: boolean;
      phoneNumber: string | null;
      lastLoginAt: string;
      createdAt: string;
      screenName: string;
      passwordHash: string;
      lastRefreshAt: string;
      createdAtTimestamp: string;
      lastLoginAtTimestamp: string;
      phoneNumberVerifiedTime: string;
      phoneNumberVerificationInfo: string;
      tenantId: string;
    };
    stsTokenManager: StsTokenManager;
    tenantId: string | null;
    uid: string;
  }
}
