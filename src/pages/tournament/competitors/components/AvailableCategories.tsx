// import {
//     CategorySchema,
//     competitorSchema,
//     teamSchema,
// } from "@/types/schemas/primitiveSchemas";
// import { useEffect, useState } from "react";
// import { useManageCompetitors } from "./ManageCompetitorContext";
// import { BiCategoryAlt } from "react-icons/bi";
// import Button from "@/components/Button";
// import {
//     CategoryStatus,
//     ManageCompetitorModes,
//     ManageCompetitorTypes,
// } from "@/types/enums";
// import EnrollableCategory from "./EnrollableCategory";
// import EnrolledCategory from "./EnrolledCategory";
// import { errorToast, successToast } from "@/services/toasts";
// import { enrollCompetitor } from "@/services/tournamentService";
// import { useTournamentStore } from "@/states/useTournamentStore";
// import UnavailableCategory from "./UnavailableCategory";
// import { enrollTeam } from "@/services/teamService";

// interface CategoryWithStatus {
//     status: CategoryStatus;
//     category: CategorySchema;
// }

// const AvailableCategories = () => {
//     const { tournament } = useTournamentStore();
//     const [loading, setLoading] = useState<boolean>(true);
//     const {
//         competitorDraft,
//         teamDraft,
//         categories,
//         selectedCategories,
//         setCompetitorDraft,
//         setSelectedCategories,
//         mode,
//         manageType,
//         updateCompetitors,
//         updateTeams,
//     } = useManageCompetitors();
//     const [enrolledCategories, setEnrolledCategories] = useState<
//         CategoryWithStatus[]
//     >([]);
//     const [enrollableCategories, setEnrollableCategories] = useState<
//         CategoryWithStatus[]
//     >([]);
//     const [unavailableCategories, setUnavailableCategories] = useState<
//         CategoryWithStatus[]
//     >([]);
//     useEffect(() => {
//         // let isMounted = true;

//         const enrolledCategoriesPayload: CategoryWithStatus[] = [];
//         const enrollableCategoriesPayload: CategoryWithStatus[] = [];
//         const unavailableCategoriesPayload: CategoryWithStatus[] = [];

//         categories.forEach((category: CategorySchema) => {
//             // Unavailable Category filter
//             if (
//                 (manageType === ManageCompetitorTypes.COMPETITOR &&
//                     category.is_team) ||
//                 (manageType === ManageCompetitorTypes.TEAM && !category.is_team)
//             ) {
//                 unavailableCategoriesPayload.push({
//                     status: CategoryStatus.UNAVAILABLE,
//                     category: category,
//                 });
//                 return;
//             }

//             // Check del rollment status del draft.
//             let isDraftEnrolled = false;
//             if (manageType === ManageCompetitorTypes.COMPETITOR) {
//                 isDraftEnrolled = competitorDraft.inscriptions.some(
//                     (compInscription) =>
//                         compInscription.category_uuid === category.uuid
//                 );
//             } else if (manageType === ManageCompetitorTypes.TEAM) {
//                 isDraftEnrolled = teamDraft.inscriptions.includes(
//                     category.uuid
//                 );
//             }

//             const arr = isDraftEnrolled
//                 ? enrolledCategoriesPayload
//                 : enrollableCategoriesPayload;

//             arr.push({
//                 status: isDraftEnrolled
//                     ? CategoryStatus.ENROLLED
//                     : CategoryStatus.ENROLLABLE,
//                 category: category,
//             });
//         });

//         setEnrolledCategories(enrolledCategoriesPayload);
//         setEnrollableCategories(enrollableCategoriesPayload);
//         setUnavailableCategories(unavailableCategoriesPayload);

//         setLoading(false);
//     }, [competitorDraft, teamDraft, categories, manageType]);

//     const enrollTeamProcedure = async () => {
//         const payload = {
//             categories: selectedCategories,
//         };
//         const res = await enrollTeam(teamDraft.uuid, payload);

//         const updatedTeam = teamSchema.parse(res);

//         // Clear de las categorias seleccionadas
//         updateTeams(updatedTeam);

//         setSelectedCategories([]);
//         successToast(`Equipo inscripto exitosamente.`);
//     };

//     const enrollCompetitorProcedure = async () => {
//         const payload = {
//             competitor_uuid: competitorDraft.uuid,
//             categories: selectedCategories,
//         };
//         const res = await enrollCompetitor(tournament.code, payload);

//         const updatedCompetitor = competitorSchema.parse(res);

//         updateCompetitors(updatedCompetitor);
//         setSelectedCategories([]);

//         successToast(`Competidor inscripto exitosamente.`);
//     };

//     const enroll = async () => {
//         try {
//             setLoading(true);

