import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const TypingEffect = ({
	text,
	className,
	delay = 200,
}: {
	text: string;
	className?: string;
	delay?: number;
}) => {
	const [displayedText, setDisplayedText] = useState("");
	const [i, setI] = useState(0);

	useEffect(() => {
		const typingEffect = setInterval(() => {
			if (i < text.length) {
				setDisplayedText((prevState) => prevState + text.charAt(i));
				setI(i + 1);
			} else {
				clearInterval(typingEffect);
			}
		}, delay);

		return () => {
			clearInterval(typingEffect);
		};
	}, [i]);

	return (
		<h1 className={cn("drop-shadow-sm", className)}>
			{displayedText ? displayedText : ""}
		</h1>
	);
};

export default TypingEffect;
