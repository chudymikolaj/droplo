import Image from "next/image";

const MenuListBox = () => {
	return (
		<section className="w-full container m-auto">
			<h1 className="mb-4 text-2xl font-semibold">Lista nawigacji</h1>
			<div className="bg-background-primary border border-background-secondary rounded-lg flex flex-col justify-center items-center">
				<div className="w-full p-6 flex flex-col justify-center items-center gap-6">
					<div className="flex flex-col justify-center items-center gap-1">
						<h2 className="font-semibold">Menu jest puste</h2>
						<p className=" text-text-teritary text-sm">W tym menu nie ma jeszcze żadnych linków.</p>
					</div>
					<button className="px-4 py-3 flex flex-row justify-center items-center gap-1 bg-button-primary rounded-[10px] font-semibold text-white text-sm">
						<Image
							aria-hidden
							src="/plus-circle.svg"
							alt="Dodanie pozycji menu"
							width={17}
							height={17}
						/>
						<span>Dodaj pozycję menu</span>
					</button>
				</div>
			</div>
		</section>
	);
};

export default MenuListBox;
