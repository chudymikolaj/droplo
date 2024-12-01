"use client";

import { AppProvider } from "@/context/AppContext";
import ButtonBack from "@/components/Buttons/ButtonBack";
import HeaderAddMenuItem from "@/components/HeaderAddMenuItem";
import MenuListBox from "@/components/MenuListBox";

export default function Home() {
	return (
		<AppProvider>
			<div className="grid grid-rows-[1fr_20px] items-start justify-items-center min-h-screen p-3 sm:p-16 gap-16">
				<main className="w-full flex flex-col gap-6 row-start-1 justify-center items-start">
					<ButtonBack
						link="/"
						name="Wróc do listy nawigacji"
					/>
					<HeaderAddMenuItem />
					<MenuListBox />
				</main>
			</div>
		</AppProvider>
	);
}
