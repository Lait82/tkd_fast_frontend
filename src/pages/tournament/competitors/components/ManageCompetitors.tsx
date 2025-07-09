import EditCompetitor from "./EditCompetitor";
import CompetitorsList from "./CompetitorsList";
import CreateCompetitor from "./CreateCompetitor";
import { useManageCompetitors } from "./ManageCompetitorContext";
import { ManageCompetitorModes } from "@/types/enums";
import AvailableCategories from "./AvailableCategories";
import { useLayoutEffect, useRef, useState } from "react";

const ManageCompetitors = () => {
	const leftRef = useRef<HTMLDivElement>(null);
	const [leftHeight, setLeftHeight] = useState<number>(0);
	const { categories } = useManageCompetitors();

	useLayoutEffect(() => {
		if (!leftRef.current) return;

		const observer = new ResizeObserver((entries) => {
			for (let entry of entries) {
				setLeftHeight(entry.contentBoxSize[0].blockSize);
			}
		});

		observer.observe(leftRef.current);

		return () => observer.disconnect();
	}, [categories]);
	const { mode } = useManageCompetitors();
	return (
		<>
			<div className="grid grid-cols-5 gap-2">
				<div className="flex flex-col col-span-3 gap-2" ref={leftRef}>
					{mode === ManageCompetitorModes.EDIT ? (
						<EditCompetitor />
					) : (
						<CreateCompetitor />
					)}
					<AvailableCategories />
				</div>
				<div className="col-span-2">
					<CompetitorsList maxHeight={leftHeight} />
				</div>
			</div>
		</>
	);
};

export default ManageCompetitors;
