import React, { useState } from 'react';
import { HiPlus, HiOutlineTrash } from 'react-icons/hi';
import { LuPaperclip } from 'react-icons/lu';

const AddAttachmentsInput = ({ attachments, setAttachments }) => {
  const [option, setOption] = useState('');

  // Function to handle adding an option
  const handleAddOption = () => {
    if (option.trim()) {
      setAttachments([...attachments, option.trim()]);
      setOption('');
    }
  };

  // Function to handle deleting an option
  const handleDeleteOption = (index) => {
    const updatedArr = attachments.filter((_, idx) => idx !== index);
    setAttachments(updatedArr);
  };

  return (
    <div>
      {attachments.map((item, index) => (
        <div
          key={item}
          className="flex justify-between items-center bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md mb-3 mt-2"
        >
          <div className="flex-1 flex items-center gap-3">
            <LuPaperclip className="text-gray-700 dark:text-gray-300" />
            <p className="text-xs text-gray-800 dark:text-gray-300 break-all">{item}</p>
          </div>

          <button
            className="cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/30 p-1 rounded"
            onClick={() => handleDeleteOption(index)}
          >
            <HiOutlineTrash className="text-lg text-red-500" />
          </button>
        </div>
      ))}

      <div className="flex items-center gap-3 mt-4">
        <div className="flex-1 flex items-center gap-3 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 bg-white dark:bg-slate-900">
          <LuPaperclip className="text-gray-700 dark:text-gray-300" />
          <input
            type="text"
            placeholder="Add File Link"
            value={option}
            onChange={({ target }) => setOption(target.value)}
            className="w-full text-sm bg-transparent outline-none text-gray-800 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>

        <button
          onClick={handleAddOption}
          className="flex items-center gap-1 bg-primary hover:bg-primary-dark text-white px-3 py-2 rounded-md text-sm transition"
        >
          <HiPlus className="text-lg" /> Add
        </button>
      </div>
    </div>
  );
};

export default AddAttachmentsInput;
