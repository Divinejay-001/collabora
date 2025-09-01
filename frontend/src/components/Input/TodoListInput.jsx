import React, { useState } from 'react';
import { HiPlus, HiTrash } from "react-icons/hi";

const TodoListInput = ({ todoList = [], setTodoList }) => {
  const [option, setOption] = useState("");

  // Add new todo
  const handleAddOption = () => {
    if (option.trim()) {
      setTodoList([
        ...todoList,
        { text: option.trim(), completed: false } // always object format
      ]);
      setOption("");
    }
  };

  // Delete todo
  const handleDeleteOption = (index) => {
    setTodoList(todoList.filter((_, idx) => idx !== index));
  };

  // Toggle completed
  const handleToggleComplete = (index) => {
    const updated = [...todoList];
    updated[index].completed = !updated[index].completed;
    setTodoList(updated);
  };

  return (
    <div>
      {todoList?.map((item, index) => {
        const label = typeof item === "string" ? item : item.text;

        return (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 px-3 py-2 rounded-md mb-2"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!item.completed}
                onChange={() => handleToggleComplete(index)}
                className="h-3.5 w-3.5 rounded border-gray-300 text-blue-500 focus:ring-blue-400"
              />
              <p
                className={`text-xs dark:text-gray-400 ${
                  item.completed ? "line-through text-gray-400" : "text-black"
                }`}
              >
                <span className="text-xs text-gray-400 font-semibold mr-2">
                  {index < 9 ? `0${index + 1}` : index + 1}
                </span>
                {label}
              </p>
            </div>
            <button
              className="cursor-pointer"
              onClick={() => handleDeleteOption(index)}
            >
              <HiTrash className="text-lg text-red-500" />
            </button>
          </div>
        );
      })}

      <div className="flex items-center gap-3 mt-4">
        <input
          type="text"
          placeholder="Enter Task..."
          value={option}
          onChange={(e) => setOption(e.target.value)}
          className="w-full text-[13px] text-black dark:bg-[#1a1a1a] dark:text-gray-300 outline-none bg-white border border-gray-300 px-3 py-2 rounded-md"
        />

        <button
          className="flex items-center gap-1 bg-blue-500 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-600"
          onClick={handleAddOption}
        >
          <HiPlus className="text-lg" /> Add
        </button>
      </div>
    </div>
  );
};

export default TodoListInput;
