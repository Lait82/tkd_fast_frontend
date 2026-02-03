import { Discipline } from "@/types/enums"
import DisciplineIcon from "./DisciplineIcon"

const DisciplineBadge = ({ discipline, isTeam }: { discipline: Discipline, isTeam: boolean }) => {
    const disciplineNames: Record<Discipline, string> = {
        [Discipline.PATTERNS]: isTeam ? "Formas por equipo" : "Formas individual",
        [Discipline.COMBAT]: isTeam ? "Lucha por equipo" : "Lucha individual",
    }
    return (
        <div className={`flex gap-1 p-1.5 ${discipline === Discipline.PATTERNS && !isTeam && "pr-2"} items-center bg-super-elevated rounded-lg max-w-fit`}>
            <DisciplineIcon discipline={discipline} isTeam={isTeam} />
            <span className="">{disciplineNames[discipline]}</span>
        </div>
    )
}

export default DisciplineBadge