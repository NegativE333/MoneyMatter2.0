import { create } from "zustand";

interface DeleteExpModalStore {
  isOpen: boolean;
  expenseId: string | null; // New expenseId property
  onOpen: (id: string) => void; // Accept id parameter
  onClose: () => void;
}

const useDeleteExpModal = create<DeleteExpModalStore>((set) => ({
  isOpen: false,
  expenseId: null, // Initialize expenseId as null
  onOpen: (id) => set({ isOpen: true, expenseId: id }), // Set expenseId to the provided id
  onClose: () => set({ isOpen: false, expenseId: null }), // Reset expenseId to null
}));

export default useDeleteExpModal;
