import React, { createContext, useContext, useState } from "react";

interface MenuItem {
	menuId: string;
	menuName: string;
	links: {
		id: number;
		name: string;
		link?: string;
		submenus?: {
			id: number;
			name: string;
			link?: string;
		}[]; // Adding submenus property here
	}[];
}

interface AppContextType {
	menus: MenuItem[];
	addMenuItem: (item: MenuItem, parentId?: string) => void;
	updateMenuItem: (id: string, updatedItem: Partial<MenuItem>) => void;
	reorderNavigation: (items: MenuItem[]) => void;
}

// Sample menu data
const menuListArray: MenuItem[] = [
	{
		menuId: "main-menu-1",
		menuName: "main-menu",
		links: [
			{
				id: 1,
				name: "Promocje",
				link: "https://rc32141.redcart.pl/promocje",
			},
			{
				id: 2,
				name: "Diamenty forbesa",
				link: "https://www.forbes.pl/diamenty",
			},
		],
	},
];

// Create Context
const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [menus, setMenus] = useState<MenuItem[]>(menuListArray);

	const addMenuItem = (item: MenuItem) => {
		setMenus((prev) => [...prev, item]);
	};

	const updateMenuItem = (menuId: string, updatedItem: Partial<MenuItem>) => {
		setMenus((prev) => prev.map((menu) => (menu.menuId === menuId ? { ...menu, ...updatedItem } : menu)));
	};

	const reorderNavigation = (items: MenuItem[]) => {
		setMenus(items);
	};

	return (
		<AppContext.Provider value={{ menus, addMenuItem, updateMenuItem, reorderNavigation }}>
			{children}
		</AppContext.Provider>
	);
};

// Custom hook to use menus context
export const useMenus = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("useMenus must be used within a AppProvider");
	}
	return context;
};
