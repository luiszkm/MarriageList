'use client'
// Import necessary dependencies
import { SetStateAction, useState } from "react";
import { DragDropContext, Draggable, DropResult, Droppable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import useAuthentication from "@/hooks/userAutenticaton";
import { useRouter } from "next/navigation";

// Define the initial tasks and task status
const tasks = [
  { id: "1", content: "Geladeira", url: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRi34tRi9AqT4G_EaxFWWsbXKCDR57KdDkynATBtH5EWmtHi9isVA_zleS8y-wvWQeIDj3Dos5MxXzau7U7oMK0H--T2KPD9ALWUxqGnTd-w31M-nVqYam6HYD2nB3bM73fZ2ScAOY&usqp=CAc", price: "3000" },
  { id: "2", content: "Sofá", url: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTZLUUsuWsirgzlmRAtgrTllsbKIoFSLvu67NQqZXUVMJdvdzv8h7q5aOeKUhaCY1HunxuwKxhNPqDG3Prf7enVJybHN2ayW8gC5q9qSQoTnnlWbm9CTDg7FFJ9Vw&usqp=CAc", price: "1500" },
  { id: "3", content: "Fogão", url: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSXeYMb53yL_HtpepRT4W9S1N9TGo_RLoxbAjEE-W-BUzRvfMEqT0wgMdvoTpel9zkswMvsXe-GOWEE2wG54QF0EFFsxU3PJtYwocRP_IWC_EDW5NNOD9ZKNPSzQtqFTLdE1xy9vPQ&usqp=CAc", price: "1180" },
  { id: "4", content: "Máquina de lavar", url: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRrsW28BsfLSy2KTXMtbDDm0BBWZc7LWLyK7Fa9imgwkbhQ_2ZUeJEPBnBh1pRPpRMZDdsiN0zB_KCVuiIkVvdXguv5oEVDhXq8DzCvbB7i_stOqpBgTP61M_HPCVMgq-9wt8KCNA&usqp=CAc", price: "1900" },
  { id: "5", content: "Cama casal", url: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSgmlMEb50bbYPmIz5hdCSRGwi08yWzs_QLjoPXD_2nl9ZvyLlKE6IykUFlibUIQgKEjTG8W5-drRBIWP2h7AhUR_G8_RFAOmZa1264DScYsnzxHoD6NS9iM0TO_THx90kUg1KniOOO9g&usqp=CAc", price: "1700" },

];

const taskStatus = {
  importantAndUrgency: {
    name: "Importante e urgente",
    items: tasks
  },
  importantAndNotUrgency: {
    name: "Importante e não urgente",
    items: []
  },
  UrgencyAndNotImportant: {
    name: "Urgente e Não Importante",
    items: []
  },
  NotImportantAndNotUrgency: {
    name: "Não Importante e Não urgente",
    items: []
  }
};

// Define the onDragEnd function, which handles the drag-and-drop functionality
const onDragEnd = (result: DropResult, columns: { [x: string]: any; importantAndUrgency?: { name: string; items: { id: string; content: string; url: string; price: string; }[]; }; importantAndNotUrgency?: { name: string; items: never[]; }; UrgencyAndNotImportant?: { name: string; items: never[]; }; NotImportantAndNotUrgency?: { name: string; items: never[]; }; }, setColumns: { (value: SetStateAction<{ importantAndUrgency: { name: string; items: { id: string; content: string; url: string; price: string; }[]; }; importantAndNotUrgency: { name: string; items: never[]; }; UrgencyAndNotImportant: { name: string; items: never[]; }; NotImportantAndNotUrgency: { name: string; items: never[]; }; }>): void; (arg0: any): void; }) => {
  if (!result.destination) return;
  const { source, destination } = result;

  // If the source and destination are different, move the item from the source to the destination
  if (source.droppableId!== destination.droppableId) {
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
        items: sourceItems
      },
      [destination.droppableId]: {
       ...destColumn,
        items: destItems
      }
    });
  } else {
    // If the source and destination are the same, reorder the items in the source
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
     ...columns,
      [source.droppableId]: {
       ...column,
        items: copiedItems
      }
    });
  }
};

// Define the App component, which renders the drag-and-drop interface
export default function Rooms() {
  const {isLoggedIn} = useAuthentication()
  const router = useRouter ()
  const [columns, setColumns] = useState(taskStatus);

  function haldeChangeStatus (){
    const prices = columns.importantAndUrgency.items.map(i => i.price).reduce((sum, current) => sum + Number(current), 0)
       
  }
  function formatSumAsBRL(price: number): string {
    // Calcular a soma dos valores em centavos
  
    // Converter a soma para reais
    const totalInReais: number = Number(price / 100);
  
    // Formatar o valor como moeda
    const formattedTotal: string = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(totalInReais);
  
    return formattedTotal;
  }

  // Render the drag-and-drop interface
  return (
    <div className="h-full flex flex-col gap-3 items-center w-full max-w-6xl mx-auto">
      <h1 className="font-bold text-center" >Lista de Casamento</h1>
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
                key={columnId}
              >
                <div>
                  <h2>{column.name}</h2>
                  <strong>R$ {formatSumAsBRL(column.items.map(i => i.price).reduce((sum, current) => sum + Number(current), 0))}</strong>
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
                             ? "lightblue"
                              : "lightgrey",
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
                                    <div className="flex items-center justify-between"
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                         ? "#263B4A"
                                          : "#456C86",
                                        color: "white",
                                      ...provided.draggableProps.style
                                      }}
                                    >
                                      <img className="rounded-full h-12 w-12" src={item.url} alt="" />
                                      {item.content}
                                      <strong>R${item.price}</strong>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>



      <div className="w-full flex gap-4 justify-end items-center ">
        {
          isLoggedIn ?  <Button onClick={()=> haldeChangeStatus()}
          className="bg-green-500 hover:bg-green-700" >Salvar alterações</Button> :
          <Button onClick={()=> router.push("/login")}
          className="w-full bg-red-700 hover:bg-red-900 " >Faça Login para cadastrar</Button>
        }
       
      </div>
    </div>
  );
}