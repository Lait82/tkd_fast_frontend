import { getGenderLabel } from "@/utils/utils";
import { useManageCategories } from "./ManageCategoryContext";
import { Discipline, Gender, Rank } from "@/types/enums";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import { useEffect, useState } from "react";
import { TbGenderFemale, TbGenderMale } from "react-icons/tb";
// import IconSelect from "@/components/IconSelect";
import {IconSelect as FormIconSelect} from "@/components/forms/IconSelect";
import { ALL_RANKS_OPTIONS, DISCIPLINE_OPTIONS, DISCIPLINE_TEAM_OPTIONS } from "@/constants/selectOptions";
import { categorySchema, newCategorySchema } from "@/types/schemas/primitiveSchemas";
import { errorToast, successToast } from "@/services/toasts";
import { createCategory } from "@/services/categoryService";
import { useTournamentStore } from "@/states/useTournamentStore";
import Checkbox from "@/components/forms/Checkbox";
import FormInput from "@/components/forms/FormInput";
import Button from "@/components/Button";
import { error } from "console";

interface NewCategoryForm {
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

const emptyForm: NewCategoryForm = {
    discipline: Discipline.COMBAT,
    is_team: false,
    min_rank: Rank.WHITE,
    max_rank: Rank.DAN_9,
    min_weight: "",
    max_weight: "",
    min_age: "",
    max_age: "",
    gender: Gender.FEMALE,
};
type Errors = Partial<Record<keyof NewCategoryForm, string>>;

const CategoryForm = ({}) => {
    const { tournament } = useTournamentStore();
    const { selectedCategory, setNewCategory } = useManageCategories();
    const [form, setForm] = useState<NewCategoryForm>(emptyForm);

	const [formErrors, setFormErrors] = useState<Errors>();
    
    const handleChange = (field_name: string, value: any) => {
        if (formErrors  && formErrors[field_name as keyof NewCategoryForm]) {
            const newFormErrors = {...formErrors};
            delete newFormErrors[field_name as keyof NewCategoryForm];
            setFormErrors(newFormErrors);
        }
        setForm((prev) => ({
            ...prev,
            [field_name]: value,
        }));
    }
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Parseo el form
            const result = newCategorySchema.safeParse({
                ...form,
            });

            if (!result.success) {
                const fieldErrors: Errors = {};
                result.error.issues.forEach((issue) => {
                    const key = issue.path[0] as keyof NewCategoryForm;
                    fieldErrors[key] = issue.message;
                });
                setFormErrors(fieldErrors);
                errorToast("Revisá los campos");
                console.log(fieldErrors);
                console.log(form)
                return;
            }

            console.log("Form enviado:", form);
            console.log("Form parseado:", result);
            const res = await createCategory(
                tournament.code,
                result.data
            );
            // const createdCategory = categorySchema.parse(res);
            successToast("Categoría creada con exito");

            // Reset states
            // setSelectedCategories([]);
            // setUserCompetitors((prev) => [...prev, createdCompetitor]);
            setForm(emptyForm);
        } catch (err: any) {
            errorToast(err.message);
            // setError(err.message || "Error al editar el torneo")
        } finally {
            // setLoading(false)
        }
    };

    return (
        <div className={`flex flex-col ${selectedCategory ? "col-span-2" : "col-span-0"} gap-3 bg-elevated p-3 rounded-lg shadow-md`}>

			<div className="flex flex-col gap-2">
				<h1 className="font-extrabold text-2xl">Administrar categoria</h1>
                
                <form onSubmit={handleSubmit}>
                    {/* <span className="col-start-2 text-xs text-red">{formErrors?.min_rank && formErrors.min_rank}</span> */}
                    <h3 className="font-bold text-lg">Género</h3>
                    <RadioGroup className={`flex w-full gap-2 p-2 justify-between font-semibold`} name="gender" value={form.gender} onChange={(gender)=> {
                        console.log(gender)
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
                            <Field>
                                <Label htmlFor="min_age" className="flex items-center text-muted gap-1">
                                    <FormInput
                                        type="number"
                                        id="min_age"
                                        variant="primary"
                                        value={form.min_age}
                                        error={formErrors?.min_age}
                                        placeholder="0"
                                        alignment="center"
                                        title="Desde"
                                        name="min_age"
                                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                                    /> 
                                    Años
                                </Label>
                            </Field>
                            <Field>
                                <Label htmlFor="max_age" className="flex items-center text-muted gap-1">
                                    <FormInput
                                        id="max_age"
                                        type="number"
                                        variant="primary"
                                        value={form.max_age}
                                        error={formErrors?.max_age}
                                        alignment="center"
                                        placeholder="99"
                                        title="Hasta"
                                        name="max_age"
                                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                                    /> 
                                    Años
                                </Label>
                            </Field>
                        </div>
                    </div>
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
                    <Button className="w-full mt-3" type="submit" disabled={[form.min_weight, form.max_weight, form.min_age, form.max_age].some((val) => val === "")}>
                        Crear categoría
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default CategoryForm;