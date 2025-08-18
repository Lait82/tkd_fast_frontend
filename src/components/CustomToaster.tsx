import { RxCheckCircled, RxCrossCircled } from "react-icons/rx";
import { Toaster } from "sonner";

const CustomToaster = () => {
	return (
		<Toaster
			position="top-right"
			icons={{
				error: <RxCrossCircled size={36} color="var(--color-red)" />,
				success: (
					<RxCheckCircled size={36} color="var(--color-green)" />
				),
			}}
			toastOptions={{
				style: {
					background: "#373838",
					border: "none",
					color: "var(--color-neutrallight)",
					borderRadius: "8px",
				},
				duration: 5000,
			}}
		/>
	);
};

export default CustomToaster;
