import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdDeleteOutline, MdModeEdit } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import AddDrawer from "./AddDrawer";

function ToDoItem() {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, { id: Date.now(), ...newTask }]);
  };

  return (
    <div className="main-container ">
      <section className="bg-white shadow-2xl  px-6 py-8 flex  flex-col gap-5 rounded-2xl">
        <div className="flex items-end justify-end">
          {" "}
          <div
            onClick={() => setIsOpen(true)}
            className="bg-[#6a73fa] text-white px-3 py-2 flex gap-2 cursor-pointer rounded-md items-center w-32"
          >
            <FaPlus className="h-3 w-3" />
            <h1 className="">Add New</h1>
          </div>
        </div>
        <div className="min-w-[700px] md:min-w-full">
          <div className=" grid grid-cols-7 lg:grid-cols-6 font-medium  border-b border-b-gray-300 w-full ">
            <div className=" col-span-2 lg:col-span-1 p-4  text-sm font-semibold ">
              Task Name
            </div>
            <h1 className="col-span-1 whitespace-nowrap p-4 text-sm font-semibold flex items-center  justify-center ">
              Description
            </h1>
            <h1 className="col-span-1  p-4 text-sm font-semibold flex items-center  justify-center ">
              Priority
            </h1>
            <h1 className="col-span-1 p-4 text-sm font-semibold flex items-center  justify-center ">
              Due Date
            </h1>
            <h1 class="col-span-2  p-4 text-sm font-semibold  items-center justify-center flex ">
              Action
            </h1>
          </div>
        </div>
        {tasks.map((item, i) => (
          <div
            key={i}
            className="grid grid-cols-7 lg:grid-cols-6 border-b border-b-gray-300 cursor-pointe w-full  "
          >
            <div className=" col-span-2 lg:col-span-1   text-sm font-medium flex items-center gap-2">
              <div className="bg-gray-400 rounded-full h-8 w-8 flex items-center justify-center">
                <h1 className="text-base text-white  flex items-center justify-center">
                  S
                </h1>
              </div>
              <div className="col-span-1 text-sm pt-1 whitespace-nowrap  text-[#93909d] font-normal flex items-center justify-center capitalize">
                {item.name}
              </div>
            </div>
            <div className="col-span-1 p-4 text-[#727b93] font-bold text-sm flex items-center  justify-center ">
              {item.description}
            </div>

            <div className="col-span-1 p-4 text-[#727b93] font-bold text-sm flex items-center  justify-center">
              {item.priority}
            </div>

            <div className="col-span-1 p-4  text-[#888888] text-sm font-bold flex items-center  justify-center text-right">
              {item.date}
            </div>

            <div className="col-span-2 p-4 text-sm flex gap-2 items-center justify-center ">
              <div
                id="edit-button"
                className="bg-blue-600 cursor-pointer h-8 w-8 rounded-md flex items-center justify-center"
              >
                <MdModeEdit className="h-4 w-4 text-white" />
              </div>
              <div className="bg-red-600 h-8 w-8 rounded-md flex items-center cursor-pointer justify-center ">
                <MdDeleteOutline className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        ))}
      </section>

      <div
        className={`fixed top-0 right-0 h-full w-[95%] md:w-[75%] lg:w-[45%] xl:w-[40%] bg-white shadow-2xl transition-transform duration-300 z-50 
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Add New Task</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <RxCross1 className="h-3 w-3" />
            </button>
          </div>
        </div>

        <AddDrawer closeDrawer={() => setIsOpen(false)} addTask={addTask} />
      </div>
    </div>
  );
}

export default ToDoItem;
