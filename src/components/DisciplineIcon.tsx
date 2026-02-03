import { Discipline } from "@/types/enums";
import ParoJunbi from "./icons/ParoJunbi";
import ParoJunbiGroup from "./icons/ParoJunbiGroup";
import { RiBoxingFill } from "react-icons/ri";
import BoxingGloves from "./icons/BoxingGloves";

interface DisciplineIconProps {
    discipline: Discipline;
    isTeam?: boolean;
}

const DisciplineIcon: React.FC<DisciplineIconProps> = ({discipline, isTeam = false, ...props}) => {
    const _DisciplineIcon = () => {
        const iconsMap: Record<Discipline, JSX.Element> = {
            [Discipline.PATTERNS]: isTeam ? <ParoJunbiGroup/> : <ParoJunbi />,
            [Discipline.COMBAT]: isTeam ? <BoxingGloves /> : <RiBoxingFill size={32} />,
        }
        return iconsMap[discipline];
    }
    return (
        <_DisciplineIcon {...props} />
    )
}
export default DisciplineIcon;