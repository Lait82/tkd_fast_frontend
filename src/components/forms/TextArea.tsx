import clsx from 'clsx'
import React from 'react'
import Label from './Label'

interface TextAreaProps {
	label?: string
	name: string
	required?: boolean | undefined
	rows?: number
	placeholder?: string
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
	value: string
}

const TextArea: React.FC<TextAreaProps> = ({label, name, required, rows = 3, placeholder='', onChange, value}) => {
	return (
		<div className="w-full">
			{/* <Label className="text-sm/6 font-medium text-white">Description</Label> */}
			{label && <Label name={name} label={label} required={required} /> }
			<textarea
				className={clsx(
				'block w-full resize-none max-h-50 text-xl rounded-lg border-none bg-white/5 px-2 py-1.5 text-neutrallight mt-2',
				'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-orange/50'
				)}
				rows={rows}
				placeholder={placeholder}
				onChange={onChange}
				value={value}
				name={name}
			/>
		</div>
	)
}

export default TextArea