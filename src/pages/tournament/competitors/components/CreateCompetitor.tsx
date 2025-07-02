import BeltIcon from "@/components/BeltIcon";
import Datepicker from "@/components/Datepicker";
import FormInput from "@/components/forms/FormInput";
import IconSelect from "@/components/IconSelect";
import RankSelect from "@/components/RankSelect";
import { Rank } from "@/types/enums";
import { getRankName } from "@/utils/utils";
import dayjs from "dayjs";
import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";

const CreateCompetitor = () => {
	interface NewCompetitor {
		email: string;
		id_number: string;
		categories?: string[];
		firstname: string;
		lastname: string;
		dob: string;
		rank: Rank;
	}

	const [newCompetitor, setNewCompetitor] = useState<NewCompetitor>({
		email: "registraciones98+26@gmail.com",
		id_number: "30456588",
		categories: ["69ce46da-7f9b-4074-9e98-5d5cd0d5c020"],
		firstname: "Iñaki",
		lastname: "the posit",
		dob: "08-02-1998",
		rank: Rank.BLUE_RED,
	});

	const handleChange = () => {};
	return (
		<div className="bg-elevated flex flex-col gap-2 shadow-lg justify-center create-tournament-card p-3 rounded-lg">
			<div className="flex flex-col gap-3">
				<h1 className="font-extrabold text-2xl">
					Información Personal
				</h1>
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
					<div className="grid grid-cols-2 gap-2 flex-1 items-center">
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
							{/* <BeltIcon rank={newCompetitor.rank} />
							{getRankName(newCompetitor.rank)} */}
							{/* <RankSelect
								value={newCompetitor.rank}
								onChange={handleChange}
							/> */}
							<IconSelect />
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
								value={newCompetitor.dob}
								onChange={handleChange}
							/> */}
							<Datepicker />
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
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateCompetitor;
