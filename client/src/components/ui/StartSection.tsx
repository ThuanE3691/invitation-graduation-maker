import TextCurved from "./TextCurve";
import LetterPullUp from "../animations/LetterPullUp";
import { useEffect, useState } from "react";

const StartSection = ({ isStart }: { isStart: boolean }) => {
	const [shouldAnimate, setShouldAnimate] = useState(false);

	useEffect(() => {
		if (isStart) {
			const timer = setTimeout(() => {
				setShouldAnimate(true);
			}, 2000); // 2 seconds delay

			return () => clearTimeout(timer); // Cleanup the timeout if component unmounts or `shouldAnimate` changes
		}
	}, [isStart]);

	return (
		<div className="flex flex-col items-center justify-center w-full h-[100vh] pt-8 font-semibold mobile:text-3xl font-header">
			<TextCurved startAnimation={shouldAnimate}></TextCurved>

			<div className="flex w-full">
				<LetterPullUp
					listWords={["Graduation", "Ceremony"]}
					className="text-5xl"
					delay={0.3}
					startAnimation={shouldAnimate}
				></LetterPullUp>
			</div>
		</div>
	);
};

export default StartSection;
