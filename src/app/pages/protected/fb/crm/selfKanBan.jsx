import React, { useState } from "react";

const initialColumns = [
  {
    id: "todo",
    title: "To Do",
    items: [
      { id: "todo-1", title: "Task 1" },
      { id: "todo-2", title: "Task 2" },
    ],
  },
  {
    id: "inprogress",
    title: "In Progress",
    items: [
      { id: "inprogress-1", title: "Task 3" },
      { id: "inprogress-2", title: "Task 33" },
    ],
  },
  {
    id: "done",
    title: "Done",
    items: [
      { id: "done-1", title: "Task 4" },
      { id: "done-2", title: "Task 5" },
    ],
  },
];

const SelfKanBan = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDrop = (targetColId) => {
    if (!draggedItem || targetColId === draggedItem?.fromColId) return;


    const newArr = columns.map(((data)=>{
        if (data.id === draggedItem?.fromColId) {
            return {...data,items:data.items.filter((card)=>card.id !== draggedItem.item.id) }
        }else if(data.id === targetColId){
            return {...data,items:[...data.items,draggedItem.item] }

        }else{
            return data
        }
    }))

    setColumns(newArr)




    setDraggedItem(null);
  };

  const KanbanCard = ({ item,fromColId }) => (
    <div
      className="bg-white p-3 rounded shadow "
      draggable="true"
   onDrag={()=>setDraggedItem({item:item,fromColId:fromColId})}
    >

      {item.title}
    </div>
  );

  const KanbanColumn = ({ column }) => (
    <div
      className="w-64 bg-gray-100 rounded p-4 shadow"
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => handleDrop(column.id)}
    >
    
      <h2 className="text-lg font-bold mb-2">{column.title}</h2>
      <div className="flex flex-col gap-2 min-h-[60px] p-1 rounded">
        {column.items.map((item) => (
          <KanbanCard key={item.id} item={item} fromColId={column.id} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex gap-4 p-4 pointer-events-auto">
 
      {columns.map((col) => (
        <KanbanColumn key={col.id} column={col} />
      ))}
    </div>
  );
};

export default SelfKanBan;
