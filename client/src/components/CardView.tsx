import PinSVG from "../SVG/PinSVG";

type CardViewProps = {
	width: number;
	height: number;
	rotateX: number;
	image?: React.ImgHTMLAttributes<HTMLImageElement>;
};

const CardView = ({ width, height, rotateX, image }: CardViewProps) => {
	return (
		<div
			className="relative px-2 pt-2 pb-12 bg-white w-fit h-fit"
			style={{
				transform: `rotate(${rotateX}deg)`,
			}}
		>
			<div
				className="absolute -top-4 left-20"
				style={{
					transform: `rotate(${rotateX}deg)`,
				}}
			>
				<PinSVG height={64} width={84}></PinSVG>
			</div>
			<div
				className="bg-black"
				style={{
					width: width,
					height: height,
				}}
			></div>
		</div>
	);
};

export default CardView;
