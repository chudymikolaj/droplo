import { ArrowLeftIcon } from "@heroicons/react/24/outline";

type ButtonBackType = {
	link: string;
	name: string;
};

const ButtonBack = ({ link, name }: ButtonBackType) => {
	return (
		<a
			href={link}
			className="flex flex-row justify-start items-center gap-2 text-sm font-semibold"
		>
			<ArrowLeftIcon className="size-[17px]" />
			<span>{name}</span>
		</a>
	);
};

export default ButtonBack;
