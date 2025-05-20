import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
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
import { Button, Dropdown, message } from "antd";
import { VerticalDotsIcon } from "../../../common/icons/icons";

const SortableItem = ({
  group,
  selectedGroup,
  setSelectedGroup,
  getGroupById,
  setSelectedGrp,
  setOpenEditGroupModal,
  fetchCRMGroups,
  deleteGroupById,
  isCollapse
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: group.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const delTime = useRef();
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

  const onClick = async (data) => {
    setSelectedGroup(data);

    await getGroupById({ id: data.id , type: 'fb' });
  };

  const DropdownMenu = ({ item }) => {
    const [isDelete, setIsDelete] = useState({ val: false, id: null });

    const handleDelete = async (id) => {
      if (isDelete.val) {
        const res = await deleteGroupById({ id, type: 'fb' })
        if (res?.status === 200) {
          message.success("Group deleted Sucessfully")
          fetchCRMGroups({ type: "fb" })
        }
        setIsDelete({ val: false, id: null });
        clearTimeout(delTime.current);
      } else {
        clearTimeout(delTime.current);

        setIsDelete({ val: true, id: id });
        delTime.current = setTimeout(() => {
          setIsDelete({ val: true, id: null });
        }, 3000);
      }
    };

    return (
      <div
        className="bg-white rounded-md shadow-md p-2 relative z-99999"
        onClick={(e) => e.stopPropagation()} // Prevent closing on click
      >
        <div
          onClick={() => {
            setSelectedGrp(group)
            setOpenEditGroupModal(true)
          }}
          className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded relative z-99999"
        >
          Edit
        </div>
        <div
          onClick={() => handleDelete(item.id)}
          className="px-3 py-2 hover:bg-red-100 cursor-pointer rounded relative z-99999"
        >
          {isDelete.val ? "Really ?" : "Delete"}
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-w-[230px] max-w-[230px]">
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={() => onClick(group)}
        className={`flex items-center space-x-2 px-4 py-2  mb-2 rounded-md cursor-pointer border bg-white hover:bg-gray-100 ${
          selectedGroup?.id === group.id
            ? "border-[#0087FF]"
          : "border-[#00000040]"
        }`}
      >
        <span
          className="w-11 h-10 rounded-md text-white flex items-center justify-center font-semibold text-sm"
          style={{ backgroundColor: group?.custom_color || "#000" }}
        >
          {group?.name?.slice(0, 2).toUpperCase()}
        </span>
       {!isCollapse && <div className="flex flex-col items-center w-full">
          <div className="flex items-center justify-between w-full">
            <span className="capitalize max-w-36 truncate">{group.name}</span>
          </div>
          <div className="flex items-center justify-between w-full">
            {/* <span className="text-sm text-gray-600">20 leads</span> */}
            <span className="text-sm text-gray-400">
              {formatDate(group.createdAt)}
            </span>
          </div>
        </div>}
      </div>
     { !isCollapse &&<div className="absolute right-[10px] top-[10px]">
        <Dropdown
          overlay={<DropdownMenu item={group}/>}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button
            type="text"
            icon={<VerticalDotsIcon />}
            className="!text-[#808183] !h-9 btn-hover"
          />
        </Dropdown>
      </div>}
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
  reorderCRMGroups,
  setOpenEditGroupModal,
  isCollapse
}) => {
  const [localGroups, setLocalGroups] = useState(groups);
  const startIndexRef = useRef(null);
  const { getGroupById, setSelectedGrp, fetchCRMGroups, deleteGroupById } = usefbCRM();

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    setLocalGroups(groups);
  }, [groups]);

  const handleDragStart = (event) => {
    const { active } = event;
    const index = localGroups.findIndex((g) => g.id === active.id);
    startIndexRef.current = index;
  };

  const handleDragEnd = async (event) => {
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

    await reorderCRMGroups({
      data: { destination: newIndex, source: oldIndex },
      type: 'fb'
    });

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
    <DndContext
      collisionDetection={closestCenter}
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={localGroups.map((g) => g.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="mt-4">
          {localGroups
            ?.filter((g) => g.name.toLowerCase().includes(search.toLowerCase()))
            ?.map((group) => (
              <SortableItem
                key={group.id}
                group={group}
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
                getGroupById={getGroupById}
                setSelectedGrp={setSelectedGrp}
                setOpenEditGroupModal={setOpenEditGroupModal}
                fetchCRMGroups={fetchCRMGroups}
                deleteGroupById={deleteGroupById}
                isCollapse={isCollapse}
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
