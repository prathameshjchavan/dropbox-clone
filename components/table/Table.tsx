"use client";

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { FileType } from "@/typings";
import { Button } from "../ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const openDeleteModal = (id: string) => {
		console.log("Hello");
	};

	const openRenameModal = (id: string, name: string) => {
		console.log("Rename");
	};

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
											  )}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{cell.column.id === "timestamp" ? (
											<div className="flex flex-col">
												<div className="text-sm line-clamp-1 whitespace-nowrap">
													{(cell.getValue() as Date)
														.toLocaleDateString()
														.replaceAll("/", "-")}
												</div>

												<div className="text-sm text-gray-500">
													{(cell.getValue() as Date).toLocaleTimeString()}
												</div>
											</div>
										) : cell.column.id === "fileName" ? (
											<p
												onClick={() =>
													openRenameModal(
														(row.original as FileType).id,
														(row.original as FileType).fileName
													)
												}
												className="underline flex items-center text-blue-500 hover:cursor-pointer"
											>
												<span className="line-clamp-1">
													{cell.getValue() as string}{" "}
												</span>
												<PencilIcon size={15} className="ml-2 flex-shrink-0" />
											</p>
										) : (
											flexRender(cell.column.columnDef.cell, cell.getContext())
										)}
									</TableCell>
								))}

								<TableCell key={(row.original as FileType).id}>
									<Button
										variant="outline"
										onClick={() =>
											openDeleteModal((row.original as FileType).id)
										}
									>
										<TrashIcon size={20} />
									</Button>
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
