import { clsx } from "clsx";

const Calendar = () => {
	return (
		<div>
			<div className="mb-4 text-4xl text-center text-[#c6b5a9] font-alex">
				June
			</div>
			<div className="relative grid grid-cols-7 grid-rows-6 gap-x-3 gap-y-2 place-items-center">
				<div className="relative font-header">Sun</div>
				<div className="relative font-header">Mon</div>
				<div className="relative font-header">Tue</div>
				<div className="relative font-header">Wed</div>
				<div className="relative font-header">Thu</div>
				<div className="relative font-header">Fri</div>
				<div className="relative font-header">Sat</div>
				<div className="col-start-6"></div>
				{Array.from({ length: 30 }, (_, i) => i).map((_, i) => (
					<span
						key={i}
						className={clsx(
							"relative font-garamond text-xl",
							i === 7 &&
								"after:rounded-full after:border-yellow-200 after:absolute after:bg-transparent after:border-[2px] after:w-8 after:h-8 after:-translate-x-[21px] after:-translate-y-0.5"
						)}
					>
						{i + 1}
					</span>
				))}
			</div>
		</div>
	);
};

export default Calendar;
