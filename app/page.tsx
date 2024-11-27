import ButtonBack from "@/components/Buttons/ButtonBack";
import MenuListBox from "@/components/MenuListBox";

export default function Home() {
	return (
		<div className="grid grid-rows-[1fr_20px] items-start justify-items-center min-h-screen p-3 sm:p-16 gap-16">
			<main className="w-full flex flex-col gap-8 row-start-1 justify-center items-start">
				<ButtonBack
					link="/"
					name="Wróc do listy nawigacji"
				/>
				<MenuListBox />
			</main>
		</div>
	);
}
