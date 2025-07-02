// IconSelect.tsx
import React, { useState } from "react";
import Select, { SingleValue, components } from "react-select";
import { OptionProps } from "react-select";
import { Rank } from "@/types/enums";
import { getRankName } from "@/utils/utils";
import BeltIcon from "./BeltIcon";

type IconOption = {
	value: string;
	label: string;
	icon: React.ReactNode;
};

const options: IconOption[] = Object.values(Rank).map((rank) => ({
	value: rank,
	label: getRankName(rank),
	icon: <BeltIcon size={20} rank={rank} />,
}));

// TODO: desacoplar IconSelect y actualizar RankSelect para que haga uso de IconSelect y que IconSelect no sea un rankselect2.
const customSingleValue = (props: any) => {
	const { data } = props;

	return (
		<components.SingleValue {...props}>
			<div className="flex items-center w-full gap-0.5 overflow-hidden">
				{/* Icono ocupa 1/3 */}
				<div className="flex-shrink-0 basis-1/3 flex items-center justify-start">
					{data.icon}
				</div>

				{/* Texto ocupa 2/3, se trunca */}
				<div className="truncate basis-2/3 overflow-hidden whitespace-nowrap">
					{data.label}
				</div>
			</div>
		</components.SingleValue>
	);
};

const customOption = (props: OptionProps<IconOption, false>) => {
	const { data, innerRef, innerProps, isSelected } = props;
	return (
		<div
			className={`bg-elevated p-1 flex items-center gap-0.5 cursor-pointer border transition-all rounded-lg ease-fluid
                ${isSelected ? "border-orange" : "border-transparent"}
                hover:border-orange`}
			ref={innerRef}
			{...innerProps}
		>
			{data.icon}
			{data.label}
		</div>
	);
};

const IconSelect = () => {
	const [selected, setSelected] = useState<IconOption | null>(null);

	const handleChange = (option: SingleValue<IconOption>) => {
		setSelected(option);
	};

	return (
		<Select
			options={options}
			value={selected}
			onChange={handleChange}
			isSearchable={false}
			className="w-full"
			placeholder="Graduación"
			components={{
				SingleValue: customSingleValue,
				Option: customOption,
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
	);
};

export default IconSelect;
