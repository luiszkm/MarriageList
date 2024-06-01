'use client'
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { MdFilterList } from 'react-icons/md'
import { useState } from 'react'
import { formatSumAsBRL } from '@/utils/fornatBRL'
import { product } from '@/@types/products-types'
import { TableSecondary } from './secondary'

interface ProductsProps extends React.HTMLAttributes<HTMLTableElement> {
  tasks: product[]
  main?: boolean
}

export function TableMain({ tasks, main = false, ...props }: ProductsProps) {
  const [positionPrice, setPositionPrice] = React.useState('all')
  const [positionGift, setPositionGift] = React.useState('all')
  const [importantStatus, setImportantStatus] = React.useState('all')
  const [urgencyStatus, setUrgencyStatus] = React.useState('all')
  const [positionCategory, setPositionCategory] = React.useState('all')

  const [changedRows, setChangedRows] = useState<{ [key: string]: { importantChanged?: boolean; urgencyChanged?: boolean } }>({})
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
    setPositionGift('all')
    setImportantStatus('all')
    setPositionCategory('all')
    setPositionPrice('all')
    setUrgencyStatus('all')

    let sortedTasks = tasks.slice() // Cria uma cópia do array tasks

    if (barFilter === 'price') {
      setPositionPrice(value)
      if (value === 'max') {
        sortedTasks.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
      } else if (value === 'min') {
        sortedTasks.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
      }
      setFilter(sortedTasks)
    } else if (barFilter === 'gift') {
      setPositionGift(value)
      if (value === 'max') {
        sortedTasks.sort((a, b) => b.isGift.localeCompare(a.isGift))
      } else if (value === 'min') {
        sortedTasks.sort((a, b) => a.isGift.localeCompare(b.isGift))
      }
      setFilter(sortedTasks)
    } else if (barFilter === 'important') {
      setImportantStatus(value)
      if (value === 'all') {
        setFilter(tasks)
      } else if (value === 's') {
        setFilter(tasks.filter(task => task.important === 's'))
      } else if (value === 'n') {
        setFilter(tasks.filter(task => task.important === 'n'))
      }
    } else if (barFilter === 'urgency') {
      setUrgencyStatus(value)
      if (value === 'all') {
        setFilter(tasks)
      } else if (value === 's') {
        setFilter(tasks.filter(task => task.urgency === 's'))
      } else if (value === 'n') {
        setFilter(tasks.filter(task => task.urgency === 'n'))
      }
    } else if (barFilter === 'category') {
      setPositionCategory(value)
      if (value === 'all') {
        setFilter(tasks)
      } else {
        setFilter(tasks.filter(task => task.category === value))
      }
    }
  }

  const handleValueChange = (
    index: number,
    field: 'important' | 'urgency',
    originalValue: string,
    newValue: string
  ) => {
    setChangedRows(prev => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field === 'important' ? 'importantChanged' : 'urgencyChanged']:
          originalValue !== newValue
      }
    }))
  }

  React.useEffect(() => {
    const totalSum = filter.reduce(
      (total, product) => total + parseFloat(product.price),
      0
    )
    seTotalPrice(Number(totalSum))
  }, [filter])

  return main ? (
    <Table className="" {...props}>
      <TableCaption>Lista de móveis </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Produto </TableHead>
          <TableHead>Link de compra </TableHead>
          <TableHead>
            Importante{' '}
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
                  value={importantStatus}
                  onValueChange={e => handleSelectFilter(e, 'important')}
                >
                  <DropdownMenuRadioItem value="all">Todos</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="s">Importante</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="n">Não importante</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableHead>
          <TableHead>
            Urgente{' '}
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
                  value={urgencyStatus}
                  onValueChange={e => handleSelectFilter(e, 'urgency')}
                >
                  <DropdownMenuRadioItem value="all">Todos</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="s">Urgente</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="n">Não Urgente</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableHead>
          <TableHead>
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
                  <DropdownMenuRadioItem value="all">Todos</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="cozinha">Cozinha</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="quarto">Quarto</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="banheiro">Banheiro</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="enxoval">Enxoval</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="sala">Sala</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="outros">Outros</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableHead>
          <TableHead>
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
                  <DropdownMenuRadioItem value="all">Todos</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="max">Maior para menor</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="min">Menor para maior</DropdownMenuRadioItem>
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
                  <DropdownMenuRadioItem value="all">Todos</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="max">Maior para menor</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="min">Menor para maior</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filter &&
          filter.map((product, index) => {
            const isRowChanged = changedRows[index]?.importantChanged || changedRows[index]?.urgencyChanged;

            return (
              <TableRow
                key={product.id}
                className={isRowChanged ? 'bg-yellow-400 hover:bg-yellow-500' : ''}
              >
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <a href={product.url} target="_blank" rel="noopener noreferrer">
                    Clique aqui
                  </a>
                </TableCell>
                <TableCell className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                  <Select
                    defaultValue={product.important}
                    onValueChange={newValue =>
                      handleValueChange(index, 'important', product.important, newValue)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Importante</SelectLabel>
                        <SelectItem value="s">Sim</SelectItem>
                        <SelectItem value="n">Não</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                  <Select
                    defaultValue={product.urgency}
                    onValueChange={newValue =>
                      handleValueChange(index, 'urgency', product.urgency, newValue)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Urgente</SelectLabel>
                        <SelectItem value="s">Sim</SelectItem>
                        <SelectItem value="n">Não</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.isGift}</TableCell>
                <TableCell className="text-right">
                  {formatSumAsBRL(Number(product.price))}
                </TableCell>
              </TableRow>
            )
          })}
      </TableBody>
    </Table>
  ) : (
    <TableSecondary tasks={tasks} />
  )
}
