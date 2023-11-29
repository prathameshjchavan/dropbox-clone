import { FileType } from "@/typings";
import { Button } from "../ui/button";

interface TableWrapperProps {
	skeletonFiles: FileType[];
}

const TableWrapper = ({ skeletonFiles }: TableWrapperProps) => {
	return (
		<div>
			<Button>Sort By ...</Button>

			{/* <DataTable columns={columns} data={initialFiles} /> */}
		</div>
	);
};

export default TableWrapper;
