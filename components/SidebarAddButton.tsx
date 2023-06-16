'use client';

import useAddMoneyModal from "@/hooks/useAddMoneyModal";
import useReminderModal from "@/hooks/useAddReminderModal";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { AiOutlinePlus } from "react-icons/ai";

interface SidebarAddButtonProps {
  title: string;
  type: string;
}

const SidebarAddButton: React.FC<SidebarAddButtonProps> = ({ title, type }) => {
    const addRem = useReminderModal();
    const authModal = useAuthModal();
    const addMoneyModal = useAddMoneyModal();
    const { user } = useUser();
  return (
    <div>
      {type === "reminder" ? (
        <div className="flex justify-center items-center gap-2 w-fit text-black mt-2">
          <h1 className="text-white text-xl">Add Reminder</h1>
          <div 
            onClick={user ? addRem.onOpen: authModal.onOpen}
            className="bg-white rounded-full w-fit cursor-pointer"
          >
            <AiOutlinePlus size={20} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center gap-2 w-fit text-black mt-2">
          <h1 className="text-white text-xl">Add Money</h1>
          <div 
            onClick={user ? addMoneyModal.onOpen :authModal.onOpen}
            className="bg-white rounded-full w-fit cursor-pointer">
            <AiOutlinePlus size={20} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarAddButton;
