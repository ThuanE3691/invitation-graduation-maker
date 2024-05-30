import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";
import { useEffect, useState } from "react";

dayjs.extend(customParseFormat);
dayjs.extend(duration);

const displayTime = (time: number) => {
	return time < 10 ? `0${time}` : time;
};

const Timer = () => {
	const targetDay = dayjs("08-06-2024 11:30:00", "DD-MM-YYYY HH:mm:ss");
	const duration = dayjs.duration(targetDay.diff(dayjs()));

	const [timer, setTimerLeft] = useState({
		days: duration.days(),
		hours: duration.hours(),
		minutes: duration.minutes(),
		seconds: duration.seconds(),
	});

	useEffect(() => {
		const interval = setInterval(() => {
			const newDuration = dayjs.duration(targetDay.diff(dayjs()));
			setTimerLeft({
				days: newDuration.days(),
				hours: newDuration.hours(),
				minutes: newDuration.minutes(),
				seconds: newDuration.seconds(),
			});

			if (newDuration.asMilliseconds() === 0) {
				clearInterval(interval);
			}
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div className="flex items-center justify-center py-8 bg-white gap-x-8">
			<div className="flex flex-col items-center gap-y-2">
				<span className="text-3xl font-header">{displayTime(timer.days)}</span>
				<span className="text-lg font-alex">Days</span>
			</div>
			<div className="flex flex-col items-center gap-y-2">
				<span className="text-3xl font-header">{displayTime(timer.hours)}</span>
				<span className="text-lg font-alex">Hours</span>
			</div>
			<div className="flex flex-col items-center gap-y-2">
				<span className="text-3xl font-header">
					{displayTime(timer.minutes)}
				</span>
				<span className="text-lg font-alex">Minutes</span>
			</div>
			<div className="flex flex-col items-center gap-y-2">
				<span className="text-3xl font-header">
					{displayTime(timer.seconds)}
				</span>
				<span className="text-lg font-alex">Seconds</span>
			</div>
		</div>
	);
};

export default Timer;
