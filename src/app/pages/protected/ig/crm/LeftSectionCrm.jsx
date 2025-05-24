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
    await getGroupById({ id: data.id, type: 'ig' });
  };

  const DropdownMenu = ({ item }) => {
      const [isDelete, setIsDelete] = useState({ val:false, id:null });

    const handleDelete = async (id) => {
      if (isDelete.val ) {
        const res = await deleteGroupById({ id, type: 'ig'})
        if (res?.status === 200) {
          message.success("Group deleted Sucessfully")
          fetchCRMGroups({ type: "ig" })
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
        className="bg-white p-3 rounded-[6px] shadow-[0px_3px_7px_rgba(0,0,0,0.19)] relative z-99999"
        onClick={(e) => e.stopPropagation()} // Prevent closing on click
      >
        
        <div
          onClick={() => {
            setSelectedGrp(group)
            setOpenEditGroupModal(true)
          }}
          className="relative z-99999 flex gap-3 items-center px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
        >
          <span class="flex items-center justify-center w-[20px] h-[20px]">
            <svg class="fill-svg" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.2578 16.1724H2.9797C2.65207 16.1737 2.3275 16.1093 2.02524 15.9829C1.72298 15.8565 1.44917 15.6707 1.22005 15.4365C0.989234 15.204 0.806779 14.9281 0.683222 14.6247C0.559665 14.3213 0.497456 13.9964 0.500188 13.6689V4.3987C0.496102 4.07259 0.558538 3.74907 0.683682 3.4479C0.808825 3.14673 0.994051 2.87423 1.22804 2.64705C1.45571 2.41621 1.7278 2.23391 2.02788 2.11115C2.33189 1.98402 2.65818 1.91877 2.98769 1.91919H6.53899C6.69809 1.91919 6.85067 1.98239 6.96317 2.09489C7.07567 2.20739 7.13887 2.35997 7.13887 2.51907C7.13887 2.67817 7.07567 2.83075 6.96317 2.94325C6.85067 3.05575 6.69809 3.11895 6.53899 3.11895H2.98769C2.81566 3.12363 2.6455 3.15604 2.48379 3.21493C2.24811 3.31441 2.04715 3.48143 1.90624 3.69494C1.76533 3.90844 1.69077 4.15888 1.69195 4.4147V13.6849C1.68995 13.8567 1.72215 14.0272 1.78669 14.1865C1.85123 14.3458 1.94681 14.4907 2.06788 14.6127C2.18892 14.7328 2.33248 14.8278 2.49032 14.8923C2.64816 14.9568 2.81718 14.9895 2.98769 14.9886H12.2658C12.4362 14.9886 12.6042 14.9566 12.7617 14.8926C12.9186 14.8296 13.0603 14.7342 13.1777 14.6127C13.2992 14.4953 13.3946 14.3536 13.4576 14.1967C13.5283 14.0383 13.5638 13.8664 13.5616 13.6929V10.1416C13.5616 9.98246 13.6248 9.82988 13.7373 9.71738C13.8498 9.60488 14.0024 9.54168 14.1615 9.54168C14.3206 9.54168 14.4732 9.60488 14.5856 9.71738C14.6981 9.82988 14.7614 9.98246 14.7614 10.1416V13.7168C14.7627 14.0445 14.6983 14.369 14.5719 14.6713C14.4455 14.9736 14.2597 15.2474 14.0255 15.4765C13.7959 15.707 13.5244 15.8916 13.2257 16.0204C12.9161 16.1324 12.5874 16.1844 12.2578 16.1724Z" fill="#808080"></path>
              <path d="M16.3458 2.94296C16.2643 2.73702 16.1387 2.55139 15.9779 2.39907L14.2582 0.679414C14.1059 0.518601 13.9203 0.393028 13.7143 0.311488C13.4049 0.181091 13.0634 0.146448 12.7341 0.212033C12.4047 0.277617 12.1026 0.440416 11.8667 0.679414L10.499 2.04714V2.08713L4.30822 8.26991C3.99567 8.5846 3.82028 9.01014 3.82031 9.45367V11.1893C3.82242 11.6363 4.0009 12.0643 4.31694 12.3804C4.63299 12.6964 5.06103 12.8749 5.50798 12.877H7.24363C7.46402 12.8773 7.68225 12.8336 7.88552 12.7484C8.08879 12.6633 8.27302 12.5384 8.4274 12.3811L14.6182 6.19032L15.9939 4.81459C16.1555 4.66262 16.2818 4.47706 16.3618 4.2707C16.4534 4.06557 16.5007 3.84346 16.5007 3.61883C16.5007 3.3942 16.4534 3.17209 16.3618 2.96696L16.3458 2.94296ZM15.242 3.7828C15.2161 3.84323 15.178 3.89768 15.1301 3.94277L14.1543 4.91857L11.7547 2.51905L12.7385 1.53524C12.833 1.44385 12.959 1.3923 13.0905 1.39127C13.1538 1.39233 13.2164 1.40592 13.2744 1.43126C13.3363 1.45739 13.3896 1.49472 13.4344 1.54324L15.1621 3.2629C15.2056 3.30988 15.2408 3.36399 15.266 3.42287C15.2779 3.48362 15.2779 3.54608 15.266 3.60683C15.2691 3.66647 15.2609 3.72615 15.242 3.7828Z" fill="#808080"></path>
            </svg>
          </span>
          Edit
        </div>
        <div
          onClick={() => handleDelete(group?.id)}
          className="relative z-99999 flex gap-3 items-center px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
        >
          <span class="flex items-center justify-center w-[20px] h-[20px]">
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z" fill="#808183"></path>
              <path d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z" fill="black" fill-opacity="0.2"></path>
            </svg>
          </span>
         {isDelete.val ? "Really ?":"Delete"}
        </div>
      </div>
    );
  };

  return (
    <div className={`relative ${isCollapse ? "" : "min-w-[230px] max-w-[230px]"}`}>
      {
        isCollapse
          ? <>
            <div
              ref={setNodeRef}
              style={style}
              {...attributes}
              {...listeners}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onClick={() => onClick(group)}
              className={`flex items-center w-fit space-x-2 p-2 mb-2 rounded-md cursor-pointer border bg-white hover:bg-gray-100 ${selectedGroup?.id === group.id
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
            </div>
          </>
          : <>
            <div
              ref={setNodeRef}
              style={style}
              {...attributes}
              {...listeners}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onClick={() => onClick(group)}
              className={`flex items-center space-x-2 p-2.5 mb-2.5 rounded-md cursor-pointer border border bg-white hover:bg-gray-100 ${selectedGroup?.id === group.id
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
              <div className="flex flex-col items-center w-full">
                <div className="flex items-center justify-between w-full">
                  <span className="capitalize max-w-36 truncate text-[14px] font-[500] leading-[1.25]">{group.name}</span>
                </div>
                <div className="flex items-center justify-between w-full">
                  {/* <span className="text-sm text-gray-600">20 leads</span> */}
                  <span className="text-[12px] text-[#637381] mt-[2px]">
                    {formatDate(group.createdAt)}
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute right-[10px] top-[10px]">
              <Dropdown
                overlay={<DropdownMenu item={group} />}
                trigger={["click"]}
                placement="bottomRight"
              >
                <Button
                  type="text"
                  icon={<VerticalDotsIcon />}
                  className="!text-[#808183] !w-5 !h-5 btn-hover"
                />
              </Dropdown>
            </div>
          </>
      }
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

    await reorderCRMGroups({ data: { destination: newIndex, source: oldIndex }, type: 'ig'});

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
                setSelectedGrp={setSelectedGrp}
                setSelectedGroup={setSelectedGroup}
                getGroupById={getGroupById}
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
