const AddTags = () => {
  return (
    <main className="">
      <h2 className="font-medium text-lg">Add Tags</h2>
      <div className="flex justify-between border border-[#00000014] rounded-md p-4">
        <div className="flex flex-col flex-1 pr-4 space-y-2">
          <h3 className="font-medium">Do you want to add a tag?</h3>
          <p className="w-full text-center border border-[#00000014] rounded-md p-2">No</p>
        </div>
        <div className="border-l-2 border-[#00000014] px-5 space-y-2 flex-1">
          <h3 className="font-medium">Select Group</h3>
          <div className="flex space-x-2">
            <p className="w-full text-center border border-[#00000014] rounded-md p-2">Friends</p>
            <p className="w-full text-center border border-[#00000014] rounded-md p-2">Stage 2</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddTags;
