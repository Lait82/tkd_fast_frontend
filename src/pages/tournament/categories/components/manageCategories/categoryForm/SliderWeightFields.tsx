import Slider from "@/components/Slider";

const SliderWeightFields = () => {
    return (<>
    <div className="grid grid-cols-3 gap-1">
        {[[20, 44.9], [40, 64.9], [60,84.9], [80, 104.9], [100, 130]].
        map((interval)=> {
            const [min, max] = interval
            const isActive = weightInterval.every((value, index) => value === interval[index]);

            return(
                <div className={`flex text-sm cursor-pointer justify-center transition all rounded-lg items-center border border-transparent p-1 ${isActive ? "bg-super-elevated border-orange" : "hover:border-orange"} `}
                    onClick={()=>{
                    setWeightInterval([min, max])
                    handleChange("min_weight", (min+6).toFixed(1));
                    handleChange("max_weight", (min+10).toFixed(1));
                }}>
                    {`${min} a ${max+0.1} Kgs`}
                </div>
            )
        })}
        <div className={`flex text-sm cursor-pointer justify-center transition all rounded-lg items-center border border-transparent p-1 ${true ? "bg-super-elevated border-orange" : "hover:border-orange"} `}>
            Ingreso manual
        </div>
        
    </div>
    <Slider 
        min={weightInterval[0]} 
        max={weightInterval[1]}
        value={[parseFloat(form.min_weight) || 40, parseFloat(form?.max_weight) || 130]}
        step={0.1}
        minStepsBetweenThumbs={0.1}
        onValueChange={(values) => {
            console.log("min_weight:")
            console.log(values[0])
            console.log("max_weight:")
            console.log(values[1])
            handleChange("min_weight", values[0].toFixed(1));
            handleChange("max_weight", values[1].toFixed(1));
        }}
    />
    <div className="flex gap-1 p-1">
        <div className="flex items-center text-muted gap-1">
            Desde <span className="text-neutrallight font-bold text-xl">{form?.min_weight}</span>
        </div>
        <div className="flex items-center text-muted gap-1">
            hasta <span className="text-neutrallight font-bold text-xl">{form?.max_weight}</span> Kgs
        </div>
    </div>
    </>)
}