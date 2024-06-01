// app/login/page.tsx
'use client'

import { Button } from '@/components/ui/button';
import { signInWithGoogle } from '@/lib/Firebase/auth'
import { useRouter } from 'next/navigation'
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const route = useRouter()

  async function handleLogin() {
    await signInWithGoogle()
    route.push('/')
  }

  return (
    <div>
      <h1>Login</h1>
      <Button className='flex gap-4'
       onClick={handleLogin}>
      <FcGoogle />
        Faça Login com Google</Button>
    </div>
  )
}
