"use client";

import React from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";

interface AddMenuItemInterface {
	linkName: string;
	link: string;
}

const AddMenuItem = () => {
	return (
		<div className="w-full mt-6 py-[20px] px-6 bg-background-primary border border-border-primary rounded-lg">
			<Formik
				initialValues={{
					linkName: "",
					link: "",
				}}
				onSubmit={(values: AddMenuItemInterface, { setSubmitting }: FormikHelpers<AddMenuItemInterface>) => {
					setTimeout(() => {
						alert(JSON.stringify(values, null, 2));
						setSubmitting(false);
					}, 500);
				}}
			>
				<Form className="flex flex-col gap-5">
					<div className="flex flex-col gap-2">
						<div className="flex flex-col gap-[6px]">
							<label
								className="text-sm font-semibold"
								htmlFor="addNewLinkName"
							>
								Nazwa
							</label>
							<Field
								id="addNewLinkName"
								className="py-2 px-3 border border-border-primary rounded-lg focus:outline-none focus:ring-[4px] focus:ring-button-primary-background_outline/[.24] transition"
								name="addNewLinkName"
								placeholder="np. Promocje"
							/>
						</div>

						<div className="flex flex-col gap-[6px]">
							<label
								className="text-sm font-semibold"
								htmlFor="addNewLink"
							>
								Link
							</label>
							<Field
								id="addNewLink"
								className="py-2 px-3 border border-border-primary rounded-lg focus:outline-none focus:ring-[4px] focus:ring-button-primary-background_outline/[.24] transition"
								name="addNewLink"
								placeholder="Wklej lub wyszukaj"
							/>
						</div>
					</div>

					<div className="flex flex-row gap-2">
						<button className="py-[10px] px-4 border border-button-secondary-border rounded-lg text-button-secondary-fg font-semibold hover:bg-button-secondary-background_hover hover:border:button-secondary-background_hover-border focus:outline-none focus:ring-[4px] focus:ring-button-secondary-background_outline/[.24] transition">
							Anuluj
						</button>
						<button
							className="py-[10px] px-4 border border-button-secondary-color-border rounded-lg text-button-secondary-color-fg hover:bg-button-secondary-color-border_bg-hover font-semibold focus:outline-none focus:ring-[4px] focus:ring-button-primary-background_outline/[.24] transition disabled:bg-border-disabled_subtle"
							type="submit"
						>
							Dodaj
						</button>
					</div>
				</Form>
			</Formik>
		</div>
	);
};

export default AddMenuItem;
