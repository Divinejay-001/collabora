import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuUsers } from 'react-icons/lu';
import Modal from '../Modal';
import AvatarGroup from '../AvatarGroup';

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ track loading

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
        if (response.data?.length > 0) {
          setAllUsers(response.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); // ✅ stop loader after fetch
      }
    };

    getAllUsers();
  }, []);

  useEffect(() => {
    setTempSelectedUsers(selectedUsers); // ✅ sync properly
  }, [selectedUsers]);

  const toggleUserSelection = (user) => {
    setTempSelectedUsers((prev) =>
      prev.some((u) => u._id === user._id)
        ? prev.filter((u) => u._id !== user._id)
        : [...prev, user]
    );
  };

  const handleAssign = () => {
    setSelectedUsers(tempSelectedUsers); // ✅ store full objects
    setIsModalOpen(false);
  };

  // Avatars mapping works fine now:
  const selectedUsersAvatars = selectedUsers.map((user) => user.profileImageUrl);

  return (
    <div className='space-y-4 mt-2'>
      {selectedUsersAvatars.length === 0 && (
        <button
          className='card-btn'
          onClick={() => setIsModalOpen(true)}
        >
          <LuUsers className='text-sm' /> Add Members
        </button>
      )}

      {selectedUsersAvatars.length > 0 && (
        <div className='cursor-pointer' onClick={() => setIsModalOpen(true)}>
          <AvatarGroup avatars={selectedUsersAvatars} maxVisible={3} />
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select Users"
      >
        <div className="space-y-4 h-[60vh] overflow-y-auto">
          {loading ? (
            // ✅ Skeleton Loader
            Array(6).fill(0).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 border-b border-gray-200 animate-pulse"
              >
                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 w-20 bg-gray-200 dark:bg-gray-600 rounded"></div>
                </div>
                <div className="w-4 h-4 rounded bg-gray-300 dark:bg-gray-700"></div>
              </div>
            ))
          ) : (
            allUsers.map((user) => (
              <div
                key={user._id}
                className='flex items-center gap-4 p-3 border-b border-gray-200'
              >
                <img
                  src={user.profileImageUrl}
                  alt={user.name}
                  className='w-10 h-10 rounded-full object-cover'
                />
                <div className='flex-1'>
                  <p className='font-semibold'>{user.name}</p>
                  <p className='text-sm text-gray-500'>{user.email}</p>
                </div>
                <input
                  type="checkbox"
                  checked={tempSelectedUsers.some((u) => u._id === user._id)}
                  onChange={() => toggleUserSelection(user)}
                  className="w-4 h-4"
                />
              </div>
            ))
          )}
        </div>

        <div className="pt-4 gap-2 flex justify-end">
          <button
            onClick={() => setIsModalOpen(false)}
            className="card-btn"
          >
            CANCEL
          </button>
          <button
            className='card-btn-fill'
            onClick={handleAssign}
          >
            DONE
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SelectUsers;
