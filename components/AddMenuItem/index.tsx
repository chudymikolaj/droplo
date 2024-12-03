"use client";

import React from "react";
import * as Yup from "yup";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { useMenus } from "@/context/AppContext"; // Adjust the path to your context

interface AddMenuItemInterface {
	linkName: string;
	link: string;
}

const AddMenuItem: React.FC<{ menuId: string; handleShowForm: () => void }> = ({ menuId, handleShowForm }) => {
	const { menus, updateMenuItem } = useMenus(); // Use context to update the menu

	const currentMenu = menus.find((menu) => menu.menuId === menuId);

	if (!currentMenu) {
		return <p>Menu not found</p>;
	}

	const validationSchema = Yup.object({
		linkName: Yup.string().required("Nazwa is required"),
		link: Yup.string().url("Must be a valid URL").required("Link is required"),
	});

	return (
		<div className="w-full mt-6 py-[20px] px-6 bg-background-primary border border-border-primary rounded-lg">
			<Formik
				initialValues={{
					linkName: "",
					link: "",
				}}
				validationSchema={validationSchema}
				onSubmit={(values: AddMenuItemInterface, { setSubmitting, resetForm }: FormikHelpers<AddMenuItemInterface>) => {
					// Create a new link item
					const newLink = {
						id: Date.now(), // Generate a unique ID
						name: values.linkName,
						link: values.link,
					};

					// Update the current menu with the new link
					updateMenuItem(menuId, {
						links: [...currentMenu.links, newLink],
					});

					// Reset form and stop submitting state
					resetForm();
					setSubmitting(false);
				}}
			>
				{({ isSubmitting }) => (
					<Form className="flex flex-col gap-5">
						<div className="flex flex-col gap-2">
							<div className="flex flex-col gap-[6px]">
								<label
									className="text-sm font-semibold"
									htmlFor="linkName"
								>
									Nazwa
								</label>
								<Field
									id="linkName"
									name="linkName"
									className="py-2 px-3 border border-border-primary rounded-lg focus:outline-none focus:ring-[4px] focus:ring-button-primary-background_outline/[.24] transition"
									placeholder="np. Promocje"
								/>
							</div>

							<div className="flex flex-col gap-[6px]">
								<label
									className="text-sm font-semibold"
									htmlFor="link"
								>
									Link
								</label>
								<Field
									id="link"
									name="link"
									className="py-2 px-3 border border-border-primary rounded-lg focus:outline-none focus:ring-[4px] focus:ring-button-primary-background_outline/[.24] transition"
									placeholder="Wklej lub wyszukaj"
								/>
							</div>
						</div>

						<div className="flex flex-row gap-2">
							<button
								type="button"
								className="py-[10px] px-4 border border-button-secondary-border rounded-lg text-button-secondary-fg font-semibold hover:bg-button-secondary-background_hover hover:border:button-secondary-background_hover-border focus:outline-none focus:ring-[4px] focus:ring-button-secondary-background_outline/[.24] transition"
								onClick={handleShowForm}
							>
								Anuluj
							</button>
							<button
								type="submit"
								className="py-[10px] px-4 border border-button-secondary-color-border rounded-lg text-button-secondary-color-fg hover:bg-button-secondary-color-border_bg-hover font-semibold focus:outline-none focus:ring-[4px] focus:ring-button-primary-background_outline/[.24] transition disabled:bg-border-disabled_subtle"
								disabled={isSubmitting} // Disable the button during submission
							>
								Dodaj
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default AddMenuItem;
