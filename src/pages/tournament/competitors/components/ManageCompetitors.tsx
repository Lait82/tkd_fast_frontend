import EditCompetitor from "./EditCompetitor";
import CompetitorsList from "./CompetitorsList";
import CreateCompetitor from "./CreateCompetitor";
import { useManageCompetitors } from "./ManageCompetitorContext";
import { ManageCompetitorModes } from "@/types/enums";
import AvailableCategories from "./AvailableCategories";

const ManageCompetitors = () => {
	// const [loading, setLoading] = useState(false);
	// const [userCompetitors, setUserCompetitors] = useState<CompetitorSchema[]>(
	// 	[]
	// );
	// const [competitorDraft, setCompetitorDraft] = useState<CompetitorSchema>(
	// 	competitorSchema.parse({})
	// );
	const { mode } = useManageCompetitors();
	return (
		<>
			<div className="grid grid-cols-5 gap-2">
				<div className="col-span-3">
					{mode === ManageCompetitorModes.EDIT ? (
						<EditCompetitor />
					) : (
						<CreateCompetitor />
					)}
					<AvailableCategories />
				</div>
				<div className="col-span-2">
					<CompetitorsList />
				</div>
			</div>
		</>
	);
};

export default ManageCompetitors;
