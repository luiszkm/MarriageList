// app/login/page.tsx
'use client'

import { signInWithGoogle } from '@/lib/Firebase/auth'
import { useRouter } from 'next/navigation'

export default function Login() {
  const route = useRouter()

  async function handleLogin() {
    await signInWithGoogle()
    route.push('/')
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login com Google</button>
    </div>
  )
}
