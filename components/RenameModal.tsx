"use client";

import useAppStore from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import toast from "react-hot-toast";

const RenameModal = () => {
	const { user } = useUser();
	const [input, setInput] = useState("");

	const [isRenameModalOpen, setIsRenameModalOpen, filename, fileId] =
		useAppStore((state) => [
			state.isRenameModalOpen,
			state.setIsRenameModalOpen,
			state.filename,
			state.fileId,
		]);

	const renameFile = async () => {
		if (!user || !fileId) return;

		const toastId = toast.loading("Renaming...");

		try {
			await updateDoc(doc(db, "users", user.id, "files", fileId), {
				fileName: input,
			});

			toast.success("Renamed Successfully", {
				id: toastId,
			});
		} catch (error) {
			console.log(error);

			toast.error("Renaming Failed", {
				id: toastId,
			});
		} finally {
			setInput("");
			setIsRenameModalOpen(false);
		}
	};

	return (
		<Dialog
			open={isRenameModalOpen}
			onOpenChange={(isOpen) => {
				setIsRenameModalOpen(isOpen);
			}}
		>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Rename the file</DialogTitle>
				</DialogHeader>

				<Input
					id="link"
					defaultValue={filename}
					onChange={(e) => setInput(e.target.value)}
					onKeyDownCapture={(e) => {
						if (e.key === "Enter") {
							renameFile();
						}
					}}
				/>

				<div className="flex space-x-2 py-3">
					<Button
						size="sm"
						className="px-3 flex-1"
						variant="ghost"
						onClick={() => setIsRenameModalOpen(false)}
					>
						<span className="sr-only">Cancel</span>
						<span>Cancel</span>
					</Button>

					<Button
						type="submit"
						size="sm"
						className="px-3 flex-1"
						onClick={() => renameFile()}
					>
						<span className="sr-only">Delete</span>
						<span>Delete</span>
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default RenameModal;
