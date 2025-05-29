import { Listbox } from '@headlessui/react'
import BeltIcon from './BeltIcon'
import { Rank } from '@/types/enums'

interface RankOption {
  value: Rank
  label: string
}
const rankOptions = [
    { value: "WHITE", label: "Blanco" },
    { value: "WHITE_YELLOW", label: "Blanco Punta Amarilla" },
    { value: "YELLOW", label: "Amarillo" },
    { value: "YELLOW_GREEN", label: "Amarillo Punta Verde" },
    { value: "GREEN", label: "Verde" },
    { value: "GREEN_BLUE", label: "Verde Punta Azul" },
    { value: "BLUE", label: "Azul" },
    { value: "BLUE_RED", label: "Azul Punta Roja" },
    { value: "RED", label: "Rojo" },
    { value: "RED_BLACK", label: "Rojo Punta Negra" },
    { value: "DAN_1", label: "1er Dan" },
    { value: "DAN_2", label: "2do Dan" },
    { value: "DAN_3", label: "3er Dan" },
    { value: "DAN_4", label: "4to Dan" },
    { value: "DAN_5", label: "5to Dan" },
    { value: "DAN_6", label: "6to Dan" }
  ]
  

const RankSelect = ({
  value,
  onChange,
  loading
}: {
  value: Rank
  onChange: (e: Rank) => void
  loading?: boolean
}) => {
  return (
    <div className="form-group">
      <Listbox value={value} onChange={onChange} disabled={loading}>
        <Listbox.Label className="form-label">Grado</Listbox.Label>
        
        <div className="relative mt-1">
          <Listbox.Button className="form-input pl-10 text-left w-full">
            {/* Selected value display */}
            <div className="flex items-center gap-2">
              <span className="absolute left-2 top-1/2 -translate-y-1/2">
                <BeltIcon rank={value} size={20} />
              </span>
              <span className="pl-6">
                {rankOptions.find(opt => opt.value === value)?.label}
              </span>
            </div>
          </Listbox.Button>

          {/* Dropdown options */}
          <Listbox.Options className="absolute w-full py-1 mt-1 max-h-60 overflow-auto rounded-md bg-white shadow-lg border border-gray-200 z-10">
            {rankOptions.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-gray-100' : ''
                  }`
                }
              >
                {({ selected }) => (
                  <div className="flex items-center gap-2">
                    <span className="absolute left-2">
                      <BeltIcon 
                        rank={option.value as Rank} 
                        size={20}
                        className={selected ? 'opacity-100' : 'opacity-50'}
                      />
                    </span>
                    <span className={`block ${selected ? 'font-medium' : 'font-normal'}`}>
                      {option.label}
                    </span>
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  )
}

export default RankSelect