import { FileType } from "@/typings";
import { Button } from "../ui/button";
import { DataTable } from "./Table";
import { columns } from "./columns";

interface TableWrapperProps {
	skeletonFiles: FileType[];
}

const TableWrapper = ({ skeletonFiles }: TableWrapperProps) => {
	return (
		<div>
			<Button>Sort By ...</Button>

			<DataTable columns={columns} data={skeletonFiles} />
		</div>
	);
};

export default TableWrapper;
