import React from "react";

type CardViewProps = {
	width: number;
	height: number;
	rotateX: number;
	footerLength: number;
	decoration: React.ReactNode;
	imageUrl: string;
};

const CardView = ({
	width,
	height,
	rotateX,
	footerLength,
	decoration,
	imageUrl,
}: CardViewProps) => {
	return (
		<div
			className="relative px-2 pt-3 bg-white shadow-lg w-fit h-fit"
			style={{
				transform: `rotate(${rotateX}deg)`,
				paddingBottom: footerLength,
			}}
		>
			{decoration}
			<div
				className="absolute -top-4 left-20"
				style={{
					transform: `rotate(${rotateX}deg)`,
				}}
			></div>
			{imageUrl ? (
				<img
					src={imageUrl}
					style={{
						width: width,
						height: height,
						objectFit: "cover",
					}}
				></img>
			) : (
				<div
					style={{
						width: width,
						height: height,
						backgroundColor: "black",
					}}
				></div>
			)}
		</div>
	);
};

export default CardView;
