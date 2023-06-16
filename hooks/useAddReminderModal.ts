import { create } from "zustand";

interface AddReminderModalStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const useReminderModal = create<AddReminderModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set( { isOpen : false}),
}))

export default useReminderModal;