import CardView from "./CardView";

const BaseView = () => {
	return (
		<div className="w-full h-full bg-primary">
			<header className="pt-8 text-6xl font-semibold text-center font-header">
				Graduation Invitation
			</header>
			<div className="flex justify-center translate-y-20">
				<CardView width={220} height={240} rotateX={-17.7}></CardView>
				<CardView width={250} height={180} rotateX={11.27}></CardView>
			</div>
		</div>
	);
};

export default BaseView;
