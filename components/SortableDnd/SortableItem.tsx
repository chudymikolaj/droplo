import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableItemProps {
	id: number;
	children: React.ReactNode;
}

export const SortableItem: React.FC<SortableItemProps> = ({ id, children }) => {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

	const dndSortableStyle = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<li
			ref={setNodeRef}
			className={`w-full py-[20px] px-6 bg-background-primary border border-border-primary rounded-lg ${dndSortableStyle}`}
			{...attributes}
			{...listeners}
		>
			{children}
		</li>
	);
};
