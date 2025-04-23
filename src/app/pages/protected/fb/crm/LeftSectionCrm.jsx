import { DndContext, 
      closestCenter,
    PointerSensor,
    useSensor,
    useSensors, } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { formatDate } from "../../../../../helpers/formatDate";
import { t } from "i18next";
import { useEffect, useRef, useState } from "react";
import usefbCRM from "../../../../../store/fb/fbCRM";

const SortableItem = ({ group, selectedGroup ,setSelectedGroup,getGroupById}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: group.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };


  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    isDragging.current = false;
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = (e) => {
    const dx = Math.abs(e.clientX - startPos.current.x);
    const dy = Math.abs(e.clientY - startPos.current.y);
    const moved = dx > 5 || dy > 5;

    if (!moved) {
      onClick(group);
    }
  };

  const onClick = async(data) =>{
    setSelectedGroup(data) 
    
    await getGroupById(data.id)

   }

  return (
    <div >

    
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={() => onClick(group)}
      className={`flex items-center space-x-2 px-4 py-2 mb-2 rounded-md cursor-pointer border bg-white hover:bg-gray-100 ${
        selectedGroup?.id === group.id ? "border-[#0087FF]" : "border-[#E6F1FB]"
      }`}
      
    >
      <div  className="w-10 h-9 rounded-full flex items-center justify-center font-bold text-white bg-blue-500 uppercase">
        {group.name
          .split(" ")
          .map((word) => word[0])
          .join("")
          .slice(0, 2)}
      </div>
      <div className="flex flex-col items-center w-full">
        <div className="flex items-center justify-between w-full">
          <span className="capitalize">{group.name}</span>
          <span className="text-xl text-gray-400">⋮</span>
        </div>
        <div className="flex items-center justify-between w-full">
          {/* <span className="text-sm text-gray-600">20 leads</span> */}
          <span className="text-sm text-gray-400">{formatDate(group.createdAt)}</span>
        </div>
      </div>
    </div>

    </div>
  );
};

const LeftSectionCrm = ({
  groups,
  search,
  selectedGroup,
  setSelectedGroup,
  onDragEnd,
  error,
  isLoading,
  reorderCRMGroupsFB
}) => {
  const [localGroups, setLocalGroups] = useState(groups);
  const startIndexRef = useRef(null);
  const {getGroupById}=usefbCRM()


  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => { 
    setLocalGroups(groups)
  }, [groups])

 
  
  const handleDragStart = (event) => {
    const { active } = event;
    const index = localGroups.findIndex((g) => g.id === active.id);
    startIndexRef.current = index;
  };

  const handleDragEnd = async(event) => {
    const { active, over } = event;

    if (!over) return;

   

    const oldIndex = startIndexRef.current;
    const newIndex = localGroups.findIndex((g) => g.id === over.id);


    // ✅ Only reorder if moved
    if (oldIndex !== newIndex) {
      const newOrder = arrayMove(localGroups, oldIndex, newIndex);
      setLocalGroups(newOrder);
      onDragEnd?.(newOrder);
    }

    await reorderCRMGroupsFB({destination: newIndex,source: oldIndex})

    startIndexRef.current = null; // cleanup
  };

  if (isLoading) {
    return (
      <div className="text-center text-sm text-blue-500 py-4">
        {t("crm.Loading Groups")}...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-4">
        {t("crm.An error occurred. Please try again.")}
      </div>
    );
  }


  return (
    <DndContext collisionDetection={closestCenter}    sensors={sensors}  onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <SortableContext
        items={localGroups.map((g) => g.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="mt-4">
          {localGroups
            ?.filter((g) =>
              g.name.toLowerCase().includes(search.toLowerCase())
            )
            ?.map((group) => (
              <SortableItem
                key={group.id}
                group={group}
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
                getGroupById={getGroupById}
              />
            ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};




// LeftSectionCrm.propTypes = {
//     groups: PropTypes.array.isRequired,
//     search: PropTypes.string.isRequired,
//     selectedGroup: PropTypes.array.isRequired,
//     setSelectedGroup: PropTypes.func.isRequired,
//     onDragEnd: PropTypes.func.isRequired,
//     error: PropTypes.any,
//     isLoading: PropTypes.bool.isRequired,
// };

export default LeftSectionCrm;
