import React from "react";

const HeaderAddMenuItem = () => {
	return (
		<div className="w-full py-[20px] px-6 bg-background-primary border border-border-primary rounded-lg">
			<h1 className="mb-[20px] font-semibold">Nazwa</h1>
			<div className="flex flex-col gap-2">
				<div className="flex flex-col gap-[6px]">
					<label
						className="text-sm font-semibold"
						htmlFor="menu"
					>
						Menu
					</label>
					<input
						id="menu"
						className="py-2 px-3 border border-border-primary rounded-lg"
						name="menu"
						type="text"
						placeholder="np. Menu główne"
					/>
				</div>

				<div className="flex flex-col gap-[6px]">
					<label
						className="text-sm font-semibold"
						htmlFor="link"
					>
						Link
					</label>
					<input
						id="link"
						className="py-2 px-3 border border-border-primary rounded-lg"
						name="link"
						type="text"
						placeholder="Wklej lub wyszukaj"
					/>
				</div>
			</div>
		</div>
	);
};

export default HeaderAddMenuItem;
