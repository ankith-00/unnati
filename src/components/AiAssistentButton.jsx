import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function AIAssistantBanner() {
    const navigate = useNavigate();
    const { language } = useAppContext();

    return (
        <div className="w-full mt-6">
            <button
                onClick={() => navigate("/ai-assistant")}
                className="w-full rounded-[28px] border border-zinc-50 bg-blue-50 transition-all duration-300 hover:shadow-md active:scale-[0.98]"
            >
                {/* INNER CARD */}
                <div className="rounded-[28px] px-5 py-4 flex items-center justify-between">

                    {/* LEFT */}
                    <div className="flex items-center gap-4">

                        {/* CIRCULAR MIC ICON */}
                        <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                <line x1="12" y1="19" x2="12" y2="22" />
                            </svg>
                        </div>

                        {/* TEXT */}
                        <div className="flex flex-col text-left">
                            <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider font-lexend">
                                {language === "Kannada" ? "ಧ್ವನಿ ಸಹಾಯಕ" : "Voice Assistant"}
                            </span>

                            <h3 className={`text-[16px] font-semibold text-black leading-tight ${language === "Kannada" ? "font-benne" : "font-lexend"}`}>
                                {language === "Kannada" ? "AI ಸಹಾಯ ಕೇಳಿ" : "Ask AI Assistant"}
                            </h3>
                        </div>
                    </div>

                    {/* RIGHT ARROW */}
                    <div className="w-9 h-9 rounded-full bg-black border flex items-center justify-center text-zinc-50 hover:bg-black hover:text-white transition-all duration-300">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </button>
        </div>
    );
}