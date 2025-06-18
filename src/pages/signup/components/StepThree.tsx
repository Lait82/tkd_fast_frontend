"use client";

import type React from "react";

import { FaLock } from "react-icons/fa";
import { useSignupForm } from "@/context/SignupFormContext";
import FormInput from "@/components/forms/FormInput";
import Button from "@/components/Button";

const StepThree = () => {
	const { formData, updateFormData, goToPreviousStep, errors, loading } =
		useSignupForm();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		updateFormData({ [name]: value });
	};

	return (
		<>
			<FormInput
				label="Contraseña"
				name="password"
				type="password"
				icon={<FaLock />}
				value={formData.password}
				onChange={handleChange}
				error={errors.password}
				disabled={loading}
				placeholder="Contraseña"
			/>

			<FormInput
				label="Confirmá tu contraseña"
				name="password_confirmation"
				type="password"
				icon={<FaLock />}
				value={formData.password_confirmation}
				onChange={handleChange}
				error={errors.password_confirmation}
				disabled={loading}
				placeholder="Confirmación de contraseña"
			/>

			{/* <FormInput
        label="Token de invitación (opcional)"
        name="invite_token"
        value={formData.invite_token}
        icon={<FaTag />}
        onChange={handleChange}
        disabled={loading}
        placeholder="Si tenés un código de invitación, ingresalo acá"
      /> */}

			<div className="form-buttons">
				<Button
					variant="secondary"
					onClick={goToPreviousStep}
					disabled={loading}
				>
					Atrás
				</Button>
				<Button type="submit" disabled={loading}>
					{loading ? "Creando cuenta..." : "Crear cuenta"}
				</Button>
			</div>
		</>
	);
};

export default StepThree;
