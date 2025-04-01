import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { formatDate } from "../../../../../helpers/formatDate";

const LeftSectionCrm = ({ groups, search, selectedGroup, setSelectedGroup, onDragEnd, error, isLoading }) => {

    if (isLoading) {
        return (
            <div className="text-center text-sm text-blue-500 py-4">
                Loading Groups...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 py-4">
                An error occurred. Please try again.
            </div>
        );
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="groups">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="mt-4">
                        {groups
                            .filter((g) =>
                                g.name.toLowerCase().includes(search.toLowerCase())
                            )
                            .map((group, index) => (
                                <Draggable
                                    key={group.id}
                                    draggableId={group.id.toString()}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            className={`flex items-center space-x-2 px-4 py-2 mb-2 rounded-md cursor-pointer border bg-white hover:bg-gray-100 ${selectedGroup?.id === group.id
                                                ? "border-[#0087FF]"
                                                : "border-[#E6F1FB]"
                                                }`}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            onClick={() => setSelectedGroup(group)}
                                        >
                                            <div className="w-10 h-9 rounded-full flex items-center justify-center font-bold text-white bg-blue-500 uppercase">
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
                                                    <span className="text-sm text-gray-600">20 leads</span>
                                                    <span className="text-sm text-gray-400">{formatDate(group.createdAt)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};


LeftSectionCrm.propTypes = {
    groups: PropTypes.array.isRequired,
    search: PropTypes.string.isRequired,
    selectedGroup: PropTypes.array.isRequired,
    setSelectedGroup: PropTypes.func.isRequired,
    onDragEnd: PropTypes.func.isRequired,
    error: PropTypes.any,
    isLoading: PropTypes.bool.isRequired,
};

export default LeftSectionCrm;
