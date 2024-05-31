import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

import useInput from "@/hooks/useInput";
import {useMutation} from "@tanstack/react-query";
import axios from "@/lib/axiosInstance";
import {User} from "@/models";
import { useNavigate } from "react-router-dom";

type NewDialogProps = {
    inviter: User | null;
};


const NewDialog = ({inviter}: NewDialogProps) => {
    const name = useInput<string>({initialValue: "Pedro Duarte"});
    const navigate = useNavigate();

    const handleCreateNewGuest = useMutation({
        mutationFn: () => {
            return axios.post("/guest", {
                inviterId: inviter?.id,
                guestName: name.value,
            });
        },
        onSuccess: () => {
            navigate(`/user/${inviter?.name}/${name.value}`);
        },
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create new guest profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New Guest Profile</DialogTitle>
                    <DialogDescription>Create your new guest. Click save when you're done.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" value={name.value} onChange={name.onChange} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={() => handleCreateNewGuest.mutate()}>
                        Create news
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default NewDialog;