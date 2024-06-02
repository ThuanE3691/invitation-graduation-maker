import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ViewContext, ViewContextType } from "@/context/ViewContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const GuestSelect = () => {
	const { inviter } = useContext<ViewContextType>(ViewContext);
	const navigate = useNavigate();

	return (
		<Select
			onValueChange={(value) => {
				navigate(`/user/${inviter.value?.name}/${value}?displayMode=edit`);
			}}
		>
			<SelectTrigger className="w-full">
				<SelectValue placeholder="Select guest want to modify" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>List guest</SelectLabel>
					{inviter?.value?.guests?.map((guest) => {
						return (
							<SelectItem key={guest.id} value={guest.name}>
								{guest.name}
							</SelectItem>
						);
					})}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default GuestSelect;
