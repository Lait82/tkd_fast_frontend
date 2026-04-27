import { getGenderLabel } from "@/utils/utils";
import { useManageCategories } from "./ManageCategoryContext";
import { Discipline, Gender, ManageModes, Rank } from "@/types/enums";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import { useEffect, useMemo, useState } from "react";
import { TbCategoryPlus, TbGenderFemale, TbGenderMale } from "react-icons/tb";
// import IconSelect from "@/components/IconSelect";
import {IconSelect as FormIconSelect} from "@/components/forms/IconSelect";
import { ALL_RANKS_OPTIONS, DISCIPLINE_OPTIONS, DISCIPLINE_TEAM_OPTIONS } from "@/constants/selectOptions";
import { categorySchema, NewCategorySchema, newCategorySchema } from "@/types/schemas/primitiveSchemas";
import { errorToast, successToast } from "@/services/toasts";
import { createCategory } from "@/services/categoryService";
import { useTournamentStore } from "@/states/useTournamentStore";
import Checkbox from "@/components/forms/Checkbox";
import FormInput from "@/components/forms/FormInput";
import Button from "@/components/Button";
import { ZodSafeParseResult } from "zod/v4";
import Slider from "@/components/Slider";
import { Edit } from "lucide-react";
import EditModal from "./EditModal";
import { CategoryModalTypes } from "../../types";

interface CreateCategoryFormT {
    discipline: Discipline,
    is_team: boolean,
    min_rank: Rank,
    max_rank: Rank,
    min_weight: string,
    max_weight: string,
    min_age: string,
    max_age: string,
    gender: Gender
}

type Errors = Partial<Record<keyof CreateCategoryFormT, string>>;

