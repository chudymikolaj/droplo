import { useState } from "react";
import Image from "next/image";
import AddMenuItem from "@/components/AddMenuItem";
import DragAndDropMenuList from "@/components/SortableDnd/SortableDndMenuList";

const MenuListBox = () => {
	const [showAddLinkForm, setshowAddLinkForm] = useState(false);

	const handleShowAddLinkForm = () => {
		setshowAddLinkForm((prev) => !prev);
	};

	return (
		<section className="w-full m-auto">
			<div className="py-[20px] px-6 bg-background-primary border border-border-primary rounded-lg">
				<h1 className="mb-[20px] font-semibold">Pozycje menu</h1>
				<div className="bg-background-secondary border border-border-secondary rounded-lg flex flex-col justify-center items-center">
					<div className="w-full p-6 flex flex-col justify-center items-center gap-4">
						<div className="w-full flex flex-col justify-center items-center gap-6">
							<div className="flex flex-col justify-center items-center gap-1 text-center">
								<h2 className="font-semibold">Menu jest puste</h2>
								<p className=" text-text-teritary text-sm">W tym menu nie ma jeszcze żadnych linków.</p>
							</div>
							<button
								onClick={handleShowAddLinkForm}
								className="px-4 py-3 flex flex-row justify-center items-center gap-1 bg-button-primary-background border border-button-primary-border rounded-[10px] shadow  font-semibold text-white text-sm hover:bg-button-primary-background_hover focus:outline-none focus:ring-[4px] focus:ring-button-primary-background_outline/[.24] transition"
							>
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

						{showAddLinkForm && (
							<AddMenuItem
								menuId="main-menu-1"
								handleShowForm={handleShowAddLinkForm}
							/>
						)}
						<DragAndDropMenuList menuId="main-menu-1" />
					</div>
				</div>
			</div>
		</section>
	);
};

export default MenuListBox;
