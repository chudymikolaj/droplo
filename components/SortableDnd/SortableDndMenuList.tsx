"use client";

import React, { useState } from "react";
import {
	UniqueIdentifier,
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragOverlay,
	DraggableSyntheticListeners,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { SortableItem } from "@/components/SortableDnd/SortableItem";

type Item = {
	id: UniqueIdentifier;
};

const initialItems: Item[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

export default function DragAndDropMenuList() {
	const [items, setItems] = useState(initialItems);
	const [activeId, setActiveId] = useState<number | null>(null);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const activeItem = activeId ? items.find((item) => item.id === activeId) : null;

	const handleDragStart = (event: { active: { id: UniqueIdentifier } }) => {
		setActiveId(Number(event.active.id));
	};

	const handleDragEnd = (event: { active: { id: UniqueIdentifier }; over: { id: UniqueIdentifier } | null }) => {
		const { active, over } = event;

		if (!over) {
			return;
		}

		if (active.id !== over.id) {
			setItems((items) => {
				const oldIndex = items.findIndex((item) => item.id === active.id);
				const newIndex = items.findIndex((item) => item.id === over.id);

				return arrayMove(items, oldIndex, newIndex);
			});
		}

		setActiveId(null);
	};

	const handleDragCancel = () => {
		setActiveId(null);
	};

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			onDragCancel={handleDragCancel}
		>
			<SortableContext items={items.map((item) => item.id)}>
				<ul className="w-full flex flex-col justify-center items-center gap-4 list-none">
					{items.map((item) => (
						<SortableItem
							key={item.id}
							id={Number(item.id)}
						>
							<div>
								<p>{item.id}</p>
								<p>{item.id}</p>
							</div>
						</SortableItem>
					))}
				</ul>
			</SortableContext>

			<DragOverlay className="list-none">
				{activeItem ? <SortableItem id={Number(activeItem.id)}>{activeItem.id}</SortableItem> : null}
			</DragOverlay>
		</DndContext>
	);
}
