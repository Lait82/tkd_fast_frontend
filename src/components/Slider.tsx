import * as RadixSlider from "@radix-ui/react-slider";
import { TbArrowBadgeDownFilled } from "react-icons/tb";

interface SliderProps extends React.ComponentPropsWithoutRef<typeof RadixSlider.Root> {
    withValueLabels?: boolean;
}

const Slider = (props: SliderProps) => {
    const {withValueLabels, ...rest} = props;
  return (
    <div className="w-[calc(100%-calc(var(--spacing)*2))] mx-1 mt-1.5 mb-2">
        <RadixSlider.Root
            {...rest}
            className="relative flex w-full select-none items-center"
        >
        <RadixSlider.Track className="relative h-1 w-full rounded-full bg-super-elevated">
            <RadixSlider.Range className="absolute h-full rounded-full bg-muted" />
        </RadixSlider.Track>

            <RadixSlider.Thumb className="flex relative h-1px w-px rounded-full border-0 outline-0">
                <TbArrowBadgeDownFilled size={35} className="absolute bottom-full left-1/2 -translate-x-1/2 text-orange"/>
                {withValueLabels && <span className="absolute mt-1 top-full left-1/2 -translate-x-1/2 text-neutrallight font-bold text-xl"> {props.value?.[0] || props.defaultValue?.[0]}</span>}
            </RadixSlider.Thumb>
            <RadixSlider.Thumb className="flex relative h-1px w-px rounded-full border-0 outline-0">
                <TbArrowBadgeDownFilled size={35} className="absolute bottom-full left-1/2 -translate-x-1/2 text-orange"/>
                {withValueLabels && <span className="absolute mt-1 top-full left-1/2 -translate-x-1/2 text-neutrallight font-bold text-xl"> {props.value?.[1] || props.defaultValue?.[1]}</span>}
            </RadixSlider.Thumb>
        </RadixSlider.Root>
    </div>
  );
}
export default Slider;