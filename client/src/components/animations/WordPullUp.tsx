import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const WordPullUp = ({
	words,
	className,
	delay = 0,
}: {
	words: string;
	className: string;
	delay?: number;
}) => {
	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delay: delay,
			},
		},
	};

	const item = {
		hidden: { y: 20, opacity: 0 },
		show: { y: 0, opacity: 1 },
	};

	return (
		<motion.h1
			variants={container}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true }}
			className={cn("drop-shadow-sm", className)}
		>
			{words.split(" ").map((word, i) => (
				<motion.span
					key={i}
					variants={item}
					style={{ display: "inline-block", paddingRight: "5px" }}
				>
					{word === "" ? <span>&nbsp;</span> : word}
				</motion.span>
			))}
		</motion.h1>
	);
};

export default WordPullUp;
