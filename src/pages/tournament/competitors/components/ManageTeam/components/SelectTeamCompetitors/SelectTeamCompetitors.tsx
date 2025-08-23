// IconSelect.tsx
import { useEffect, useMemo, useState } from "react";
import Select, { SingleValue } from "react-select";
import { useManageCompetitors } from "../../../ManageCompetitorContext";
import { CompetitorSchema } from "@/types/schemas/primitiveSchemas";
import CustomSingleValue from "./CustomSingleValue";
import CustomOption from "./CustomOption";
import { X } from "lucide-react";

interface SelectTeamCompetitorsProps {
	id: string;
	value: string;
}

// Adaptar el nuevo select a que cambie la data del dropdown
const SelectTeamCompetitors = ({ id, value }: SelectTeamCompetitorsProps) => {
	const { userCompetitors, selectedMembers, setSelectedMembers, teamDraft } =
		useManageCompetitors();

	const getAvailableCompetitors = () => {
		const selectedUUIDs = selectedMembers.map((m) => m.uuid);
		return userCompetitors.filter(
			(userComp) =>
				(!selectedUUIDs.includes(userComp.uuid) ||
					userComp.uuid === value) &&
				!teamDraft.competitors.includes(userComp.uuid)
		);
	};

	const updateSelection = (selectedOption: CompetitorSchema) => {
		setSelectedMembers((prev) =>
			prev.map((slot) =>
				slot.id === id ? { ...slot, uuid: selectedOption.uuid } : slot
			)
		);
	};

	const [options, setOptions] = useState<CompetitorSchema[]>(
		getAvailableCompetitors()
	);

	const selected = useMemo(
		() => userCompetitors.find((uc) => uc.uuid === value) || null,
		[value]
	);

	const handleChange = (selectedOption: SingleValue<CompetitorSchema>) => {
		if (!selectedOption) return;
		updateSelection(selectedOption);
	};

	const deleteSelection = () => {
		setSelectedMembers((prev) => prev.filter((slot) => slot.id !== id));
	};

	// Cada vez que se actualizan los miembros seleccionados rearma las opciones
	useEffect(() => {
		setOptions(getAvailableCompetitors());
	}, [selectedMembers]);

	return (
		<div className="flex px-1 gap-2 items-center">
			<Select
				options={options}
				value={selected}
				onChange={handleChange}
				// menuIsOpen={true}
				getOptionValue={(option) => option.uuid}
				getOptionLabel={(option) =>
					`${option.user.firstname} ${option.user.lastname}`
				}
				menuPortalTarget={document.body}
				isSearchable={false}
				className="w-full"
				placeholder="Elegí un competidor..."
				components={{
					SingleValue: CustomSingleValue,
					Option: CustomOption,
				}}
				theme={(theme) => ({
					...theme,
					borderRadius: 8,
					colors: {
						...theme.colors,
						// Colores principales
						primary: "var(--color-orange)",
						primary25: "rgba(255, 140, 66, 0.1)", // hover suave naranja
						primary50: "rgba(255, 140, 66, 0.2)", // más fuerte
						primary75: "rgba(255, 140, 66, 0.3)",

						// Colores de error
						danger: "var(--color-red)",
						dangerLight: "rgba(223, 92, 76, 0.2)",

						// Fondo y texto
						neutral0: "var(--color-elevated)", // fondo del select
						neutral5: "var(--color-elevated)", // fondo de menú
						neutral10: "var(--color-super-elevated)",
						neutral20: "var(--color-background)", // borde inactivo
						neutral30: "var(--color-orange)", // borde activo
						neutral40: "var(--color-orange)", // ícono activo
						neutral50: "var(--color-muted)", // placeholder
						neutral60: "var(--color-orange)", // ícono hover
						neutral70: "var(--color-orange)", // ícono foco
						neutral80: "var(--color-neutrallight)", // texto normal
						neutral90: "var(--color-neutrallight)", // texto más fuerte

						// (opcional) extremos si usás otras variantes
						neutral100: "var(--color-neutrallight)",
						neutral110: "var(--color-neutrallight)",
						neutral140: "var(--color-neutrallight)",
						neutral170: "var(--color-neutrallight)",
					},
				})}
				styles={{
					// Estilo del input principal del select
					control: (base, state) => ({
						...base,
						cursor: "pointer",
						paddingRight: ".5rem",
						width: "100%", // o el ancho que quieras para el input
						border: state.isFocused
							? "1px solid var(--color-orange)"
							: "1px solid transparent",
						borderRadius: state.isFocused ? "8px" : "0",
						"&:hover": {
							border: state.isFocused
								? "1px solid var(--color-orange)"
								: "1px solid transparent",
							borderBottom: "1px solid var(--color-orange)",
						},
						borderBottom: "1px solid var(--color-orange)",
					}),

					// Estilo del menú desplegable
					menu: (base) => ({
						...base,
						position: "absolute", // ❗️necesario para que el menu no herede el ancho del control
						width: "max-content", // ❗️que se expanda con el contenido
						minWidth: "100%", // para que como mínimo sea tan ancho como el input
						zIndex: 9999, // asegurás que no quede oculto
					}),

					// Contenedor del ícono del dropdown (flecha)
					indicatorsContainer: (base) => ({
						...base,
						borderLeft: "none", // 🔥 esta es la línea divisoria que ves
						paddingLeft: "0.5rem", // opcional: ajusta espacio entre texto e ícono
					}),

					// Estilo del ícono del dropdown
					dropdownIndicator: (base) => ({
						...base,
						padding: "0", // ajusta el tamaño del ícono si querés
						borderLeft: "none",
						paddingLeft: "0",
						color: "var(--color-orange)", // opcional
						"&:hover": {
							color: "var(--color-neutrallight)",
						},
					}),

					// Oculta la línea separadora entre el valor y el ícono
					indicatorSeparator: () => ({
						display: "none",
					}),
				}}
			/>

			<X
				size={30}
				className="text-red cursor-pointer"
				onClick={() => deleteSelection()}
			/>
		</div>
	);
};

export default SelectTeamCompetitors;
