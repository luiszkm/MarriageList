'use client'
import {  signInWithGoogle} from '@/lib/Firebase/auth';
import UserProfile from '../components/UserProfile';

export default function App (){

 

  return(
    <main>
      <h1>Bem vindo</h1>
      <UserProfile/>

      <button className='w-5 h-5 rounded-full border flex items-center'>
        <a href="/products"> + </a>
      </button>
    </main>
  )
}