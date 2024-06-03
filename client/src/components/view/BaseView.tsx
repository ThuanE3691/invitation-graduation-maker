import PinSVG from "@/SVG/PinSVG";
import CardView from "../ui/CardView";
import { hat, glue } from "@/assets";
import Calendar from "../ui/Calendar";
import { LocationSVG } from "@/SVG/LocationSVG";
import Timer from "../ui/Timer";
import { useContext, useRef, useState } from "react";
import { ViewContext, ViewContextType } from "@/context/ViewContext";
import { motion, useInView } from "framer-motion";
import WordPullUp from "../animations/WordPullUp";
import TypingEffect from "../animations/TypingEffect";
import Letter from "../ui/Letter";
import StartSection from "../ui/StartSection";

const BaseView = () => {
	const { nameGuest, images } = useContext<ViewContextType>(ViewContext);
	const [isOpened, setIsOpened] = useState(false);

	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	const MULTIDIRECTION_SLIDE_VARIANTS = {
		hidden: { opacity: 0, x: "-25vw" },
		visible: { opacity: 1, x: 0 },
		right: { opacity: 0, x: "25vw" },
	};

	const FADE_DOWN_ANIMATION_VARIANTS = {
		hidden: { opacity: 0, y: -10 },
		show: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.3 } },
	};

	const FADE_UP_ANIMATION_VARIANTS = {
		hidden: { opacity: 0, y: 10 },
		show: { opacity: 1, y: 0, transition: { type: "spring" } },
	};

	return (
		<div className="relative w-full overflow-x-hidden h-fit bg-primary">
			<motion.div
				className="absolute z-50 w-full"
				animate={{
					opacity: isOpened ? 0 : 1,
					transition: {
						duration: 1,
						delay: 1,
					},
				}}
			>
				<Letter isOpened={isOpened} setIsOpened={setIsOpened}></Letter>
			</motion.div>
			<StartSection isStart={isOpened}></StartSection>
			<div className="relative flex items-center mt-8 bg-zinc-50 h-[60vh]">
				<motion.div
					className="mt-4 mb-8 ml-4 mr-8"
					style={{ width: images[0].width, height: images[0].height }}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					variants={FADE_DOWN_ANIMATION_VARIANTS}
				>
					{
						<motion.img
							src={images.length > 0 ? images[0]?.url : ""}
							className="absolute object-cover "
							style={{ width: images[0].width, height: images[0].height }}
							animate={{
								x: images[0].x,
								y: images[0].y,
								rotate: images[0].rotate,
							}}
						></motion.img>
					}
				</motion.div>
				<div className="flex flex-col text-end">
					<motion.span
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={MULTIDIRECTION_SLIDE_VARIANTS}
						transition={{ duration: 0.75 }}
						className="text-3xl font-alex"
					>
						Hello my friend,
					</motion.span>
					<motion.span
						initial="right"
						whileInView="visible"
						viewport={{ once: true }}
						variants={MULTIDIRECTION_SLIDE_VARIANTS}
						transition={{ duration: 0.75 }}
						className="text-2xl font-bold uppercase font-montserrat"
					>
						{nameGuest?.value}
					</motion.span>
				</div>
				<img src={hat} className="absolute right-8 -bottom-8"></img>
			</div>
			<div className="relative flex flex-col justify-center py-8 h-[60vh]">
				<div ref={ref}>
					{isInView && (
						<TypingEffect
							text="We will create more valuable memories together"
							className="text-center font-alike"
							delay={50}
						></TypingEffect>
					)}
				</div>
				<motion.div
					className="relative flex justify-center pt-8 min-h-60"
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					variants={{
						hidden: {},
						show: {
							transition: {
								staggerChildren: 0.15,
								delayChildren: 2,
							},
						},
					}}
				>
					<motion.div
						className="absolute left-12"
						variants={FADE_UP_ANIMATION_VARIANTS}
					>
						<CardView
							width={images[1].width}
							height={images[1].height}
							rotateX={images[1].rotate}
							footerLength={31}
							imageUrl={images[1].url}
							x={images[1].x}
							y={images[1].y}
							decoration={
								<div className="absolute -top-2 -left-6 -rotate-12">
									<img src={glue}></img>
								</div>
							}
						></CardView>
					</motion.div>
					<motion.div
						className="absolute translate-y-12 right-16"
						variants={FADE_UP_ANIMATION_VARIANTS}
					>
						<CardView
							width={images[2].width}
							height={images[2].height}
							rotateX={images[2].rotate}
							footerLength={33}
							imageUrl={images[2].url}
							x={images[2].x}
							y={images[2].y}
							decoration={
								<div className="absolute z-20 -top-4 left-16">
									<PinSVG width={21} height={26}></PinSVG>
								</div>
							}
						></CardView>
					</motion.div>
				</motion.div>
				<WordPullUp
					words="Come and take a picture with me"
					className="text-2xl text-center font-header"
					delay={2}
				></WordPullUp>
			</div>
			<div className="flex flex-col items-center justify-center py-8 bg-zinc-50">
				<div className="flex items-center justify-center text-2xl font-extrabold gap-x-5 font-montserrat">
					<span className="h-0.5 bg-black rounded w-14"></span>
					<span className="subpixel-antialiased tracking-wider ">11:30 AM</span>
					<span className="h-0.5 bg-black rounded w-14"></span>
				</div>
				<div className="mt-4">
					<Calendar></Calendar>
				</div>
			</div>
			<div className="flex flex-col items-center justify-center py-8">
				<div className="flex items-center font-bold font-montserrat gap-x-3">
					<LocationSVG></LocationSVG>
					<span className="text-2xl">Location</span>
				</div>
				<div className="mt-2 text-sm font-medium text-center font-montserrat">
					<span>University of Information Technology - VNU</span>
					<br></br>
					<span>Han Thuyen street, Linh Trung Ward, Thu Duc City, HCMC</span>
				</div>
				<div>
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.2312404166905!2d106.8004791766592!3d10.87000888928457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527587e9ad5bf%3A0xafa66f9c8be3c91!2sUniversity%20of%20Information%20Technology%20-%20VNUHCM!5e0!3m2!1sen!2ssg!4v1717382661302!5m2!1sen!2ssg"
						className="w-[350px] h-[250px] mt-4 shadow-md rounded-lg"
						allowFullScreen={false}
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
					></iframe>
				</div>
			</div>
			<Timer></Timer>
		</div>
	);
};

export default BaseView;
