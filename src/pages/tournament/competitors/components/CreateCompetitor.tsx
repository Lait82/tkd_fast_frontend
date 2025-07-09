import Button from "@/components/Button";
import Datepicker from "@/components/Datepicker";
import FormInput from "@/components/forms/FormInput";
import IconSelect from "@/components/IconSelect";
import { errorToast, successToast } from "@/services/toasts";
import { createCompetitor } from "@/services/tournamentService";
import { useTournamentStore } from "@/states/useTournamentStore";
import { useManageCompetitors } from "./ManageCompetitorContext";
import { competitorSchema } from "@/types/schemas/primitiveSchemas";

const CreateCompetitor = () => {
	const {
		newCompetitor,
		setNewCompetitor,
		setUserCompetitors,
		resetNewCompetitor,
	} = useManageCompetitors();
	const { tournament } = useTournamentStore();

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;

		setNewCompetitor({ ...newCompetitor, [name]: value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const res = await createCompetitor(tournament.code, newCompetitor); // Este endpoint deberia devolver el competitor creado con la info del usuario para poder instanciarlo con el zodschema y poder agregarlo al array de competitors.
			const createdCompetitor = competitorSchema.parse(res);
			successToast("Competidor creado con exito.");

			setUserCompetitors((prev) => [...prev, createdCompetitor]);
			resetNewCompetitor();
		} catch (err: any) {
			errorToast(err.message);
			// setError(err.message || "Error al editar el torneo")
		} finally {
			// setLoading(false)
		}
	};
	return (
		<div className="bg-elevated flex flex-col gap-2 shadow-lg justify-center p-3 rounded-lg">
			<div className="flex flex-col gap-3">
				<h1 className="font-extrabold text-2xl">Agregar Competidor</h1>
				<div className="flex gap-2">
					<div
						className="flex-shrink-0 flex rounded-full justify-center items-center bg-background text-orange text-5xl"
						style={{
							height: "130px",
							width: "130px",
						}}
					>
						{`${newCompetitor.firstname
							.charAt(0)
							.toUpperCase()}${newCompetitor.lastname
							.charAt(0)
							.toUpperCase()}`}
					</div>
					<form
						onSubmit={handleSubmit}
						className="grid grid-cols-2 gap-y-4 gap-x-2 flex-1 items-center"
					>
						<div className="flex items-center gap-1">
							<span className="text-muted">Nombre</span>
							<FormInput
								variant="secondary"
								name="firstname"
								value={newCompetitor.firstname}
								onChange={handleChange}
							/>
						</div>
						<div className="flex items-center gap-1">
							<span className="text-muted">Graduación</span>
							{/* <BeltIcon rank={competitorDraft.rank} />
							{getRankName(competitorDraft.rank)} */}
							{/* <RankSelect
								value={competitorDraft.rank}
								onChange={handleChange}
							/> */}
							<IconSelect
								name="rank"
								value={newCompetitor.rank}
								onChange={handleChange}
							/>
							{/* =????? */}
						</div>
						<div className="flex items-center gap-1">
							<span className="text-muted">Apellido</span>
							<FormInput
								variant="secondary"
								name="lastname"
								value={newCompetitor.lastname}
								onChange={handleChange}
							/>
						</div>
						<div className="flex items-center gap-1">
							<span className="text-muted">
								Fecha de Nacimiento
							</span>
							{/* <FormInput
								variant="secondary"
								name="dob"
								type="date"
								icon={<FaCalendarAlt />}
								value={competitorDraft.user.dob}
								onChange={handleChange}
							/> */}
							<Datepicker
								name="dob"
								value={newCompetitor.dob}
								onChange={handleChange}
							/>
						</div>
						<div className="flex items-center gap-1">
							<span className="text-muted">Email</span>
							<FormInput
								variant="secondary"
								name="email"
								value={newCompetitor.email}
								onChange={handleChange}
							/>
						</div>
						<div className="flex items-center gap-1">
							<span className="text-muted">DNI</span>
							<FormInput
								variant="secondary"
								name="id_number"
								value={newCompetitor.id_number}
								onChange={handleChange}
							/>
						</div>
						<div className="flex justify-end col-start-2 ">
							<Button type="submit">Crear competidor</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreateCompetitor;
