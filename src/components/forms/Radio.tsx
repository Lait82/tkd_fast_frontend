import { Field, Label, Radio as RadioHeadless } from "@headlessui/react";
import React from 'react';
interface RadioProps {
    value: string | number;
    children?: React.ReactNode;
}

export const Radio: React.FC<RadioProps> = ({
    value,
    children,
}) => {
    return (
        <Field className="flex items-center">
            <RadioHeadless
                value={value}
                className="group flex size-[calc(var(--spacing)*2+1px)] items-center justify-center border-2 rounded-full border-muted"
            >
                <span className="opacity-0 size-1 rounded-full transition-all bg-orange group-data-checked:opacity-100" />
            </RadioHeadless>
            <Label>{children}</Label>
        </Field> 
    );
};