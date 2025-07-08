// CompetitorContext.tsx
import { errorToast } from "@/services/toasts";
import { getAvailableCategories } from "@/services/tournamentService";
import { getUserCompetitors } from "@/services/userService";
import { useTournamentStore } from "@/states/useTournamentStore";
import { ManageCompetitorModes, Rank } from "@/types/enums";
import {
	CategorySchema,
	categorySchema,
	competitorSchema,
	CompetitorSchema,
} from "@/types/schemas/primitiveSchemas";
import React, {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import { z } from "zod/v4";

interface NewCompetitor {
	email: string;
	id_number: string;
	categories?: string[];
	firstname: string;
	lastname: string;
	dob: string;
	rank: Rank;
}

interface ManageCompetitorsContextType {
	competitorDraft: CompetitorSchema;
	setCompetitorDraft: (c: CompetitorSchema) => void;

	newCompetitor: NewCompetitor;
	setNewCompetitor: (c: NewCompetitor) => void;

	userCompetitors: CompetitorSchema[];
	setUserCompetitors: // (
	// 	c: CompetitorSchema[]
	// ) => void |
	React.Dispatch<React.SetStateAction<CompetitorSchema[]>>;

	mode: ManageCompetitorModes;
	setMode: (m: ManageCompetitorModes) => void;
	resetNewCompetitor: () => void;
	categories: CategorySchema[];
	setCompetitorCategoriesDraft: Dispatch<SetStateAction<string[]>>;
	competitorCategoriesDraft: string[];
}

const ManageCompetitorsContext = createContext<
	ManageCompetitorsContextType | undefined
>(undefined);

export const ManageCompetitorsProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const newCompetitorSchema = z.object({
		email: z.string().default(""),
		id_number: z.string().default(""),
		categories: z.array(z.uuid()).default([]),
		firstname: z.string().default(""),
		lastname: z.string().default(""),
		dob: z.string().default(""),
		rank: z.enum(Rank).default(Rank.WHITE),
	});

	const [newCompetitor, setNewCompetitor] = useState<NewCompetitor>(
		newCompetitorSchema.parse({})
	);
	const [mode, setMode] = useState<ManageCompetitorModes>(
		ManageCompetitorModes.CREATE
	);

	const [userCompetitors, setUserCompetitors] = useState<CompetitorSchema[]>(
		[]
	);
	const [categories, setCategories] = useState<CategorySchema[]>([]);
	const [competitorDraft, setCompetitorDraft] = useState<CompetitorSchema>(
		competitorSchema.parse({})
	);
	const [competitorCategoriesDraft, setCompetitorCategoriesDraft] = useState<
		string[]
	>([]);

	const resetNewCompetitor = () => {
		setNewCompetitor(newCompetitorSchema.parse({}));
	};

	const { tournament } = useTournamentStore();

	// Load user's competitors.
	useEffect(() => {
		let isMounted = true;
		const fetchCompetitors = async () => {
			try {
				const res = await getUserCompetitors(tournament.code);
				const competitors = competitorSchema.array().parse(res);
				if (isMounted) setUserCompetitors(competitors);
			} catch (error) {
				console.error("Error al obtener torneos:", error);
				errorToast(
					"Ha ocurrido un error al obtener los torneos, por favor recarga la página."
				);
			} finally {
				// if (isMounted) setLoading(false);
			}
		};

		fetchCompetitors();

		return () => {
			isMounted = false; // cleanup para evitar memory leaks
		};
	}, []);

	// Load Available categories state.
	useEffect(() => {
		let isMounted = true;
		const fetchCategories = async () => {
			try {
				// API fetch
				const res = await getAvailableCategories(tournament.code);
				const availableCategories = categorySchema.array().parse(res);
				if (isMounted) setCategories(availableCategories);
				console.log(availableCategories);
				// setLoading(false);
			} catch (error) {
				errorToast(
					"Ha ocurrido un error al obtener las categorías disponibles, por favor recarga la página."
				);
			}
			//  finally {
			// 	if (isMounted) setLoading(false);
			// }
		};

		fetchCategories();

		return () => {
			isMounted = false; // cleanup para evitar memory leaks
		};
	}, [competitorDraft]);

	return (
		<ManageCompetitorsContext.Provider
			value={{
				competitorDraft,
				setCompetitorDraft,
				mode,
				setMode,
				newCompetitor,
				setNewCompetitor,
				userCompetitors,
				setUserCompetitors,
				resetNewCompetitor,
				categories,
				setCompetitorCategoriesDraft,
				competitorCategoriesDraft,
			}}
		>
			{children}
		</ManageCompetitorsContext.Provider>
	);
};

export const useManageCompetitors = () => {
	const context = useContext(ManageCompetitorsContext);
	if (!context)
		throw new Error(
			"useCompetitor must be used within a ManageCompetitorsProvider"
		);
	return context;
};
