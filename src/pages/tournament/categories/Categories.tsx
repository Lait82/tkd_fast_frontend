"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoBack from "@/components/GoBack";
import { useTournamentStore } from "@/states/useTournamentStore";
import TournamentNavbar from "@/components/TournamentNavbar";
import { TournamentActions } from "@/types/enums";
import AvailableCategories from "./components/AvailableCategories";
import ManageCategories from "./components/manageCategories/ManageCategories";
import { ManageCategoriesProvider } from "./components/manageCategories/ManageCategoryContext";
// Mock data for tournaments
const Categories = () => {
    const { can } = useTournamentStore();
    return (
        <div className="create-tournament-page">
            <Header />

            <main className="create-tournament-container flex flex-col gap-2">
                <div className="grid grid-cols-3 items-center">
                    <GoBack />
                    <div className="flex justify-center w-ful">
                        <TournamentNavbar />
                    </div>
                </div>
                {can(TournamentActions.MANAGE_CATEGORIES) && (
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-semibold mb-4">Manage Competitors</h2>
                        <ManageCategoriesProvider>
                            <ManageCategories />
                        </ManageCategoriesProvider>
                    </div>
                )}
                <div className="flex flex-col">
                    <AvailableCategories />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Categories;
