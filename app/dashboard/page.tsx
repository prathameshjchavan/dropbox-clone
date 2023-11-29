import Dropzone from "@/components/Dropzone";
import TableWrapper from "@/components/table/TableWrapper";
import { db } from "@/firebase";
import { FileType } from "@/typings";
import { auth } from "@clerk/nextjs";
import { collection, getDocs } from "firebase/firestore";

const DashboardPage = async () => {
	const { userId } = auth();

	const docResults = await getDocs(collection(db, "users", userId!, "files"));
	const skeletonFiles: FileType[] = docResults.docs.map((doc) => {
		const { fileName, timestamp, fullName, downloadURL, type, size } =
			doc.data();

		return {
			id: doc.id,
			fileName: fileName ?? doc.id,
			timestamp: new Date(timestamp.seconds * 1000) || undefined,
			fullName,
			downloadURL,
			type,
			size,
		};
	});

	return (
		<div>
			<Dropzone />

			<section className="container space-y-5">
				<h2 className="font-bold">All Files</h2>

				<div>
					{/* TableWrapper */}
					<TableWrapper skeletonFiles={skeletonFiles} />
				</div>
			</section>
		</div>
	);
};

export default DashboardPage;
