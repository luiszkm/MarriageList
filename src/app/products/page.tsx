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

const tasks = [
  {
    id: '1',
    name: 'Geladeira',
    url: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRi34tRi9AqT4G_EaxFWWsbXKCDR57KdDkynATBtH5EWmtHi9isVA_zleS8y-wvWQeIDj3Dos5MxXzau7U7oMK0H--T2KPD9ALWUxqGnTd-w31M-nVqYam6HYD2nB3bM73fZ2ScAOY&usqp=CAc',
    price: '3000'
  },
  {
    id: '2',
    name: 'Sofá',
    url: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTZLUUsuWsirgzlmRAtgrTllsbKIoFSLvu67NQqZXUVMJdvdzv8h7q5aOeKUhaCY1HunxuwKxhNPqDG3Prf7enVJybHN2ayW8gC5q9qSQoTnnlWbm9CTDg7FFJ9Vw&usqp=CAc',
    price: '1500'
  },
  {
    id: '3',
    name: 'Fogão',
    url: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSXeYMb53yL_HtpepRT4W9S1N9TGo_RLoxbAjEE-W-BUzRvfMEqT0wgMdvoTpel9zkswMvsXe-GOWEE2wG54QF0EFFsxU3PJtYwocRP_IWC_EDW5NNOD9ZKNPSzQtqFTLdE1xy9vPQ&usqp=CAc',
    price: '1180'
  },
  {
    id: '4',
    name: 'Máquina de lavar',
    url: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRrsW28BsfLSy2KTXMtbDDm0BBWZc7LWLyK7Fa9imgwkbhQ_2ZUeJEPBnBh1pRPpRMZDdsiN0zB_KCVuiIkVvdXguv5oEVDhXq8DzCvbB7i_stOqpBgTP61M_HPCVMgq-9wt8KCNA&usqp=CAc',
    price: '1900'
  },
  {
    id: '5',
    name: 'Cama casal',
    url: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSgmlMEb50bbYPmIz5hdCSRGwi08yWzs_QLjoPXD_2nl9ZvyLlKE6IykUFlibUIQgKEjTG8W5-drRBIWP2h7AhUR_G8_RFAOmZa1264DScYsnzxHoD6NS9iM0TO_THx90kUg1KniOOO9g&usqp=CAc',
    price: '1700'
  }
]

export default function App() {
  const [positionPrice, setPositionPrice] = React.useState('all')
  const [positionGift, setPositionGift] = React.useState('all')
  const [positionStatus, setPositionStatus] = React.useState('all')
  const [positionCategory, setPositionCategory] = React.useState('all')
  const [filter, setFilter] = React.useState()

  function handleSelectFilter(value: string, barFilter: string) {
    setPositionGift('')
    setPositionStatus('')
    setPositionCategory('')
    setPositionPrice('')
    if (barFilter === 'price') {
      setPositionPrice(value)
    }
    if (barFilter === 'gift') {
      setPositionGift(value)
    }
    if (barFilter === 'status') {
      setPositionStatus(value)
    }
    if (barFilter === 'category') {
      setPositionCategory(value)
    }
  }

  const router = useRouter()

  return (
    <section
      className="w-full h-full  flex flex-col gap-5 items-center 
    lg:flex-row  lg:items-start  p-2"
    >
      <div className="flex-col items-center gap-8">
        <ProfileForm />
        <TotalPrice />
      </div>
      <Table className="">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Produto </TableHead>
            <TableHead className="">Link de compra </TableHead>
            <TableHead className="">
              Status{' '}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="p-0 border-none" variant="outline">
                    <MdFilterList />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-32">
                  <DropdownMenuLabel>Selecione seu filtro</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={positionStatus}
                    onValueChange={e => handleSelectFilter(e, 'status')}
                  >
                    <DropdownMenuRadioItem value="all">
                      Todos
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="max">
                      Maior para menor
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="min">
                      Menor para maior
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableHead>
            <TableHead className="">
              Categoria{' '}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="p-0 border-none" variant="outline">
                    <MdFilterList />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Selecione seu filtro</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={positionCategory}
                    onValueChange={e => handleSelectFilter(e, 'category')}
                  >
                    <DropdownMenuRadioItem value="all">
                      Todos
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="max">
                      Maior para menor
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="min">
                      Menor para maior
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableHead>
            <TableHead className="">
              Presente{' '}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="p-0 border-none" variant="outline">
                    <MdFilterList />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Selecione seu filtro</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={positionGift}
                    onValueChange={e => handleSelectFilter(e, 'gift')}
                  >
                    <DropdownMenuRadioItem value="all">
                      Todos
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="max">
                      Maior para menor
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="min">
                      Menor para maior
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableHead>
            <TableHead className="text-right w-24">
              Preço{' '}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="p-0 border-none" variant="outline">
                    <MdFilterList />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Selecione seu filtro</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={positionPrice}
                    onValueChange={e => handleSelectFilter(e, 'price')}
                  >
                    <DropdownMenuRadioItem value="all">
                      Todos
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="max">
                      Maior para menor
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="min">
                      Menor para maior
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Sofá</TableCell>
            <TableCell>Importante</TableCell>
            <TableCell>Link</TableCell>
            <TableCell>Cozinha</TableCell>
            <TableCell>Padrinhos</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          {tasks &&
            tasks.map(i => (
              <TableRow key={String(i)}>
                <TableCell className="font-medium">{i.name}</TableCell>
                <TableCell>sim</TableCell>
                <TableCell className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                  <a href={i.url} target="_blank" rel="noopener noreferrer">
                    Clique aqui
                  </a>
                </TableCell>
                <TableCell>Cozinha</TableCell>
                <TableCell>n/a</TableCell>
                <TableCell className="text-right">{i.price}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </section>
  )
}
