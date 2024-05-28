import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/Firebase/firebaseConfig";

const useAuthentication = () => {
  const [user, loading, error] = useAuthState(auth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  return {
    user,
    loading,
    error,
    isLoggedIn,
  };
};

export default useAuthentication;