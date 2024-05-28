// src/components/UserProfile.tsx
'use client'
import { signIn, signOut, useSession } from 'next-auth/react';
import { signInWithGoogle } from '@/lib/Firebase/auth';
import { GoogleAuthProvider, User, getAuth, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../lib/Firebase/firebaseConfig'; 

import { useRouter } from 'next/navigation';

const UserProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);  const [accessToken, setAccessToken] = useState(null);

const isLoggedIn = !!accessToken;

if (isLoggedIn) {
  console.log("O usuário está logado!");
} else {
  console.log("O usuário não está logado.");
}

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Limpar o listener quando o componente for desmontado
    return () => unsubscribe();
    
  }, []);

  console.log(user);
  

    return (
      <div>
        <h1>Bem vindo {user?.displayName}</h1>
      </div>
    )

 

};

export default UserProfile;
