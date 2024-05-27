'use client'
import {  signInWithGoogle} from '@/lib/Firebase/auth';
import UserProfile from '../components/UserProfile';

export default function App (){

 

  return(
    <main>
      <h1>Bem vindo</h1>
      <UserProfile/>
    </main>
  )
}