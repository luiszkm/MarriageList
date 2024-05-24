'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const formSchema = z.object({
  productName: z.string().min(4, {
    message: 'productName must be at least 4 characters.'
  }),
  productLink: z.string().min(4, {
    message: 'productLink must be at least 4 characters.'
  }),
  productImage: z.string().min(4, {
    message: 'productImage must be at least 4 characters.'
  }),
  importedProduct: z.enum(['s', 'n']),
  urgentProduct: z.enum(['s', 'n']),
  price: z.string().min(1, {
    message: 'Price must be at least 1.00.'
  }),
  category: z.enum([
    'sala',
    'quarto',
    'cozinha',
    'banheiro',
    'enxoval',
    'outros'
  ]),
  isGift: z.string()
})

export function ProfileForm() {
  const [price, setPrice] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
      productLink: '',
      productImage: '',
      importedProduct: 's',
      urgentProduct: 's',
      isGift: "",
      price: ''
    }
  })

  const handleSetPrice = (value: string) => {
    const numericValue = value.replace(/\D/g, "")
    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numericValue / 100)
    setPrice(formattedValue)
  }

  const convertPriceToCents = (price: string) => {
    const numericValue = price.replace(/[^\d]/g, "")
    return parseInt(numericValue, 10)
  }

  const onSubmit = (data: any) => {
    const priceInCents = convertPriceToCents(price)
    const formData = { ...data, price: priceInCents }

    // Aqui você pode fazer a chamada para salvar os dados no seu banco de dados
    console.log(formData)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md">
        <fieldset className="w-full h-full max-w-md border p-3 space-y-2 rounded-lg">
          <legend>Cadastrar Item</legend>
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produto</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Geladeira" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagem do produto</FormLabel>
                <FormControl>
                  <Input placeholder="url de uma imagem do produto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link Produto</FormLabel>
                <FormControl>
                  <Input placeholder="Link do produto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-5 justify-between">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Cômodo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="sala">Sala</SelectItem>
                      <SelectItem value="cozinha">Cozinha</SelectItem>
                      <SelectItem value="banheiro">Banheiro</SelectItem>
                      <SelectItem value="quarto">Quarto</SelectItem>
                      <SelectItem value="enxoval">Enxoval</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isGift"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Possível presente</FormLabel>
                  <FormControl>
                    <Input 
                     placeholder="Ex: nome do padrinho" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center gap-2  text-center justify-between">
            <FormField
              control={form.control}
              name="importedProduct"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>importante?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="s" />
                        </FormControl>
                        <FormLabel className="font-normal">Sim</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="n" />
                        </FormControl>
                        <FormLabel className="font-normal">Não</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="urgentProduct"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Urgente?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="s" />
                        </FormControl>
                        <FormLabel className="font-normal">Sim</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="n" />
                        </FormControl>
                        <FormLabel className="font-normal">Não</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input
                      value={price}
                      onChange={(e) => {
                        handleSetPrice(e.target.value)
                        field.onChange(e.target.value)
                      }}
                      placeholder="R$ 00,00"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            Cadastrar
          </Button>
        </fieldset>
      </form>
    </Form>
  )
}
