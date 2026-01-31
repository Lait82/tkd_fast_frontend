import { IconOption } from "@/components/forms/IconSelect";
import BeltIcon from "@/components/icons/BeltIcon";
import BoxingGloves from "@/components/icons/BoxingGloves";
import ParoJunbi from "@/components/icons/ParoJunbi";
import ParoJunbiGroup from "@/components/icons/ParoJunbiGroup";
import { Rank } from "@/types/enums";
import { getRankName } from "@/utils/utils";
import { RiBoxingFill } from "react-icons/ri";


export const DISCIPLINE_OPTIONS : IconOption[] = [
    {
        value: "PATTERNS", 
        label: "Formas",
        icon: <ParoJunbi />
    },
    {
        value: "COMBAT", 
        label: "Lucha",
        icon: <RiBoxingFill size={32} />
    },
];

export const DISCIPLINE_TEAM_OPTIONS : IconOption[] = [
    {
        value: "PATTERNS", 
        label: "Formas por equipo",
        icon: <ParoJunbiGroup />
    },
    {
        value: "COMBAT", 
        label: "Lucha por equipos",
        icon: <BoxingGloves />
    },
];


export const ALL_RANKS_OPTIONS : IconOption[] = Object.values(Rank).map((rank) => ({
    value: rank,
    label: getRankName(rank),
    icon: <BeltIcon size={20} rank={rank} />,
}));