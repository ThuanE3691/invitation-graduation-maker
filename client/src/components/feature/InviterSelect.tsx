import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {ViewContext, ViewContextType} from "@/context/ViewContext";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";

const InviterSelect = () => {
    const {users, inviter} = useContext<ViewContextType>(ViewContext);
    const navigate = useNavigate();

    return (
        <Select
            defaultValue={inviter?.value?.name}
            onValueChange={(value) => {
                navigate(`/user/${value}`);
            }}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select inviter" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Inviter</SelectLabel>
                    {users?.value
                    ?.sort((a, b) => a.name.localeCompare(b.name))
                    .map((user) => {
                        return (
                            <SelectItem key={user.id} value={user.name}>
                                {user.name}
                            </SelectItem>
                        );
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default InviterSelect;