const CreateCategoryForm = ({}) => {
    const { selectedCategory, manageMode, setManageMode, setSelectedCategory, launchCategoryUpdate, openModal } = useManageCategories();
    const formObject: CreateCategoryFormT = {
        discipline: selectedCategory?.discipline || Discipline.COMBAT,
        is_team: selectedCategory?.is_team || false,
        min_rank: selectedCategory?.min_rank || Rank.WHITE,
        max_rank: selectedCategory?.max_rank || Rank.DAN_9,
        min_weight: selectedCategory?.min_weight?.toString() || "",
        max_weight: selectedCategory?.max_weight?.toString() || "",
        min_age: selectedCategory?.min_age.toString() || "3",
        max_age: selectedCategory?.max_age.toString() || "70",
        gender: selectedCategory?.gender || Gender.FEMALE,
    };
    
    const { tournament } = useTournamentStore();
    const [form, setForm] = useState<CreateCategoryFormT>(formObject);
    const [hasInteracted, setHasInteracted] = useState<boolean>(false)
    
	const [formErrors, setFormErrors] = useState<Errors>({});
    
    // Submit buttons behaviors
    const isWeightAndAgeComplete =
    [form.min_weight, form.max_weight, form.min_age, form.max_age]
        .every((val) => val !== "");
    const zodResult = useMemo(
        () => newCategorySchema.safeParse(form),
        [form]
    );
    const isFormValid = zodResult.success
    const enableButton = hasInteracted ? (isWeightAndAgeComplete && isFormValid) : false;

    // Succesful submission behavior
    useEffect(() => {
    if (manageMode === ManageModes.VIEW) {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    }, [manageMode]);

    const handleChange = (field_name: string, value: any) => {
        if(!hasInteracted)setHasInteracted(true)
        if (formErrors  && formErrors[field_name as keyof CreateCategoryFormT]) {
            const newFormErrors = {...formErrors};
            delete newFormErrors[field_name as keyof CreateCategoryFormT];
            setFormErrors(newFormErrors);
        }
        setForm((prev) => ({
            ...prev,
            [field_name]: value,
        }));
    }
    
    const validateForm = () => {
        const parsingResult = newCategorySchema.safeParse({
                ...form,
            });
        if (!parsingResult.success) {
            const fieldErrors: Errors = {};
            parsingResult.error.issues.forEach((issue) => {
                const key = issue.path[0] as keyof CreateCategoryFormT;
                fieldErrors[key] = issue.message;
            });
            setFormErrors(fieldErrors);
            return false
        }
        setFormErrors({})
        return parsingResult
    }

    const handleCreateSubmit = async (validationFormResult: ZodSafeParseResult<NewCategorySchema>) => {
        const res = await createCategory(
            tournament.code,
            validationFormResult.data
        );
        const newCategory = categorySchema.parse(res)
        successToast("Categoría actualizada con exito");
        // Side Effects de la creación
        setSelectedCategory(newCategory)
        setManageMode(ManageModes.VIEW)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            console.log(e)
            // Parseo el form
            const parsingResult = validateForm();
            if (!parsingResult)
                {
                errorToast("Revisá los campos");
                return
            }
            
            if(manageMode === ManageModes.CREATE) handleCreateSubmit(parsingResult);
            launchCategoryUpdate()
            setManageMode(ManageModes.VIEW)
        } catch (err: any) {
            errorToast(err.message);
            // setError(err.message || "Error al editar el torneo")
        } finally {
            // setLoading(false)
        }
    };
    return (
        <div className="flex flex-col gap-2">            
            <EditModal />
            <h1 className="flex gap-1 font-extrabold text-2xl">{manageMode === ManageModes.CREATE && <><TbCategoryPlus />Crear categoria </>}{manageMode === ManageModes.EDIT && <><Edit/>Editar categoria</>}</h1> 
            
            <form id="edit-category-form" onSubmit={handleSubmit}>

                {/* <span className="col-start-2 text-xs text-red">{formErrors?.min_rank && formErrors.min_rank}</span> */}
                <h3 className="font-bold text-lg">Género</h3>
                <RadioGroup className={`flex w-full gap-2 p-2 justify-between font-semibold`} name="gender" value={form.gender} onChange={(gender)=> {
                    handleChange("gender", gender)
                }}>  
                    <Radio
                        value={Gender.MALE}
                        className="group w-full flex items-center justify-center cursor-pointer rounded-lg p-1.5 transition focus:not-data-focus:outline-none data-checked:bg-super-elevated data-focus:outline data-focus:outline-orange-900 border border-transparent hover:border-orange data-checked:hover:border-transparent"
                        >
                        <TbGenderMale className="size-3 transition group-data-checked:text-orange" />
                        <span>{getGenderLabel(Gender.MALE)}</span>
                    </Radio>
                    <Radio
                        value={Gender.FEMALE}
                        className="group w-full flex items-center justify-center cursor-pointer rounded-lg p-1.5 transition focus:not-data-focus:outline-none data-checked:bg-super-elevated data-focus:outline data-focus:outline-orange-900 border border-transparent hover:border-orange data-checked:hover:border-transparent"
                    >
                        <TbGenderFemale className="size-3 transition group-data-checked:text-orange" />
                        <span>{getGenderLabel(Gender.FEMALE)}</span>
                    </Radio>
                </RadioGroup>
                <div className="flex flex-col">
                    {/* <span className="col-start-2 text-xs text-red">{formErrors?.min_rank && formErrors.min_rank}</span> */}
                    <h3 className="font-bold text-lg">Disciplina</h3>
                    <div className="flex flex-col gap-1 p-2 items-baseline">
                        <FormIconSelect 
                            name="disciplines"
                            value={form.discipline}
                            options={form.is_team ? DISCIPLINE_TEAM_OPTIONS : DISCIPLINE_OPTIONS}
                            onChange={(e)=> handleChange("discipline", e.target.value)} 
                        />
                        <Field className={""}>
                            <Label className="flex group items-center p-2 pl-1 gap-2 w-full font-semibold cursor-pointer transition-all ease-fluid border 
                                border-transparent rounded-lg">
                                <Checkbox
                                    checked={form.is_team}
                                    name={"is_team"}
                                    groupHover
                                    onChange={(checked) => {
                                        handleChange("is_team", checked);
                                    }}
                                />
                                Equipos
                            </Label>
                        </Field>
                    </div>
                </div>
                <div className="flex flex-col">
                    {/* { getAgeErrors(formErrors) && <span className="col-start-2 text-xs text-red">*{getAgeErrors(formErrors)}</span>} */}
                    <h3 className="font-bold text-lg">Edad</h3>
                    <div className="flex flex-col gap-2 p-2">
                        <Slider 
                            min={3} 
                            max={70}
                            defaultValue={[3,70]}
                            value={[parseInt(form.min_age), parseInt(form.max_age)]}
                            minStepsBetweenThumbs={1}
                            step={1}
                            withValueLabels
                            onValueChange={(values) => {
                                handleChange("min_age", values[0].toString());
                                handleChange("max_age", values[1].toString());
                            }}
                        />
                        {/* <div className="flex gap-1 p-1">
                            <div className="flex items-center text-muted gap-1">
                                Desde <span className="text-neutrallight font-bold text-xl">{selectedCategory.min_weight.toFixed(1)}</span>
                            </div>
                            <div className="flex items-center text-muted gap-1">
                                hasta <span className="text-neutrallight font-bold text-xl">{selectedCategory.max_weight.toFixed(1)}</span> Kgs
                            </div>
                        </div> */}
                    </div>
                </div>
                {/* LO PROXIMO QUE HAY QUE HACER ES ACOMODAR LOS TIPADOS PARA QUE COINCIDA CON EL PESO OPCIONAL EN LA CATEGORIA DE FORMAS */}
                {form.discipline === Discipline.COMBAT &&
                    <div className="flex flex-col">
                        <span className="col-start-2 text-xs text-red">{formErrors?.min_rank && formErrors.min_rank}</span>
                        <h3 className="font-bold text-lg">Peso</h3>
                        <div className="flex flex-col gap-1 p-2">
                            <Field>
                                <Label htmlFor="min_weight" className="flex items-center text-muted gap-1">
                                    <FormInput
                                        id="min_weight"
                                        type="number"
                                        variant="primary"
                                        value={form.min_weight}
                                        error={formErrors?.min_weight}
                                        placeholder="5"
                                        alignment="center"
                                        title="Peso minimo"
                                        name="min_weight"
                                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                                    /> 
                                    Kg
                                </Label>
                            </Field>
                            <Field>
                                <Label htmlFor="max_weight" className="flex items-center text-muted gap-1">
                                    <FormInput
                                        id="max_weight"
                                        type="number"
                                        variant="primary"
                                        value={form.max_weight}
                                        error={formErrors?.max_weight}
                                        placeholder="100"
                                        alignment="center"
                                        title="Peso maximo"
                                        name="max_weight"
                                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                                    />
                                    Kg 
                                </Label>
                            </Field>
                        </div>
                    </div>
                }
                <div className="flex flex-col">
                    <h3 className="font-bold text-lg">Graduacion</h3>
                    <span className="col-start-2 text-xs text-red">{formErrors?.max_rank ? `* ${formErrors?.max_rank}` : "\u00A0"}</span>
                    <div className="flex gap-2 justify-between p-2">
                        <span className="flex flex-col text-muted w-full gap-1">
                            Desde
                        <FormIconSelect 
                            name="min_rank"
                            value={form.min_rank}
                            options={ALL_RANKS_OPTIONS}
                            onChange={(e)=> handleChange("min_rank", e.target.value)} 
                        />
                        </span>
                        <span className="flex flex-col text-muted w-full gap-1">
                            Hasta
                            <FormIconSelect 
                                name="max_rank"
                                value={form.max_rank}
                                options={ALL_RANKS_OPTIONS}
                                onChange={(e)=> handleChange("max_rank", e.target.value)} 
                            />
                        </span>
                    </div>
                </div>
                <div className="flex gap-2 justify-between">
                    
                    {selectedCategory && <Button variant="secondary" onClick={()=>{
                        setManageMode(ManageModes.VIEW)
                    }}>
                        <div className="flex gap-1">
                            Ver Info
                        </div>
                    </Button>}
                    <Button className="w-fit" disabled={!enableButton}
                        type={manageMode === ManageModes.CREATE ? "submit" : "button"}
                        onClick={() => openModal(CategoryModalTypes.EDIT)}
                    >
                        {manageMode === ManageModes.CREATE ? "Crear categoría" : "Actualizar"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default CreateCategoryForm;