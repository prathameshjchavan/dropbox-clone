"use client";

import { FileType } from "@/typings";
import { Button } from "../ui/button";
import { DataTable } from "./Table";
import { columns } from "./columns";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";

interface TableWrapperProps {
	skeletonFiles: FileType[];
}

const TableWrapper = ({ skeletonFiles }: TableWrapperProps) => {
	const { user } = useUser();
	const [initialFiles, setInitialFiles] = useState<FileType[]>([]);
	const [sort, setSort] = useState<"asc" | "desc">("desc");

	const [docs, loading, error] = useCollection(
		user &&
			query(
				collection(db, "users", user.id, "files"),
				orderBy("timestamp", sort)
			)
	);

	useEffect(() => {
		if (!docs) return;

		const files: FileType[] = docs.docs.map((doc) => {
			const { fileName, timestamp, fullName, downloadURL, type, size } =
				doc.data();

			return {
				id: doc.id,
				fileName: fileName ?? doc.id,
				timestamp: new Date(timestamp?.seconds * 1000) || undefined,
				fullName,
				downloadURL,
				type,
				size,
			};
		});

		setInitialFiles(files);
	}, [docs]);

	return (
		<div>
			<Button
				onClick={() => setSort((sort) => (sort === "desc" ? "asc" : "desc"))}
			>
				Sort By {sort === "desc" ? "Oldest" : "Newest"}
			</Button>

			<DataTable columns={columns} data={initialFiles} />
		</div>
	);
};

export default TableWrapper;
