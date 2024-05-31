import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {IoSettingsOutline} from "react-icons/io5";
import {Input, Separator} from "@/components/ui";
import {useContext} from "react";
import {ViewContext, ViewContextType} from "@/context/ViewContext";
import ImageUpload from "../feature/ImageUpload";
import InviterSelect from "../feature/InviterSelect";
import GuestSelect from "../feature/GuestSelect";
import { Button } from "../ui/button";
import NewDialog from "../feature/NewDialog";

export enum ModeController {
    ADMIN = "ADMIN",
    INVITER = "INVITER",
    GUEST = "GUEST",
}

export type ViewControllerProps = {
    mode: ModeController;
};

const ViewController = ({mode}: ViewControllerProps) => {
    const {nameGuest, imageOne, inviter} = useContext<ViewContextType>(ViewContext);

    return (
        <Sheet>
            <SheetTrigger className="absolute py-4 pl-4">
                <IoSettingsOutline size={32} />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Create new invitation page</SheetTitle>
                </SheetHeader>
                <Separator className="my-4" />
                <div className="flex flex-col gap-y-4">
                    <SheetHeader>
                        <span className="font-medium">Current Inviter</span>
                        <InviterSelect></InviterSelect>
                    </SheetHeader>
                    {mode === ModeController.INVITER && (
                        <>
                            <SheetHeader>
                                <span className="font-medium">List Guest</span>
                                <GuestSelect></GuestSelect>
                            </SheetHeader>
                            <div className="flex gap-x-2 items-center">
                                <Separator className=" w-[45%]" />
                                <div className="font-medium font-montserrat">OR</div>
                                <Separator className=" w-[45%]" />
                            </div>
                            <NewDialog
															inviter={inviter.value}
														></NewDialog>
                        </>
                    )}
                    {mode === ModeController.GUEST && (
                        <>
                            <SheetHeader>
                                <span className="font-medium">Guest Name</span>
                                <Input value={nameGuest?.value} onChange={nameGuest?.onChange}></Input>
                            </SheetHeader>
                            <SheetHeader>
                                <span className="font-medium">First Image</span>
                                <ImageUpload setImage={imageOne?.setImage}></ImageUpload>
                            </SheetHeader>
                            <SheetHeader>
                                <span className="font-medium">Second Image</span>
                                <Input type="file" id="image-2"></Input>
                            </SheetHeader>
                            <SheetHeader>
                                <span className="font-medium">Third Image</span>
                                <Input type="file" id="image-3"></Input>
                            </SheetHeader>
                            <Button>Save</Button>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default ViewController;
