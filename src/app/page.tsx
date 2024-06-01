'use client'
import { TableMain } from '@/components/table'
import productNModel from '@/../models.json'
import { product } from '@/@types/products-types'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import useAuthentication from '@/hooks/userAutenticaton'

const tasks: product[] = productNModel
export default function App() {
  const { isLoggedIn } = useAuthentication()

  const router = useRouter()

  return (
    <main>
      <h1>Bem vindo</h1>
      <TableMain main className="" tasks={tasks} />
      <div className="w-full flex gap-4 justify-end items-center ">
        {isLoggedIn ? (
          <Button
            className="bg-green-500 hover:bg-green-700"
          >
            Salvar alterações
          </Button>
        ) : (
          <Button
            onClick={() => router.push('/login')}
            className="w-full bg-red-700 hover:bg-red-900 "
          >
            Faça Login para cadastrar
          </Button>
        )}
      </div>

      <button className="w-5 h-5 rounded-full border flex items-center">
        <a href="/products"> + </a>
      </button>
    </main>
  )
}
