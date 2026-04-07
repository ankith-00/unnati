import { BrowserRouter, Routes, Route } from "react-router-dom";
import Selection from "./LanguageRole";
import Login from "./UserLogin";
import Farmer from "./Dashboard";
import MachineListings from "./MachineRentalMarket";
import VoiceAssistant from "./AiAssistentInterface";

export default function Mobile() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Selection />} />
                <Route path="/login" element={<Login />} />

                <Route path="/dashboard" element={<Farmer />} />

                <Route path="/machines" element={<MachineListings />} />
                <Route path="/ai-assistant" element={<VoiceAssistant />} />
            </Routes>
        </BrowserRouter>
    )
}