//             if (manageType === ManageCompetitorTypes.COMPETITOR) {
//                 await enrollCompetitorProcedure();
//             }
//             if (manageType === ManageCompetitorTypes.TEAM) {
//                 await enrollTeamProcedure();
//             }
//         } catch (error) {
//             const enrollable =
//                 manageType === ManageCompetitorTypes.TEAM
//                     ? "equipo"
//                     : "competidor";
//             errorToast(
//                 `Ha ocurrido un error al inscribir el ${enrollable} a las categorías seleccionadas. Por favor intenta nuevamente.`
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         // <div className="bg-elevated flex flex-col gap-2 shadow-lg justify-center p-3 rounded-lg">
//         <div className="col-span-3 col-start-1 row-start-2 bg-elevated flex flex-col gap-2 shadow-lg justify-center p-3 rounded-lg">
//             <div className="flex flex-col gap-3">
//                 <h1 className="font-extrabold flex items-center gap-1 text-2xl">
//                     <BiCategoryAlt /> Categorías / Inscripciones
//                 </h1>
//             </div>
//             <div className="flex flex-col gap-0.5">
//                 {loading && !categories.length ? (
//                     <span>Cargando categorias</span>
//                 ) : (
//                     // Already Enrolled
//                     [
//                         ...enrolledCategories,
//                         ...enrollableCategories,
//                         ...unavailableCategories,
//                     ].map((categoryWithStatus: CategoryWithStatus, i) => {
//                         switch (categoryWithStatus.status) {
//                             case CategoryStatus.ENROLLABLE:
//                                 return (
//                                     <EnrollableCategory
//                                         key={`${i}-enrollable`}
//                                         category={categoryWithStatus.category}
//                                     />
//                                 );
//                             case CategoryStatus.ENROLLED:
//                                 return (
//                                     <EnrolledCategory
//                                         key={`${i}-enrolled`}
//                                         category={categoryWithStatus.category}
//                                     />
//                                 );
//                             case CategoryStatus.UNAVAILABLE:
//                                 return (
//                                     <UnavailableCategory
//                                         key={`${i}-unavailable`}
//                                         category={categoryWithStatus.category}
//                                     />
//                                 );
//                         }
//                     })
//                 )}
//                 {mode === ManageCompetitorModes.EDIT && (
//                     <div className="w-full flex justify-end mt-2">
//                         <Button
//                             disabled={
//                                 !!selectedCategories.length &&
//                                 manageType === ManageCompetitorTypes.COMPETITOR
//                                     ? !competitorDraft.id
//                                     : !teamDraft.uuid
//                             }
//                             loading={loading}
//                             onClick={() => {
//                                 enroll();
//                             }}
//                         >
//                             Inscribir
//                         </Button>
//                     </div>
//                 )}
//                 {mode === ManageCompetitorModes.CREATE &&
//                     manageType === ManageCompetitorTypes.COMPETITOR && (
//                         <div className="w-full flex justify-end mt-2">
//                             <Button form="create-competitor-form" type="submit">
//                                 Crear competidor
//                             </Button>
//                         </div>
//                     )}
//                 {mode === ManageCompetitorModes.CREATE &&
//                     manageType === ManageCompetitorTypes.TEAM && (
//                         <div className="w-full flex justify-end mt-2">
//                             <Button form="create-team-form" type="submit">
//                                 Crear equipo
//                             </Button>
//                         </div>
//                     )}
//             </div>
//         </div>
//     );
// };

// export default AvailableCategories;

// Nota de accion, mergear estos dos approaches, el usememo con el anterior y ver por que cuando pasas de un draft team con una inscripcion a un create team se sigue manteniendo la lista de categorias/inscripciones como si fuera la del draft.

import {
    CategorySchema,
    competitorSchema,
    teamSchema,
} from "@/types/schemas/primitiveSchemas";
import { useMemo, useState, useCallback } from "react";
import { useManageCompetitors } from "./ManageCompetitorContext";
import { BiCategoryAlt } from "react-icons/bi";
import Button from "@/components/Button";
import {
    CategoryStatus,
    ManageCompetitorModes,
    ManageCompetitorTypes,
} from "@/types/enums";
import EnrollableCategory from "./EnrollableCategory";
import EnrolledCategory from "./EnrolledCategory";
import UnavailableCategory from "./UnavailableCategory";
import { errorToast, successToast } from "@/services/toasts";
import { enrollCompetitor } from "@/services/tournamentService";
import { useTournamentStore } from "@/states/useTournamentStore";
import { enrollTeam } from "@/services/teamService";

interface CategoryWithStatus {
    status: CategoryStatus;
    category: CategorySchema;
}

