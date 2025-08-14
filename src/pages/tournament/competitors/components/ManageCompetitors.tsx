import EditCompetitor from "./EditCompetitor/EditCompetitor";
import CompetitorsList from "./CompetitorsList";
import CreateCompetitor from "./CreateCompetitor";
import { useManageCompetitors } from "./ManageCompetitorContext";
import { ManageCompetitorModes, ManageCompetitorTypes } from "@/types/enums";
import AvailableCategories from "./AvailableCategories";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import CreateTeam from "./CreateTeam";
import EditTeam from "./EditTeam/EditTeam";

const ManageCompetitors = () => {
    const leftRef = useRef<HTMLDivElement>(null);
    const [leftHeight, setLeftHeight] = useState<number>(0);
    const {
        categories,
        mode,
        manageType,
        competitorDraft,
        teamDraft,
        selectedMembers,
    } = useManageCompetitors();

    useLayoutEffect(() => {
        if (!leftRef.current) return;
        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setLeftHeight(entry.contentBoxSize[0].blockSize);
            }
        });

        observer.observe(leftRef.current);

        return () => observer.disconnect();
    }, [categories, selectedMembers]);

    const mainComponentMap = {
        [ManageCompetitorTypes.COMPETITOR]: {
            [ManageCompetitorModes.CREATE]: CreateCompetitor,
            [ManageCompetitorModes.EDIT]: EditCompetitor,
        },
        [ManageCompetitorTypes.TEAM]: {
            [ManageCompetitorModes.CREATE]: CreateTeam,
            [ManageCompetitorModes.EDIT]: EditTeam,
        },
    };

    const MainComponent = mainComponentMap[manageType]?.[mode] ?? (
        <span>Ha ocurrido un error, por favor recarga la pagina.</span>
    );

    // (
    //     mode: ManageCompetitorModes,
    //     manageType: ManageCompetitorTypes
    // ) => {
    //     if (manageType === ManageCompetitorTypes.COMPETITOR) {
    //         return mode === ManageCompetitorModes.CREATE ? (
    //             <CreateCompetitor />
    //         ) : (
    //             <EditCompetitor />
    //         );
    //     }
    //     if (manageType === ManageCompetitorTypes.TEAM) {
    //         return mode === ManageCompetitorModes.CREATE ? (
    //             <CreateTeam />
    //         ) : (
    //             <EditTeam />
    //         );
    //     }
    // };

    let showAvailableCategories = true;
    useEffect(() => {
        if (manageType === ManageCompetitorTypes.COMPETITOR) {
            if (mode === ManageCompetitorModes.EDIT) {
                if (!competitorDraft.uuid) {
                    showAvailableCategories = false;
                }
            }
        }
        if (manageType === ManageCompetitorTypes.TEAM) {
            if (mode === ManageCompetitorModes.EDIT) {
                if (!teamDraft.uuid) {
                    showAvailableCategories = false;
                }
            }
        }
    }, []);
    return (
        <>
            <div className="grid grid-cols-5 gap-2">
                <div className="flex flex-col col-span-3 gap-2" ref={leftRef}>
                    <MainComponent />
                    {showAvailableCategories && <AvailableCategories />}
                </div>
                <div className="col-span-2">
                    <CompetitorsList maxHeight={leftHeight} />
                </div>
            </div>
        </>
    );
};

export default ManageCompetitors;
