import { create } from "zustand";

interface AppState {
	isDeleteModalOpen: boolean;
	setIsDeleteModalOpen: (open: boolean) => void;

	isRenameModalOpen: boolean;
	setIsRenameModalOpen: (open: boolean) => void;

	fileId: string | null;
	setFileId: (fileId: string) => void;

	filename: string;
	setFilename: (filename: string) => void;
}

const useAppStore = create<AppState>((set) => ({
	fileId: null,
	setFileId: (fileId: string) => set(() => ({ fileId })),

	filename: "",
	setFilename: (filename: string) => set(() => ({ filename })),

	isDeleteModalOpen: false,
	setIsDeleteModalOpen: (open) => set(() => ({ isDeleteModalOpen: open })),

	isRenameModalOpen: false,
	setIsRenameModalOpen: (open) => set(() => ({ isRenameModalOpen: open })),
}));

export default useAppStore;
