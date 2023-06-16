import { create } from "zustand";

interface AddMoneyModalStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const useAddMoneyModal = create<AddMoneyModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set( { isOpen : false}),
}))

export default useAddMoneyModal;