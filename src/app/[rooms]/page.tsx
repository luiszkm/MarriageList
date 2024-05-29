'use client'
// Import necessary dependencies
import { SetStateAction, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable
} from '@hello-pangea/dnd'
import { Button } from '@/components/ui/button'
import useAuthentication from '@/hooks/userAutenticaton'
import { useRouter } from 'next/navigation'
import { formatSumAsBRL } from '@/utils/fornatBRL'
import productNModel from '@/../models.json'
import { product } from '@/@types/products-types'

// Define the initial tasks and task status
const tasks : product[] = productNModel
const taskStatus = {
  importantAndUrgency: {
    name: 'Importante e urgente',
    items: tasks
  },
  importantAndNotUrgency: {
    name: 'Importante e não urgente',
    items: []
  },
  UrgencyAndNotImportant: {
    name: 'Urgente e Não Importante',
    items: []
  },
  NotImportantAndNotUrgency: {
    name: 'Não Importante e Não urgente',
    items: []
  }
}

// Define the onDragEnd function, which handles the drag-and-drop functionality
const onDragEnd = (
  result: DropResult,
  columns: {
    [x: string]: any
    importantAndUrgency?: {
      name: string
      items: { id: string; content: string; url: string; price: string }[]
    }
    importantAndNotUrgency?: { name: string; items: never[] }
    UrgencyAndNotImportant?: { name: string; items: never[] }
    NotImportantAndNotUrgency?: { name: string; items: never[] }
  },
  setColumns: {
    (
      value: SetStateAction<{
        importantAndUrgency: {
          name: string
          items: { id: string; content: string; url: string; price: string }[]
        }
        importantAndNotUrgency: { name: string; items: never[] }
        UrgencyAndNotImportant: { name: string; items: never[] }
        NotImportantAndNotUrgency: { name: string; items: never[] }
      }>
    ): void
    (arg0: any): void
  }
) => {
  if (!result.destination) return
  const { source, destination } = result

  // If the source and destination are different, move the item from the source to the destination
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId]
    const destColumn = columns[destination.droppableId]
    const sourceItems = [...sourceColumn.items]
    const destItems = [...destColumn.items]
    const [removed] = sourceItems.splice(source.index, 1)
    destItems.splice(destination.index, 0, removed)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    })
  } else {
    // If the source and destination are the same, reorder the items in the source
    const column = columns[source.droppableId]
    const copiedItems = [...column.items]
    const [removed] = copiedItems.splice(source.index, 1)
    copiedItems.splice(destination.index, 0, removed)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    })
  }
}

// Define the App component, which renders the drag-and-drop interface
export default function Rooms() {
  const { isLoggedIn } = useAuthentication()
  const router = useRouter()
  const [columns, setColumns] = useState(taskStatus)

  function haldeChangeStatus() {
    const prices = columns.importantAndUrgency.items
      .map(i => i.price)
      .reduce((sum, current) => sum + Number(current), 0)
  }

  // Render the drag-and-drop interface
  return (
    <div className="h-full flex flex-col gap-3 items-center w-full max-w-6xl mx-auto">
      <h1 className="font-bold text-center">Lista de Casamento</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center h-full">
        <DragDropContext
          onDragEnd={result => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
                key={columnId}
              >
                <div>
                  <h2>{column.name}</h2>
                  <strong>
                    R${' '}
                    {formatSumAsBRL(
                      column.items
                        .map(i => i.price)
                        .reduce((sum, current) => sum + Number(current), 0)
                    )}
                  </strong>
                </div>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? 'lightblue'
                              : 'lightgrey',
                            padding: 4,
                            width: 250,
                            minHeight: 500
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      className="flex items-center gap-4"
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: 'none',
                                        padding: 16,
                                        margin: '0 0 8px 0',
                                        minHeight: '50px',
                                        backgroundColor: snapshot.isDragging
                                          ? '#263B4A'
                                          : '#456C86',
                                        color: 'white',
                                        ...provided.draggableProps.style
                                      }}
                                    >
                                      <img
                                        className="rounded-full h-12 w-12"
                                        src={item.url}
                                        alt=""
                                      />
                                    <div className=' flex flex-col'>
                                    <span>{item.name}</span>
                                      <strong>
                                        {formatSumAsBRL(Number(item.price))}
                                      </strong>
                                    </div>
                                    </div>
                                  )
                                }}
                              </Draggable>
                            )
                          })}
                          {provided.placeholder}
                        </div>
                      )
                    }}
                  </Droppable>
                </div>
              </div>
            )
          })}
        </DragDropContext>
      </div>

      <div className="w-full flex gap-4 justify-end items-center ">
        {isLoggedIn ? (
          <Button
            onClick={() => haldeChangeStatus()}
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
    </div>
  )
}
