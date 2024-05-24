'use client'

import { useState } from 'react'

import { GiHamburgerMenu, GiHanger } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import {
  MdBedroomParent,
  MdLiving,
  MdLocalLaundryService,
  MdOutlineAttachMoney,
  MdOutlineHouse,
  MdShower,
  MdSoupKitchen
} from 'react-icons/md'

export function NavMenu() {
  const [showMenu, setShowMenu] = useState(false)
  try {
    const body: any = document.querySelector('body')
    showMenu
      ? (body.className = 'overflow-hidden')
      : (body.className = 'overflow-auto')
  } catch (error) {
    console.log(error)
  }

  return (
    <div>
      {!showMenu ? (
        <div className="md:hidden ">
          <GiHamburgerMenu
            className="cursor-pointer"
            onClick={() => setShowMenu(true)}
          />
        </div>
      ) : (
        <div>
          <nav className="w-full min-h-screen absolute top-0 left-0 bg-gradient-to-b from-cyan-900 via-cyan-600 to-cyan-200 flex justify-center items-start py-16 z-20  dark:from-gray-900 dark:to-gray-400 dark:via-gray-700 ">
            <AiOutlineClose
              className="cursor-pointer absolute top-3 right-3"
              onClick={() => setShowMenu(false)}
            />
            <ul className="flex flex-col gap-4 text-center cursor-pointer">
              <li className=" hover:text-zinc-700 hover:text-xlrelative group hover:text-zinc-700 hover:text-xl">
                <a href="/all" className="flex items-center gap-2">
                  {' '}
                  <MdOutlineHouse />
                  Todos
                </a>
                <div
                  className="w-0 h-0.5 m-auto bg-pink-700
                transition-all duration-500 ease-in-out
                 group-hover:w-full "
                />
              </li>
              <li className="relative group hover:text-zinc-700 hover:text-xl">
                <a href="/livingRoom" className="flex items-center gap-2">
                  <MdLiving />
                  Sala
                </a>
                <div
                  className="w-0 h-0.5 m-auto bg-pink-700
                transition-all duration-500 ease-in-out
                 group-hover:w-full "
                />
              </li>
              <li className="relative group hover:text-zinc-700 hover:text-xl">
                <a href="/kitchen" className="flex items-center gap-2">
                  {' '}
                  <MdSoupKitchen />
                  Cozinha
                </a>
                <div
                  className="w-0 h-0.5 m-auto bg-pink-700
                transition-all duration-500 ease-in-out
                 group-hover:w-full "
                />
              </li>
              <li className="relative group hover:text-zinc-700 hover:text-xl">
                <a href="/bathroom" className="flex items-center gap-2">
                  <MdShower />
                  Banheiro
                </a>
                <div
                  className="w-0 h-0.5 m-auto bg-pink-700
                transition-all duration-500 ease-in-out
                 group-hover:w-full "
                />
              </li>
              <li className="relative group hover:text-zinc-700 hover:text-xl">
                <a href="/trousseau" className="flex items-center gap-2">
                  <GiHanger />
                  Enxoval
                </a>
                <div
                  className="w-0 h-0.5 m-auto bg-pink-700
                transition-all duration-500 ease-in-out
                 group-hover:w-full "
                />
              </li>
              <li className="relative group hover:text-zinc-700 hover:text-xl">
                <a href="/bedroom" className="flex items-center gap-2">
                  <MdBedroomParent />
                  Quarto
                </a>
                <div
                  className="w-0 h-0.5 m-auto bg-pink-700
                transition-all duration-500 ease-in-out
                 group-hover:w-full "
                />
              </li>
              <li className="relative group hover:text-zinc-700 hover:text-xl">
                <a href="/others" className="flex items-center gap-2">
                  {' '}
                  <MdLocalLaundryService />
                  Outros
                </a>
                <div
                  className="w-0 h-0.5 m-auto bg-pink-700
                transition-all duration-500 ease-in-out
                 group-hover:w-full "
                />
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  )
}
