import {
    CategorySchema,
    competitorSchema,
} from "@/types/schemas/primitiveSchemas";
import { useEffect, useState } from "react";
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
import { errorToast, successToast } from "@/services/toasts";
import { enrollCompetitor } from "@/services/tournamentService";
import { useTournamentStore } from "@/states/useTournamentStore";
import UnavailableCategory from "./UnavailableCategory";

interface CategoryWithStatus {
    status: CategoryStatus;
    category: CategorySchema;
}

const AvailableCategories = () => {
    const { tournament } = useTournamentStore();
    const [loading, setLoading] = useState<boolean>(true);
    const {
        competitorDraft,
        categories,
        selectedCategories,
        setCompetitorDraft,
        setSelectedCategories,
        mode,
        manageType,
    } = useManageCompetitors();
    const [enrolledCategories, setEnrolledCategories] = useState<
        CategoryWithStatus[]
    >([]);
    const [enrollableCategories, setEnrollableCategories] = useState<
        CategoryWithStatus[]
    >([]);
    const [unavailableCategories, setUnavailableCategories] = useState<
        CategoryWithStatus[]
    >([]);
    useEffect(() => {
        let isMounted = true;

        const enrolledCategoriesPayload: CategoryWithStatus[] = [];
        const enrollableCategoriesPayload: CategoryWithStatus[] = [];
        const unavailableCategoriesPayload: CategoryWithStatus[] = [];

        categories.forEach((category: CategorySchema) => {
            if (
                // el type es comp y la category es de equipo => unavailable |||| lo mismo para el caso opuesto
                (manageType === ManageCompetitorTypes.COMPETITOR &&
                    category.is_team) ||
                (manageType === ManageCompetitorTypes.TEAM && !category.is_team)
            ) {
                unavailableCategoriesPayload.push({
                    status: CategoryStatus.UNAVAILABLE,
                    category: category,
                });
                return;
            }
            const isEnrolled = competitorDraft.inscriptions.some(
                (compInscription) =>
                    compInscription.category_uuid === category.uuid
            );

            const arr = isEnrolled
                ? enrolledCategoriesPayload
                : enrollableCategoriesPayload;

            arr.push({
                status: isEnrolled
                    ? CategoryStatus.ENROLLED
                    : CategoryStatus.ENROLLABLE,
                category: category,
            });
        });

        if (isMounted) {
            setEnrolledCategories(enrolledCategoriesPayload);
            setEnrollableCategories(enrollableCategoriesPayload);
            setUnavailableCategories(unavailableCategoriesPayload);
        }

        setLoading(false);

        return () => {
            isMounted = false; // cleanup para evitar memory leaks
        };
    }, [competitorDraft, categories, manageType]);

    const enroll = async () => {
        try {
            setLoading(true);
            // TODO: Agregar accion de agregar miembros al equipo
            const payload = {
                competitor_uuid: competitorDraft.uuid,
                categories: selectedCategories,
            };
            const res = await enrollCompetitor(tournament.code, payload);

            const competitorDraftResponse = competitorSchema.parse(res);

            setCompetitorDraft(competitorDraftResponse);

            // Clear de las categorias seleccionadas
            setSelectedCategories([]);
            successToast(`Competidor inscripto exitosamente.`);
        } catch (error) {
            console.error(error);
            errorToast(
                "Ha ocurrido un error al inscribir el competidor a las categorías seleccionadas. Por favor intenta nuevamente."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        // <div className="bg-elevated flex flex-col gap-2 shadow-lg justify-center p-3 rounded-lg">
        <div className="col-span-3 col-start-1 row-start-2 bg-elevated flex flex-col gap-2 shadow-lg justify-center p-3 rounded-lg">
            <div className="flex flex-col gap-3">
                <h1 className="font-extrabold flex items-center gap-1 text-2xl">
                    <BiCategoryAlt /> Categorías / Inscripciones
                </h1>
            </div>
            <div className="flex flex-col gap-0.5">
                {loading && !categories.length ? (
                    <span>Cargando categorias</span>
                ) : (
                    // Already Enrolled
                    [
                        ...enrolledCategories,
                        ...enrollableCategories,
                        ...unavailableCategories,
                    ].map((categoryWithStatus: CategoryWithStatus, i) => {
                        switch (categoryWithStatus.status) {
                            case CategoryStatus.ENROLLABLE:
                                return (
                                    <EnrollableCategory
                                        key={`${i}-enrollable`}
                                        category={categoryWithStatus.category}
                                    />
                                );
                            case CategoryStatus.ENROLLED:
                                return (
                                    <EnrolledCategory
                                        key={`${i}-enrolled`}
                                        category={categoryWithStatus.category}
                                    />
                                );
                            case CategoryStatus.UNAVAILABLE:
                                return (
                                    <UnavailableCategory
                                        key={`${i}-unavailable`}
                                        category={categoryWithStatus.category}
                                    />
                                );
                        }
                    })
                )}
                {mode === ManageCompetitorModes.EDIT && (
                    <div className="w-full flex justify-end mt-2">
                        <Button
                            disabled={!competitorDraft.id}
                            loading={loading}
                            onClick={() => {
                                enroll();
                            }}
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
