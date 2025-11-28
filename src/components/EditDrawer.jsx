import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const EditDrawer = ({ editData, updateTask, closeDrawer }) => {
  const [task, setTask] = useState(editData);

  useEffect(() => {
    setTask(editData);
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask(task);
    Swal.fire({
      icon: "success",
      title: "Task Updated!",
      text: "Your task has been updated successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
    closeDrawer();
  };

  if (!task) return null;
  return (
    <div>
      <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <label className="block text-sm font-medium text-gray-700">
            Task Name
          </label>
          <input
            type="text"
            name="name"
            value={task.name}
            onChange={(e) => setTask({ ...task, name: e.target.value })}
            required
            className="w-full rounded-md border-gray-300 border   p-3 text-base"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            name="id"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            required
            className="w-full rounded-md border-gray-300 border   p-3 text-base"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            name="id"
            value={task.date}
            onChange={(e) => setTask({ ...task, date: e.target.value })}
            required
            className="w-full rounded-md border-gray-300 border   p-3 text-base"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="block text-sm font-medium text-gray-700">
            Prioruty
          </label>

          <select
            value={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
            className="w-full rounded-md border-gray-300 border  p-3 text-base"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-[#6a73fa] text-white py-2 px-4 rounded-md hover:bg-indigo-600"
          >
            Save Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDrawer;
