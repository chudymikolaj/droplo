import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableItemProps {
	id: string | number;
	children: React.ReactNode;
	onDelete: (id: string | number) => void;
	onEdit: (id: string | number) => void;
	onAddSubmenu: (id: string | number) => void;
}

export const SortableItem: React.FC<SortableItemProps> = ({ id, children, onDelete, onEdit, onAddSubmenu }) => {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<li
			ref={setNodeRef}
			style={style}
			className="w-full relative px-6 py-3 bg-background-primary border border-border-primary rounded-lg"
		>
			<div className="flex justify-between items-center">
				<div className="flex items-center space-x-2">
					{/* Drag Handle */}
					<div
						{...listeners}
						{...attributes}
						className="w-[40px] h-[40px] cursor-grab flex justify-center items-center"
						title="Drag"
					>
						☰
					</div>
					{/* Main Content */}
					<div>{children}</div>
				</div>
				{/* Action Buttons */}
				<div className="flex">
					<button
						onClick={() => onDelete(id)}
						className="px-4 py-[10px] border border-button-secondary-border hover:bg-button-secondary-background_hover hover:border-button-secondary-background_hover-border  rounded-l-lg"
					>
						Usuń
					</button>
					<button
						onClick={() => onEdit(id)}
						className="px-4 py-[10px] border-y border-button-secondary-border hover:bg-button-secondary-background_hover hover:border-button-secondary-background_hover-border"
					>
						Edytuj
					</button>
					<button
						onClick={() => onAddSubmenu(id)}
						className="px-4 py-[10px] border border-button-secondary-border hover:bg-button-secondary-background_hover hover:border-button-secondary-background_hover-border rounded-r-lg"
					>
						Dodaj pozycje menu
					</button>
				</div>
			</div>
		</li>
	);
};
