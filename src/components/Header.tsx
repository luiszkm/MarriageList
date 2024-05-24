import {
  MdBedroomParent,
  MdLiving,
  MdLocalLaundryService,
  MdOutlineAttachMoney,
  MdOutlineHouse,
  MdShower,
  MdSoupKitchen
} from 'react-icons/md'
import { GiHanger } from 'react-icons/gi'
import { TiPlusOutline } from "react-icons/ti";

import { NavMenu } from './NavMenu';

export function Header() {
  return (
    <header className="w-full h-12 flex  items-center border-b">
      <nav className="hidden md:flex mx-auto w-full max-w-6xl items-center justify-between">

        <ul className="flex gap-6 font-bold text-center cursor-pointer text-zinc-500 ">
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
        <div>
          <ul className='flex items-center gap-2'>
          <li className="relative group hover:text-zinc-700 hover:text-xl">
          <a href="/products" className="flex items-center gap-2">
              {' '}
              <TiPlusOutline />
              Cadastrar
            </a>
            <div
              className="w-0 h-0.5 m-auto bg-pink-700
                transition-all duration-500 ease-in-out
                 group-hover:w-full "
            />
          </li>
          <li className="relative group hover:text-zinc-700 hover:text-xl">
          <a href="/" className="flex items-center gap-2">
              {' '}
              <MdOutlineAttachMoney />
              Gastos
            </a>
            <div
              className="w-0 h-0.5 m-auto bg-pink-700
                transition-all duration-500 ease-in-out
                 group-hover:w-full "
            />
          </li>
          </ul>
        </div>
      </nav>

      <NavMenu/>

    </header>
 
  )
}
