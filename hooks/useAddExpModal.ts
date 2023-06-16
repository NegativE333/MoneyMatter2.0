import { create } from "zustand";

interface AddExpModalStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const useAddExpModal = create<AddExpModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set( { isOpen : false}),
}))

export default useAddExpModal;