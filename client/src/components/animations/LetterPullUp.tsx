import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type Props = {
	listWords?: string[];
	delay: number;
	className?: string;
};

type LetterProps = {
	letter: string;
	key: number;
	className?: string;
	position: number;
	delay: number;
};

const LetterAnimation = ({
	letter,
	className,
	position,
	delay,
}: LetterProps) => {
	const pullupVariant = {
		initial: { y: 100, opacity: 0 },
		animate: (i: number) => ({
			y: 0,
			opacity: 1,
			transition: {
				delay: i * 0.05 + delay, // Delay each letter's animation by 0.05 seconds
			},
		}),
	};

	return (
		<motion.h1
			key={position}
			variants={pullupVariant}
			initial="initial"
			animate="animate"
			custom={position}
			className={cn(
				"text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]",
				className ?? ""
			)}
		>
			{letter === " " ? <span>&nbsp;</span> : letter}
		</motion.h1>
	);
};

const LetterPullUp = ({ listWords, delay, className }: Props) => {
	let countWords = 0;

	return (
		<div className="flex flex-col items-center justify-center w-full ">
			{listWords?.map((words, i) => {
				if (i !== 0) {
					countWords += listWords[i - 1].length;
				}
				const letters = words.split("");
				return (
					<div className="flex" key={words}>
						{letters.map((letter, j) => {
							return (
								<LetterAnimation
									letter={letter}
									key={countWords + j}
									position={countWords + j}
									className={className}
									delay={delay}
								/>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};

export default LetterPullUp;
