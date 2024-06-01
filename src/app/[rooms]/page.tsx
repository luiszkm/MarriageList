'use client';

import { SetStateAction, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable
} from '@hello-pangea/dnd';
import { Button } from '@/components/ui/button';
import useAuthentication from '@/hooks/userAutenticaton';
import { useRouter } from 'next/navigation';
import { formatSumAsBRL } from '@/utils/fornatBRL';
import productNModel from '@/../models.json';
import { product } from '@/@types/products-types';

const tasks: product[] = productNModel;

const taskStatus: {
  [key: string]: {
    name: string;
    items: product[];
  };
} = {
  importantAndUrgency: {
    name: 'Importante e urgente',
    items: tasks,
  },
  importantAndNotUrgency: {
    name: 'Importante e não urgente',
    items: [],
  },
  UrgencyAndNotImportant: {
    name: 'Urgente e Não Importante',
    items: [],
  },
  NotImportantAndNotUrgency: {
    name: 'Não Importante e Não urgente',
    items: [],
  },
};

const onDragEnd = (
  result: DropResult,
  columns: {
    [key: string]: { name: string; items: product[] };
  },
  setColumns: React.Dispatch<
    SetStateAction<{
      [key: string]: { name: string; items: product[] };
    }>
  >
) => {
  if (!result.destination) return;

  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

export default function Rooms() {
  const { isLoggedIn } = useAuthentication();
  const router = useRouter();
  const [columns, setColumns] = useState(taskStatus);

  const handleChangeStatus = () => {
    const prices = columns.importantAndUrgency.items
      .map(i => i.price)
      .reduce((sum, current) => sum + Number(current), 0);
  };

  return (
    <div className="h-full flex flex-col gap-3 items-center w-full max-w-6xl mx-auto">
      <h1 className="font-bold text-center">Lista de Casamento</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center h-full">
        <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
          {Object.entries(columns).map(([columnId, column], index) => (
            <div className="flex flex-col items-center" key={columnId}>
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
                  {(provided, snapshot) => (
                    <div
                      className="scrollable-container p-1"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                        width: 250,
                        minHeight: 576,
                        maxHeight: 720,
                        overflowY: 'auto',
                        overflowX: 'hidden'
                      }}
                    >
                      {column.items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              className="flex items-center gap-4"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                userSelect: 'none',
                                padding: 8,
                                margin: '0 0 4px 0',
                                minHeight: '50px',
                                backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                                color: 'white',
                                ...provided.draggableProps.style
                              }}
                            >
                              <img className="rounded-full h-12 w-12" src={item.url} alt="" />
                              <div className="flex flex-col">
                                <span>{item.name}</span>
                                <strong>{formatSumAsBRL(Number(item.price))}</strong>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          ))}
        </DragDropContext>
      </div>

      <div className="w-full flex gap-4 justify-end items-center ">
        {isLoggedIn ? (
          <Button onClick={handleChangeStatus} className="bg-green-500 hover:bg-green-700">
            Salvar alterações
          </Button>
        ) : (
          <Button onClick={() => router.push('/login')} className="w-full bg-red-700 hover:bg-red-900">
            Faça Login para cadastrar
          </Button>
        )}
      </div>
    </div>
  );
}
