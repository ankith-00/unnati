import Navbar from "../components/Navbar";
import UserCarousel from "../components/Crousel";
import AIAssistantButton from "../components/AiAssistentButton";
import MetricsContainer from "../components/Matrices";

export default function Farmer() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="p-4">
                <UserCarousel />
                <AIAssistantButton />
                <MetricsContainer />
            </main>
        </div>
    );
}