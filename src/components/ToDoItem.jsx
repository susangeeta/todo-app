import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdDeleteOutline, MdModeEdit } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import Swal from "sweetalert2";
import Header from "../components/Header";
import AddDrawer from "./AddDrawer";
import EditDrawer from "./EditDrawer";

function ToDoItem() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editTaskData, setEditTaskData] = useState(null);
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  //add task
  const addTask = (newTask) => {
    setTasks([...tasks, { id: Date.now(), ...newTask }]);
  };
  const deleteTask = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setTasks(tasks.filter((task) => task.id !== id));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your task has been deleted.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // Update task after editing
  const updateTask = (updated) => {
    setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
  };

  return (
    <div className="main-container ">
      <section className="bg-white shadow-2xl border border-gray-200  px-6 py-8 flex  flex-col gap-5 rounded-2xl">
        <section className="flex justify-between items-center gap-2 w-full">
          <div>
            <Header />
          </div>
          <div className="">
            <div
              onClick={() => setIsOpen(true)}
              className="bg-[#6a73fa] text-white px-3 py-2 flex gap-2 cursor-pointer rounded-md items-center w-32"
            >
              <FaPlus className="h-3 w-3" />
              <h1 className="">Add New</h1>
            </div>
          </div>
        </section>
        <div className="overflow-x-auto  w-full">
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
        </div>
        <div className="overflow-x-auto w-full">
          {" "}
          <div className="min-w-[700px] md:min-w-full">
            {" "}
            <div className="overflow-y-auto max-h-[300px] md:max-h-[400px] lg:max-h-[500px]">
              {tasks.length === 0 ? (
                <div className="p-6 text-center text-gray-500 font-semibold">
                  No Data Found
                </div>
              ) : (
                <>
                  {tasks.map((item, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-7 lg:grid-cols-6 border-b border-b-gray-300 ursor-pointe w-full  "
                    >
                      <div className=" col-span-2 lg:col-span-1   text-sm font-medium flex items-center gap-2">
                        <div className="bg-gray-400 rounded-full h-8 w-8 flex items-center justify-center">
                          <h1 className="text-base text-white  flex items-center justify-center">
                            {item.name
                              ? item.name.charAt(0).toUpperCase()
                              : "?"}
                          </h1>
                        </div>
                        <div className="col-span-1 text-sm pt-1 whitespace-nowrap  text-[#93909d] font-normal flex items-center justify-center capitalize">
                          {item.name}
                        </div>
                      </div>
                      <div className=" hidden  col-span-1 p-4 text-[#727b93] font-bold text-sm md:flex items-center  justify-center ">
                        {item.description.length > 20
                          ? item.description.slice(0, 20) + "..."
                          : item.description}
                      </div>

                      <div className=" col-span-1 p-4 text-[#727b93] font-bold text-sm flex md:hidden items-center  justify-center ">
                        {item.description.length > 10
                          ? item.description.slice(0, 10) + "..."
                          : item.description}
                      </div>

                      <div className="col-span-1 p-4 text-[#727b93] font-bold text-sm flex items-center  justify-center">
                        {item.priority}
                      </div>

                      <div className="col-span-1 p-4  text-[#888888] text-xs md:text-sm font-bold flex items-center  justify-center text-right">
                        {item.date}
                      </div>

                      <div className="col-span-2 p-4 text-sm flex gap-2 items-center justify-center ">
                        <div
                          onClick={() => {
                            setEditTaskData(item);
                            setIsEditOpen(true);
                          }}
                          className="bg-blue-600 cursor-pointer h-8 w-8 rounded-md flex items-center justify-center"
                        >
                          <MdModeEdit className="h-4 w-4 text-white" />
                        </div>
                        <div
                          onClick={() => deleteTask(item.id)}
                          className="bg-red-600 h-8 w-8 rounded-md flex items-center cursor-pointer justify-center "
                        >
                          <MdDeleteOutline className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
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
      <div
        className={`fixed top-0 right-0 h-full w-[95%] md:w-[75%] lg:w-[45%] bg-white shadow-2xl transition-transform duration-300 z-50
        ${isEditOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="sticky top-0 bg-white border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Edit Task</h2>
            <button onClick={() => setIsEditOpen(false)} className="p-2">
              <RxCross1 />
            </button>
          </div>
        </div>

        <EditDrawer
          editData={editTaskData}
          updateTask={updateTask}
          closeDrawer={() => setIsEditOpen(false)}
        />
      </div>
    </div>
  );
}

export default ToDoItem;
