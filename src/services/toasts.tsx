import { toast } from "sonner"
import { RxCheckCircled, RxCrossCircled } from "react-icons/rx"

export function successToast(message: string = "Success") {
  toast.custom(() => (
    <div className="flex items-center rounded-lg gap-2 py-2 px-3 shadow-card bg-super-elevated text-neutrallight">
      <RxCheckCircled size={24} className="text-green" />
      <span className="font-bold">{message}</span>
    </div>
  ))
}

export function errorToast(message: string = "Failed") {
  toast.custom(() => (
    <div className="flex items-center rounded-lg gap-2 py-2 px-3 shadow-card bg-super-elevated text-neutrallight">
      <RxCrossCircled size={24} className="text-red" />
      <span className="font-bold">{message}</span>
    </div>
  ))
}