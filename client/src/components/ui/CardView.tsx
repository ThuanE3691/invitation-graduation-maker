import { motion } from "framer-motion";
import React from "react";

type CardViewProps = {
	width: number;
	height: number;
	rotateX: number;
	footerLength: number;
	decoration: React.ReactNode;
	imageUrl: string;
	x: number;
	y: number;
};

const CardView = ({
	width,
	height,
	rotateX,
	footerLength,
	decoration,
	imageUrl,
	x,
	y,
}: CardViewProps) => {
	return (
		<motion.div
			className="relative px-2 pt-3 bg-white shadow-lg w-fit h-fit"
			style={{
				paddingBottom: footerLength,
			}}
			animate={{
				x: x,
				y: y,
				rotate: rotateX,
			}}
		>
			{decoration}
			<motion.div
				className="absolute -top-4 left-20"
				animate={{
					x: x,
					y: y,
					rotate: rotateX,
				}}
			></motion.div>
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
		</motion.div>
	);
};

export default CardView;
