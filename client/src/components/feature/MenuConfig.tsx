import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Image } from "@/models";
import { GrConfigure } from "react-icons/gr";
import axios from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";

export function MenuConfig({
	image,
	setImageInfo,
}: {
	image: Image;
	setImageInfo: (image: Image, name: string, value: number) => void;
}) {
	const mutate = useMutation({
		mutationFn: async () => {
			return await axios.put("/guest/imageInfo", {
				x: image.x,
				y: image.y,
				imageId: image.id,
				width: image.width,
				height: image.height,
				rotate: image.rotate,
			});
		},
	});

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value);
		if (isNaN(value)) return;
		setImageInfo(image, e.target.name, value);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					<GrConfigure />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-96">
				<DropdownMenuLabel>Image Config</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuSeparator></DropdownMenuSeparator>
				<div className="grid grid-cols-2 place-items-center gap-y-2">
					<Label>Width</Label>
					<Input
						name="width"
						type="text"
						value={image.width}
						onChange={handleOnChange}
					></Input>
					<Label>Height</Label>
					<Input
						name="height"
						value={image.height}
						onChange={handleOnChange}
					></Input>
					<Label>X</Label>
					<Input name="x" value={image.x} onChange={handleOnChange}></Input>
					<Label>Y</Label>
					<Input name="y" value={image.y} onChange={handleOnChange}></Input>
					<Label>Rotate</Label>
					<Input
						name="rotate"
						value={image.rotate}
						onChange={handleOnChange}
					></Input>
					<Button className="w-full col-span-2" onClick={() => mutate.mutate()}>
						Save
					</Button>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
