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
						<svg
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M4.16667 7.49996L1.66667 9.99996M1.66667 9.99996L4.16667 12.5M1.66667 9.99996H18.3333M7.5 4.16663L10 1.66663M10 1.66663L12.5 4.16663M10 1.66663V18.3333M12.5 15.8333L10 18.3333M10 18.3333L7.5 15.8333M15.8333 7.49996L18.3333 9.99996M18.3333 9.99996L15.8333 12.5"
								stroke="#475467"
								strokeWidth="1.66667"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
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
