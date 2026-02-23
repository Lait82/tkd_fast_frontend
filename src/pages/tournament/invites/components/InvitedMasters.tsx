
interface InstructorListProps {
    invitees: object[]
}

const InvitedMasters = ({invitees}:InstructorListProps) => {
    
    return(									
    <div className="bg-super-elevated rounded-lg p-1.5 border border-elevated-400">
        {invitees.map((invitee) => {
            const isSelected = selectedMasterId === master.id;

            return (
                <div
                    // type="button"
                    key={master.id}
                    onClick={() => setSelectedMasterId(master.id)}
                    className={`w-full grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-2 text-left px-1.5 py-1 border-b border-elevated-400 transition-colors ${
                        isSelected ? "bg-elevated rounded" : "hover:bg-elevated/60"
                    }`}
                >
                    <span className="md:col-span-4">
                        {master.name} {master.lastName}
                    </span>
                    <span className="md:col-span-4 text-muted italic">
                        {master.email}
                    </span>
                    <span className="md:col-span-4 inline-flex items-center gap-0.5">
                        {statusIcon(master.status)}
                        {STATUS_TEXT[master.status]}
                    </span>
                </div>
            );
        })}

        <form
            onSubmit={handleInviteMaster}
            className="grid grid-cols-1 md:grid-cols-12 gap-1.5 px-1.5 pt-1"
        >
            <input
                type="text"
                placeholder="Nombre"
                value={formValues.name}
                onChange={(event) =>
                    setFormValues((prev) => ({ ...prev, name: event.target.value }))
                }
                className="md:col-span-3 border-0 border-b border-orange bg-transparent pb-0.5 focus:outline-none"
            />
            <input
                type="text"
                placeholder="Apellido"
                value={formValues.lastName}
                onChange={(event) =>
                    setFormValues((prev) => ({ ...prev, lastName: event.target.value }))
                }
                className="md:col-span-3 border-0 border-b border-orange bg-transparent pb-0.5 focus:outline-none"
            />
            <input
                type="email"
                placeholder="Email"
                value={formValues.email}
                onChange={(event) =>
                    setFormValues((prev) => ({ ...prev, email: event.target.value }))
                }
                className="md:col-span-4 border-0 border-b border-orange bg-transparent pb-0.5 focus:outline-none"
            />

            <div className="md:col-span-2 flex justify-start md:justify-end">
                <Button type="submit" className="w-full md:w-auto px-2.5">
                    <span className="inline-flex items-center gap-0.5 text-xs">
                        <LuUserPlus size={13} />
                        Invitar
                    </span>
                </Button>
            </div>
        </form>
    </div>);
}
export default InvitedMasters