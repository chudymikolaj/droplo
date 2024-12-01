import React, { createContext, useContext, useState } from "react";

export interface NavigationItem {
	id: string;
	label: string;
	url?: string;
	children?: NavigationItem[];
}

interface NavigationContextType {
	navigation: NavigationItem[];
	addNavigationItem: (item: NavigationItem, parentId?: string) => void;
	updateNavigationItem: (id: string, updatedItem: Partial<NavigationItem>) => void;
	reorderNavigation: (items: NavigationItem[]) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [navigation, setNavigation] = useState<NavigationItem[]>([]);

	const addNavigationItem = (item: NavigationItem, parentId?: string) => {
		if (parentId) {
			setNavigation((prev) =>
				prev.map((nav) => (nav.id === parentId ? { ...nav, children: [...(nav.children || []), item] } : nav))
			);
		} else {
			setNavigation((prev) => [...prev, item]);
		}
	};

	const updateNavigationItem = (id: string, updatedItem: Partial<NavigationItem>) => {
		const updateItemRecursively = (items: NavigationItem[]): NavigationItem[] =>
			items.map((item) =>
				item.id === id ? { ...item, ...updatedItem } : { ...item, children: updateItemRecursively(item.children || []) }
			);

		setNavigation((prev) => updateItemRecursively(prev));
	};

	const reorderNavigation = (items: NavigationItem[]) => {
		setNavigation(items);
	};

	return (
		<NavigationContext.Provider value={{ navigation, addNavigationItem, updateNavigationItem, reorderNavigation }}>
			{children}
		</NavigationContext.Provider>
	);
};

export const useNavigation = () => {
	const context = useContext(NavigationContext);
	if (!context) {
		throw new Error("useNavigation must be used within a NavigationProvider");
	}
	return context;
};
