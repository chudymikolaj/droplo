import React, { useState, useEffect } from "react";
import {
	UniqueIdentifier,
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragOverlay,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { SortableItem } from "@/components/SortableDnd/SortableItem";
import { useMenus } from "@/context/AppContext";

const DragAndDropLinks: React.FC<{ menuId: string }> = ({ menuId }) => {
	const { menus, updateMenuItem } = useMenus();
	const menu = menus.find((menu) => menu.menuId === menuId);

	if (!menu) {
		return <p>Menu not found</p>;
	}

	const [isClient, setIsClient] = useState(false);
	const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

	// State for adding submenus
	const [submenuName, setSubmenuName] = useState("");
	const [submenuLink, setSubmenuLink] = useState<string | undefined>("");
	const [activeLinkId, setActiveLinkId] = useState<number | null>(null); // Track which link is being edited

	// State for editing a link
	const [editingLinkId, setEditingLinkId] = useState<number | null>(null);
	const [editingLinkName, setEditingLinkName] = useState<string>("");
	const [editingLinkURL, setEditingLinkURL] = useState<string | undefined>("");

	// Ensure the component only renders on the client
	useEffect(() => {
		setIsClient(true);
	}, []);

	// Drag-and-drop setup
	const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

	// Handle drag start
	const handleDragStart = (event: { active: { id: UniqueIdentifier } }) => {
		setActiveId(event.active.id);
	};

	// Handle drag end
	const handleDragEnd = (event: { active: { id: UniqueIdentifier }; over: { id: UniqueIdentifier } | null }) => {
		const { active, over } = event;

		if (!over) return;

		if (active.id !== over.id) {
			const oldIndex = menu.links.findIndex((link) => link.id === active.id);
			const newIndex = menu.links.findIndex((link) => link.id === over.id);

			const reorderedLinks = arrayMove(menu.links, oldIndex, newIndex);
			updateMenuItem(menuId, { links: reorderedLinks });
		}

		setActiveId(null);
	};

	// Handle adding a submenu to a specific link
	const handleAddSubmenu = (linkId: number) => {
		if (!submenuName) {
			alert("Please enter a submenu name");
			return;
		}

		const newSubmenu = {
			id: Date.now(), // Unique ID for submenu
			name: submenuName,
			link: submenuLink || undefined, // Ensure it's undefined if no link
		};

		const updatedLinks = menu.links.map((link) =>
			link.id === linkId ? { ...link, submenus: [...(link.submenus || []), newSubmenu] } : link
		);

		updateMenuItem(menuId, { links: updatedLinks });
		setSubmenuName("");
		setSubmenuLink(undefined); // Reset after adding submenu
		setActiveLinkId(null); // Close form after submission
	};

	// Handle form visibility for adding a submenu to a specific link
	const handleToggleSubmenuForm = (linkId: number) => {
		setActiveLinkId(activeLinkId === linkId ? null : linkId);
	};

	// Handle deleting a link
	const handleDeleteLink = (linkId: number) => {
		const updatedLinks = menu.links.filter((link) => link.id !== linkId);
		updateMenuItem(menuId, { links: updatedLinks });
	};

	// Handle editing a link
	const handleEditLink = (linkId: number) => {
		const linkToEdit = menu.links.find((link) => link.id === linkId);
		if (linkToEdit) {
			setEditingLinkId(linkId);
			setEditingLinkName(linkToEdit.name);
			setEditingLinkURL(linkToEdit.link || "");
		}
	};

	// Handle saving edited link
	const handleSaveEditedLink = (e: React.FormEvent) => {
		e.preventDefault();
		if (editingLinkId !== null) {
			const updatedLinks = menu.links.map((link) =>
				link.id === editingLinkId ? { ...link, name: editingLinkName, link: editingLinkURL || undefined } : link
			);
			updateMenuItem(menuId, { links: updatedLinks });
			setEditingLinkId(null);
			setEditingLinkName("");
			setEditingLinkURL("");
		}
	};

	// Get the name of the link being dragged
	const draggingLink = menu.links.find((link) => link.id === activeId);

	return isClient ? (
		<div className="w-full">
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
			>
				<SortableContext items={menu.links.map((link) => link.id)}>
					<ul className="w-full flex flex-col justify-center items-center gap-4 list-none">
						{menu.links.map((link) => (
							<SortableItem
								key={link.id}
								id={link.id}
								onDelete={() => handleDeleteLink(link.id)}
								onEdit={() => handleEditLink(link.id)}
								onAddSubmenu={() => handleToggleSubmenuForm(link.id)}
							>
								<div>
									{editingLinkId === link.id ? (
										<form onSubmit={handleSaveEditedLink}>
											<div className="mb-[6px] flex flex-col gap-[6px]">
												<label
													className="text-sm font-semibold"
													htmlFor="editingLinkName"
												>
													Nazwa:
												</label>
												<input
													id="editingLinkName"
													className="py-2 px-3 border border-border-primary rounded-lg focus:outline-none focus:ring-[4px] focus:ring-button-primary-background_outline/[.24] transition"
													type="text"
													value={editingLinkName}
													onChange={(e) => setEditingLinkName(e.target.value)}
													required
												/>
											</div>
											<div className="flex flex-col gap-[6px]">
												<label
													className="text-sm font-semibold"
													htmlFor="editingLinkURL"
												>
													Link:
												</label>
												<input
													id="editingLinkURL"
													className="py-2 px-3 border border-border-primary rounded-lg focus:outline-none focus:ring-[4px] focus:ring-button-primary-background_outline/[.24] transition"
													type="text"
													value={editingLinkURL}
													onChange={(e) => setEditingLinkURL(e.target.value)}
												/>
											</div>
											<div className="mt-5 flex flex-row gap-2">
												<button
													type="button"
													className="py-[10px] px-4 border border-button-secondary-border rounded-lg text-button-secondary-fg font-semibold hover:bg-button-secondary-background_hover hover:border:button-secondary-background_hover-border focus:outline-none focus:ring-[4px] focus:ring-button-secondary-background_outline/[.24] transition"
													onClick={() => setEditingLinkId(null)} // Close edit form
												>
													Anuluj
												</button>
												<button
													className="py-[10px] px-4 border border-button-secondary-color-border rounded-lg text-button-secondary-color-fg hover:bg-button-secondary-color-border_bg-hover font-semibold focus:outline-none focus:ring-[4px] focus:ring-button-primary-background_outline/[.24] transition disabled:bg-border-disabled_subtle"
													type="submit"
												>
													Zmień
												</button>
											</div>
										</form>
									) : (
										<div>
											<p className="mb-[6px] text-lg leading-none text-sm font-semibold">{link.name}</p>
											{link.link && (
												<a
													href={link.link}
													target="_blank"
													rel="noopener noreferrer"
													className="text text-text-teritary no-underline text-sm"
												>
													{link.link}
												</a>
											)}
										</div>
									)}
								</div>

								{activeLinkId === link.id && (
									<div>
										<h3>Add Submenu</h3>
										<form
											onSubmit={(e) => {
												e.preventDefault();
												handleAddSubmenu(link.id);
											}}
										>
											<div>
												<label htmlFor="submenuName">Submenu Name:</label>
												<input
													id="submenuName"
													type="text"
													value={submenuName}
													onChange={(e) => setSubmenuName(e.target.value)}
													required
												/>
											</div>
											<div>
												<label htmlFor="submenuLink">Submenu Link (optional):</label>
												<input
													id="submenuLink"
													type="text"
													value={submenuLink || ""}
													onChange={(e) => setSubmenuLink(e.target.value || undefined)}
												/>
											</div>
											<button type="submit">Add Submenu</button>
											<button
												type="button"
												onClick={() => setActiveLinkId(null)} // Close form
											>
												Cancel
											</button>
										</form>
									</div>
								)}

								{link.submenus && link.submenus.length > 0 && (
									<ul>
										{link.submenus.map((submenu) => (
											<li key={submenu.id}>
												<p>{submenu.name}</p>
												{submenu.link && (
													<a
														href={submenu.link}
														target="_blank"
														rel="noopener noreferrer"
														className="text-blue-500 underline"
													>
														{submenu.link}
													</a>
												)}
											</li>
										))}
									</ul>
								)}
							</SortableItem>
						))}
					</ul>
				</SortableContext>

				<DragOverlay>
					{activeId && draggingLink && (
						<div className="w-full relative px-6 py-3 bg-background-primary border border-border-primary rounded-lg">
							<div className="flex items-center space-x-2">
								<div
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
								<p className="text-lg leading-none text-sm font-semibold">{draggingLink.name}</p>{" "}
							</div>
						</div>
					)}
				</DragOverlay>
			</DndContext>
		</div>
	) : null;
};

export default DragAndDropLinks;