const AvailableCategories = () => {
    const { tournament } = useTournamentStore();
    const [loading, setLoading] = useState(false);

    const {
        competitorDraft,
        teamDraft,
        categories,
        selectedCategories,
        setSelectedCategories,
        mode,
        manageType,
        updateCompetitors,
        updateTeams,
    } = useManageCompetitors();

    // Derivar categorías por estado (sin efectos, sin estados extra)
    const categorized = useMemo(() => {
        const enrolled: CategoryWithStatus[] = [];
        const enrollable: CategoryWithStatus[] = [];
        const unavailable: CategoryWithStatus[] = [];

        for (const category of categories) {
            // Filtro por tipo (TEAM vs COMPETITOR)
            const wrongType =
                (manageType === ManageCompetitorTypes.COMPETITOR &&
                    category.is_team) ||
                (manageType === ManageCompetitorTypes.TEAM &&
                    !category.is_team);

            if (wrongType) {
                unavailable.push({
                    status: CategoryStatus.UNAVAILABLE,
                    category,
                });
                continue;
            }

            // ¿Ya está inscripto el draft?
            let isDraftEnrolled = false;
            if (manageType === ManageCompetitorTypes.COMPETITOR) {
                isDraftEnrolled = competitorDraft.inscriptions.some(
                    (ins) => ins.category_uuid === category.uuid
                );
            } else {
                isDraftEnrolled = teamDraft.inscriptions.includes(
                    category.uuid
                );
            }

            (isDraftEnrolled ? enrolled : enrollable).push({
                status: isDraftEnrolled
                    ? CategoryStatus.ENROLLED
                    : CategoryStatus.ENROLLABLE,
                category,
            });
        }

        // Mantengo el orden: enrolled → enrollable → unavailable
        return [...enrolled, ...enrollable, ...unavailable];
    }, [
        categories,
        manageType,
        competitorDraft.inscriptions,
        teamDraft.inscriptions,
    ]);

    const enrollTeamProcedure = useCallback(async () => {
        const payload = { categories: selectedCategories };
        const res = await enrollTeam(teamDraft.uuid, payload);
        const updatedTeam = teamSchema.parse(res);
        updateTeams(updatedTeam);
        setSelectedCategories([]);
        successToast(`Equipo inscripto exitosamente.`);
    }, [
        selectedCategories,
        teamDraft.uuid,
        updateTeams,
        setSelectedCategories,
    ]);

    const enrollCompetitorProcedure = useCallback(async () => {
        const payload = {
            competitor_uuid: competitorDraft.uuid,
            categories: selectedCategories,
        };
        const res = await enrollCompetitor(tournament.code, payload);
        const updatedCompetitor = competitorSchema.parse(res);
        updateCompetitors(updatedCompetitor);
        setSelectedCategories([]);
        successToast(`Competidor inscripto exitosamente.`);
    }, [
        competitorDraft.uuid,
        selectedCategories,
        tournament.code,
        updateCompetitors,
        setSelectedCategories,
    ]);

    const enroll = useCallback(async () => {
        try {
            setLoading(true);
            if (manageType === ManageCompetitorTypes.COMPETITOR) {
                await enrollCompetitorProcedure();
            } else {
                await enrollTeamProcedure();
            }
        } catch {
            const enrollable =
                manageType === ManageCompetitorTypes.TEAM
                    ? "equipo"
                    : "competidor";
            errorToast(
                `Ha ocurrido un error al inscribir el ${enrollable} a las categorías seleccionadas. Por favor intenta nuevamente.`
            );
        } finally {
            setLoading(false);
        }
    }, [manageType, enrollCompetitorProcedure, enrollTeamProcedure]);

    const actionDisabled =
        !!selectedCategories.length &&
        manageType === ManageCompetitorTypes.COMPETITOR
            ? !competitorDraft.id
            : !teamDraft.uuid;

    return (
        <div className="col-span-3 col-start-1 row-start-2 bg-elevated flex flex-col gap-2 shadow-lg justify-center p-3 rounded-lg">
            <div className="flex flex-col gap-3">
                <h1 className="font-extrabold flex items-center gap-1 text-2xl">
                    <BiCategoryAlt /> Categorías / Inscripciones
                </h1>
            </div>

            <div className="flex flex-col gap-0.5">
                {!categories.length ? (
                    <span>Cargando categorías</span>
                ) : (
                    categorized.map(({ status, category }) => {
                        const key = `${category.uuid}-${status}`;
                        switch (status) {
                            case CategoryStatus.ENROLLABLE:
                                return (
                                    <EnrollableCategory
                                        key={key}
                                        category={category}
                                    />
                                );
                            case CategoryStatus.ENROLLED:
                                return (
                                    <EnrolledCategory
                                        key={key}
                                        category={category}
                                    />
                                );
                            case CategoryStatus.UNAVAILABLE:
                                return (
                                    <UnavailableCategory
                                        key={key}
                                        category={category}
                                    />
                                );
                        }
                    })
                )}

                {mode === ManageCompetitorModes.EDIT && (
                    <div className="w-full flex justify-end mt-2">
                        <Button
                            disabled={actionDisabled}
                            loading={loading}
                            onClick={enroll}
                        >
                            Inscribir
                        </Button>
                    </div>
                )}

                {mode === ManageCompetitorModes.CREATE &&
                    manageType === ManageCompetitorTypes.COMPETITOR && (
                        <div className="w-full flex justify-end mt-2">
                            <Button form="create-competitor-form" type="submit">
                                Crear competidor
                            </Button>
                        </div>
                    )}

                {mode === ManageCompetitorModes.CREATE &&
                    manageType === ManageCompetitorTypes.TEAM && (
                        <div className="w-full flex justify-end mt-2">
                            <Button form="create-team-form" type="submit">
                                Crear equipo
                            </Button>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default AvailableCategories;
