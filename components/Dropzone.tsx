"use client";

import DropzoneComponent from "react-dropzone";

const Dropzone = () => {
	// max file size 2MB
	const maxSize = 20971520;

	return (
		<DropzoneComponent
			minSize={0}
			maxSize={maxSize}
			onDrop={(acceptedFiles) => console.log(acceptedFiles)}
		>
			{({
				getRootProps,
				getInputProps,
				isDragActive,
				isDragReject,
				fileRejections,
			}) => {
				const isFileTooLarge =
					!!fileRejections.length && fileRejections[0].file.size > maxSize;

				return (
					<section>
						<div {...getRootProps()}>
							<input {...getInputProps()} />
							{!isDragActive && "Click here or drop a file to upload!"}
							{isDragActive && !isDragReject && "Drop to upload this file!"}
							{isDragReject && "FIle type not accpeted, sorry!"}
							{isFileTooLarge && (
								<div className="text-danger mt-2">File is too large.</div>
							)}
						</div>
					</section>
				);
			}}
		</DropzoneComponent>
	);
};

export default Dropzone;
