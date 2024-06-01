'use client'
import { ProfileForm } from '@/components/Form'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { MdFilterList } from 'react-icons/md'
import { TotalPrice } from '@/components/TotalPrice'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { formatSumAsBRL } from '@/utils/fornatBRL'
import productNModel from '@/../models.json'
import { product } from '@/@types/products-types'
import { TableMain } from '@/components/table'

const tasks: product[] = productNModel

export default function App() {
  const [positionPrice, setPositionPrice] = React.useState('all')
  const [positionGift, setPositionGift] = React.useState('all')
  const [positionStatus, setPositionStatus] = React.useState('all')
  const [positionCategory, setPositionCategory] = React.useState('all')
  const [filter, setFilter] = useState<product[]>(tasks)
  const [total, seTotalPrice] = useState(0)

  function renderImportantAndUrgency(important: string, urgency: string) {
    if (important === 's' && urgency === 's') return 'Importante e urgente'
    if (important === 's' && urgency === 'n') return 'Importante'
    if (important === 'n' && urgency === 's') return 'Urgente'
    if (important === 'n' && urgency === 'n')
      return 'Não Importante e Não urgente'
  }

  async function handleSelectFilter(value: string, barFilter: string) {
    setPositionGift('')
    setPositionStatus('')
    setPositionCategory('')
    setPositionPrice('')

    let sortedTasks = tasks.slice() // Cria uma cópia do array tasks

    if (barFilter === 'price') {
      setPositionPrice(value)
      if (value === 'max') {
        sortedTasks.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
      }
      if (value === 'min') {
        sortedTasks.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
      }
      setFilter(sortedTasks)
    } else if (barFilter === 'gift') {
      setPositionGift(value)
      if (value === 'max') {
        sortedTasks.sort((a, b) => a.isGift.localeCompare(b.isGift))
      }
      if (value === 'min') {
        sortedTasks.sort((a, b) => b.isGift.localeCompare(a.isGift))
      }
      setFilter(sortedTasks)
    } else if (barFilter === 'status') {
      setPositionStatus(value)
      if (value === 'all') {
        setFilter(tasks)
      } else if (value === 'important') {
        setFilter(tasks.filter(task => task.important === 's'))
      } else if (value === 'urgency') {
        setFilter(tasks.filter(task => task.urgency === 's'))
      } else if (value === 'not')
        setFilter(
          tasks.filter(task => task.urgency === 'n' && task.important === 'n')
        )
    } else if (barFilter === 'category') {
      setPositionCategory(value)
      if (value === 'all') {
        setFilter(tasks)
      } else {
        setFilter(tasks.filter(task => task.category === value))
      }
    }
  }

  function sumPrices(products: product[]): number {
    return products.reduce(
      (total, product) => total + parseFloat(product.price),
      0
    )
  }

  React.useEffect(() => {
    const totalSum = filter.reduce(
      (total, product) => total + parseFloat(product.price),
      0
    )
    seTotalPrice( Number(totalSum))
  }, [filter])
  return (
    <section
      className="w-full h-full  flex flex-col gap-5 items-center 
    lg:flex-row  lg:items-start  p-2"
    >
      <div className="flex-col items-center gap-8">
        <ProfileForm />
        <TotalPrice price={total}/> 
      </div>
      <TableMain 
      className='sm:max-w-6xl'
      tasks={tasks} 
      
      />  
    </section>
  )
}
