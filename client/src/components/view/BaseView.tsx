import PinSVG from "@/SVG/PinSVG";
import CardView from "../ui/CardView";
import { hat, glue, map } from "@/assets";
import TextCurved from "../ui/TextCurve";
import Calendar from "../ui/Calendar";
import { LocationSVG } from "@/SVG/LocationSVG";
import Timer from "../ui/Timer";
import { useContext } from "react";
import { ViewContext, ViewContextType } from "@/context/ViewContext";

const BaseView = () => {
	const { nameGuest, imageOne } = useContext<ViewContextType>(ViewContext);

	return (
		<div className="w-full h-fit bg-primary">
			<header className="flex flex-col items-center justify-center w-full pt-8 font-semibold mobile:text-3xl font-header">
				<TextCurved></TextCurved>

				<span className="mobile:text-5xl">Graduation</span>
				<span className="mobile:text-5xl">Ceremony</span>
			</header>
			<div className="relative flex items-center mt-8 bg-white">
				<div className="mt-4 mb-8 ml-4 mr-8">
					<img
						src={imageOne?.image}
						className=" object-cover w-[163px] h-[217px]"
					></img>
				</div>
				<div className="flex flex-col text-end">
					<span className="text-3xl font-alex">Hello my friend,</span>
					<span className="text-2xl font-bold uppercase font-montserrat">
						{nameGuest?.value}
					</span>
				</div>
				<img src={hat} className="absolute right-8 -bottom-8"></img>
			</div>
			<div className="relative flex flex-col justify-center py-8">
				<span className="text-center font-alike">
					We will create more valuable memories together
				</span>
				<div className="relative flex justify-center pt-8 min-h-60">
					<div className="absolute left-12">
						<CardView
							width={116}
							height={122}
							rotateX={14}
							footerLength={167 - 122}
							decoration={
								<div className="absolute -top-2 -left-6 -rotate-12">
									<img src={glue}></img>
								</div>
							}
						></CardView>
					</div>
					<div className="absolute translate-y-12 right-16">
						<CardView
							width={131}
							height={100}
							rotateX={-11}
							footerLength={131 - 100}
							decoration={
								<div className="absolute z-20 -top-4 left-16">
									<PinSVG width={21} height={26}></PinSVG>
								</div>
							}
						></CardView>
					</div>
				</div>
				<div className="text-2xl text-center font-header">
					Come and take a picture with me
				</div>
			</div>
			<div className="flex flex-col items-center justify-center py-8 bg-white">
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
				<p className="mt-2 text-sm font-medium text-center font-montserrat">
					University of Information Technology - VNU Han Thuyen street, Linh
					Trung Ward, Thu Duc City, HCMC
				</p>
				<img src={map} className="object-cover mt-4"></img>
			</div>
			<Timer></Timer>
		</div>
	);
};

export default BaseView;
