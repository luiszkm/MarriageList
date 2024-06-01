// src/components/UserProfile.tsx
'use client'
'use client'

import * as React from 'react'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import { CiLogin, CiUser } from "react-icons/ci";

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useRouter } from 'next/navigation'
import useAuthentication from '@/hooks/userAutenticaton'

type Checked = DropdownMenuCheckboxItemProps['checked']

type UserProfileProps = {
  avatarUrl: string
}

export function UserProfile({ avatarUrl }: UserProfileProps) {
  const router = useRouter()
  const { signOutApp, isLoggedIn,user } = useAuthentication()
  const name = user?.displayName.split(' ')[0]
  async function handleLogout() {
    await signOutApp()
    router.push('/login')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-10 h-10 p-0 rounded-full" variant="outline">
          <Avatar>
            <AvatarImage
              className="w-full h-full rounded-full"
              src={avatarUrl}
            />

            <AvatarFallback>
            <CiUser />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{
          isLoggedIn ? `Bem Vindo ${name}` : 'Faça login para continuar'
          }</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuCheckboxItem className='hover:cursor-pointer'>Status Bar</DropdownMenuCheckboxItem> */}
        {isLoggedIn ? (
          <DropdownMenuCheckboxItem
            onClick={() => handleLogout()}
            className="hover:cursor-pointer"
          >
            <CiLogin />
            Sair
          </DropdownMenuCheckboxItem>
        ) : (
          <DropdownMenuCheckboxItem
            onClick={() => router.push('/login')}
            className="hover:cursor-pointer"
          >
            Fazer Login
          </DropdownMenuCheckboxItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
