import "./Letter.css";
import letter from "@/assets/letter.png";
import { motion } from "framer-motion";

const Letter = ({
	isOpened,
	setIsOpened,
}: {
	isOpened: boolean;
	setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const onWrapperClick = () => {
		setIsOpened(true);
	};

	return (
		<div className="h-[100vh] flex items-center justify-center bg-zinc-300">
			<motion.div
				className={`wap ${isOpened ? "opened" : ""}`}
				onClick={onWrapperClick}
				animate={{
					opacity: isOpened ? 0 : 1,
					transition: {
						duration: 1,
						delay: 2,
					},
				}}
			>
				<div className="lid one"></div>
				<div className="lid two"></div>
				<div className="envelope"></div>
				<motion.div
					className="letter border-[1px] border-slate-600 rounded-none"
					animate={{
						opacity: isOpened ? 1 : 0,
						transition: {
							duration: 1.25,
						},
					}}
				>
					<img src={letter} alt="" />
				</motion.div>
			</motion.div>

			<div className="main-letter">
				<p>Hello World</p>
			</div>
		</div>
	);
};

export default Letter;
