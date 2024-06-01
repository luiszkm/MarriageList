import { useState, useEffect } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/lib/Firebase/firebaseConfig";
import { signOut } from 'firebase/auth'


const useAuthentication = () => {
  const [user, loading, error] = useAuthState(auth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const signOutApp = () => signOut(auth)
  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  return {
    user,
    loading,
    error,
    isLoggedIn,
    signOutApp
  };
};

export default useAuthentication;