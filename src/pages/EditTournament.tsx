"use client"

// import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import Header from "../components/Header"
import Footer from "../components/Footer"
import GoBack from "../components/GoBack"
import "../styles/EditTournament.css"
import { FaCalendarAlt, FaImage } from "react-icons/fa"
// import FormInput from "@/components/forms/FormInput"
// import { Hash } from "lucide-react"
// import { FormEvent, useState } from "react"
// import Button from "@/components/Button"
// import { claimTournament } from "@/services/tournamentService"
// import { toast } from "sonner"
// import { RxCheckCircled } from "react-icons/rx";
import { successToast } from "@/services/toasts"
import FormInput from "@/components/forms/FormInput"
import { Form } from "react-router-dom"
import { useState } from "react"


// Mock data for tournaments
const EditTournament = () => {
    // const { user } = useAuth();
    // const [codeValue, setCodeValue] = useState<string>(''); 
    // const [loading, setLoading] = useState<boolean>()
    const [form, setForm] = useState({name:'', startDate:'', endDate:'', address:''})

    // const handleSubmit = async (e: FormEvent) => {
    //     e.preventDefault()

    //     try {
    //         await claimTournament(codeValue)
    //         // setSuccess(true)
    //         successToast('abr si funca')
    //     } catch (err: any) {
    //     // setError(err.message || "Failed to send password reset email")
    //     } finally {
    //         setLoading(false)
    //     }
    //   }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setForm({...form, name:value})
    }


    return (
    <div className="create-tournament-page">
        <Header />

        <main className="create-tournament-container">
            <GoBack />
            <div className="bg-elevated flex flex-col justify-center create-tournament-card p-5 rounded-lg">
                <h1 className="text-3xl mr-auto" >Información de Torneo</h1>

                <div className="edit-form-content">
                    <form onSubmit={() => successToast('Se actualizó correctamente')}>
                        <label htmlFor="banner" className="bg-super-elevated rounded-lg shadow-card h-15 flex justify-center items-center cursor-pointer">
                            <FaImage className="text-muted" size={46} /> 
                            <span className="text-2xl pl-2 text-muted"> Agrega un banner a tu torneo</span>
                        </label>
                        <input id="banner" type="file" style={{display:'none'}} />
                        
                        <div className="short-fields-container">
                            <div className="short-fields-left">
                                <FormInput 
                                    name="name"
                                    placeholder="Nombre"
                                    value={form.name}
                                    variant="secondary"
                                    onChange={handleChange}
                                />
                                <FormInput
                                    label="Fecha de inicio"
                                    name="startDate"
                                    type="date"
                                    icon={<FaCalendarAlt />}
                                    value={form.startDate}
                                    onChange={handleChange}
                                    // error={errors.dob}
                                    // disabled={loading}
                                />
                                <FormInput
                                    label="Fecha de finalización"
                                    name="endDate"
                                    type="date"
                                    icon={<FaCalendarAlt />}
                                    value={form.endDate}
                                    onChange={handleChange}
                                    // error={errors.dob}
                                    // disabled={loading}
                                />
                            </div>
                            <div className="short-fields-right">
                                <FormInput 
                                    name="address"
                                    placeholder="Dirección"
                                    value={form.name}
                                    variant="secondary"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </form>
                </div>


            </div>
        </main>

        <Footer />
    </div>
    )
}

export default EditTournament
