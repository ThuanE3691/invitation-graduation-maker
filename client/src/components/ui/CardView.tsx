import React from "react";

type CardViewProps = {
	width: number;
	height: number;
	rotateX: number;
	footerLength: number;
	decoration: React.ReactNode;
	image?: React.ImgHTMLAttributes<HTMLImageElement>;
};

const CardView = ({width, height, rotateX, footerLength, decoration}: CardViewProps) => {
    return (
        <div
            className="relative px-2 pt-3 bg-white w-fit h-fit shadow-lg"
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
