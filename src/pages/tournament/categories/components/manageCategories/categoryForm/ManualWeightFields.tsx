import FormInput from "@/components/forms/FormInput"
import { Field, Label } from "@headlessui/react"

interface ManualWeightFields {
    form: {
        min_weight: string,
        max_weight: string
    }, 
    errors: {
        min_weight: string,
        max_weight: string
    }, 
    handleChange: (name: string, value: string) => {}
}

const ManualWeightFields = ({form, errors, handleChange}:ManualWeightFields) => {
    return (
    <div className="flex flex-col gap-1 p-2">
        <Field>
            <Label htmlFor="min_weight" className="flex items-center text-muted gap-1">
                <FormInput
                    id="min_weight"
                    type="number"
                    variant="primary"
                    value={form.min_weight}
                    error={errors?.min_weight}
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
                    error={errors?.max_weight}
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
    )
}