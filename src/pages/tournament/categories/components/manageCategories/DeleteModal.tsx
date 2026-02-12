import Modal from "@/components/Modal";
import { useManageCategories } from "./ManageCategoryContext";
import { CategoryModalTypes } from "../../types";
import { buildCategoryName } from "@/utils/utils";
import Button from "@/components/Button";
import { deleteCategory } from "@/services/categoryService";
import { useTournamentStore } from "@/states/useTournamentStore";
import { errorToast, successToast } from "@/services/toasts";
// import { CategorySchema } from "@/types/schemas/primitiveSchemas";

const DeleteModal = () => {
    const {categoryToDelete, isDeleteModalOpen, closeModal, launchCategoryUpdate} = useManageCategories();
    const {tournament} = useTournamentStore()
    
    const handleDelete = async ()  => {
        if (!categoryToDelete) return
        try{
            await deleteCategory(tournament.code, categoryToDelete.uuid)
        }
        catch (error: any){
            errorToast(
                error?.message || "Error al eliminar la categoria"
            );
        }
    }
    return (
    <Modal
        isOpen={isDeleteModalOpen}
        closeModal={() => {
            closeModal(CategoryModalTypes.DELETE)
        }}
        title={"Eliminar Categoria"}
    >
        <p className="text-md text-muted text-center">
            {`¿Estas seguro que quieres eliminar
                    la siguiente categoria?
                    Esto borrara todas las inscripciones.`}
            <br />
            <br />
            <span className="text-orange font-black">
                {"> "}
            </span>
            <span className="text-neutrallight capitalize italic">
                {/* {<IconsCategoryName category={selectedCategory }/>} */}
                {categoryToDelete && buildCategoryName(categoryToDelete)}
            </span>
        </p>

        <div className="flex mt-1.5 gap-2 justify-between">
            <Button
                variant="secondary"
                onClick={(e) => {
                    e.preventDefault();
                    closeModal(CategoryModalTypes.DELETE)
                }}
            >
                Cerrar
            </Button>
            <Button
                variant="primary"
                // loading={true}
                onClick={(e) => {
                    e.preventDefault();
                    handleDelete()
                    successToast("Categoria eliminada correctamente")
                    launchCategoryUpdate()
                    closeModal(CategoryModalTypes.DELETE)
                }}
            >
                Estoy seguro
            </Button>
        </div>
    </Modal>
)
}

export default DeleteModal