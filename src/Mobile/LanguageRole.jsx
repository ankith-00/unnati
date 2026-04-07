import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const userTypeIcons = {
    Farmer: (
        <svg width="24" height="24" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M501.204,171.608l-1.707-3.656l-3.509-2.002c-6.45-3.679-14.179-6.55-22.934-8.646 c-8.755-2.064-18.518-3.298-28.832-3.298c-17.96,0.007-37.72,3.733-55.935,13.915c-18.216,10.136-34.576,26.971-44.844,51.419 c-3.764,8.964-8.235,16.314-12.193,20.745c-1.964,2.228-3.764,3.687-4.983,4.392l-1.327,0.622l-0.225,0.054 c-0.854-0.427-1.389-0.884-1.863-1.606c-0.45-0.754-1.016-1.98-1.04-4.719c-0.078-4.758,2.313-14.195,11.114-27.862 c17.082-26.668,24.828-53.669,24.812-78.924c0.016-30.37-11.13-57.906-28.934-79.436C310.992,31.053,286.568,15.29,259.38,7.776 l-3.376-0.931l-3.384,0.931c-27.179,7.513-51.604,23.276-69.416,44.829c-17.804,21.53-28.95,49.066-28.934,79.436 c-0.016,25.255,7.73,52.248,24.812,78.924c8.802,13.667,11.192,23.113,11.114,27.862c-0.023,2.732-0.59,3.966-1.048,4.719 c-0.465,0.722-0.993,1.171-1.854,1.606l-0.233-0.054c-0.9-0.156-4.27-2.236-7.8-6.807c-3.578-4.502-7.397-11.114-10.695-18.952 c-10.268-24.44-26.637-41.282-44.844-51.419c-18.216-10.174-37.975-13.908-55.942-13.915c-10.315,0-20.078,1.234-28.825,3.298 c-8.762,2.088-16.485,4.967-22.934,8.646l-3.508,2.002l-1.708,3.656C3.609,187.045,0.008,204.888,0,223.81 c0.016,32.372,10.571,68.042,33.257,100.352c19.962,28.43,49.431,54.127,89.083,72.304c-14.886,18.34-23.501,34.296-23.772,34.746 l-5.984,11.044l10.982,6.116c1.242,0.684,29.857,16.423,75.913,16.454c11.758,0,24.688-1.094,38.487-3.686l-0.73,44.014h37.588 h2.359h37.588l-0.73-44.014c13.8,2.592,26.722,3.686,38.488,3.686c46.047-0.031,74.671-15.77,75.912-16.454l10.982-6.116 l-5.984-11.044c-0.272-0.45-8.886-16.407-23.772-34.746c39.652-18.177,69.122-43.874,89.083-72.304 c22.678-32.31,33.233-67.98,33.249-100.352C511.992,204.888,508.391,187.045,501.204,171.608z M457.943,309.541 c-19.76,28.08-50.254,53.576-93.965,70.138l-16.143,6.791l11.448,13.877c9.748,10.205,17.812,21.094,23.354,29.352 c0.388,0.574,0.66,1.024,1.024,1.576c-10.928,3.733-28.553,8.133-51.131,8.117c-14.218,0-30.401-1.73-48.205-6.464l-16.26-4.331 l0.846,51.124h-11.727h-2.359h-11.727l0.846-51.131l-16.26,4.338c-17.812,4.734-33.995,6.464-48.205,6.464 c-20.078,0-36.245-3.461-47.274-6.86c-1.373-0.42-2.662-0.838-3.873-1.257c5.565-8.413,13.986-20.048,24.393-30.928l11.448-13.877 l-16.144-6.791c-43.711-16.562-74.205-42.058-93.965-70.138c-19.745-28.08-28.647-58.893-28.632-85.73 c-0.007-14.04,2.546-26.823,6.923-37.634c3.392-1.521,7.638-2.988,12.465-4.121c6.791-1.615,14.692-2.624,22.958-2.616 c14.467-0.008,29.95,3.065,43.524,10.679c13.574,7.661,25.535,19.605,33.839,39.125c4.602,10.842,10.043,20.288,16.578,27.699 c3.283,3.702,6.868,6.931,11.068,9.423c4.168,2.476,9.127,4.238,14.575,4.238c3.602,0.015,7.312-0.816,10.633-2.376 c4.812-2.235,9.423-5.945,12.659-11.106c3.267-5.13,4.99-11.51,4.975-18.294c-0.078-12.061-4.835-25.395-15.126-41.57 c-14.778-23.136-20.785-45.138-20.8-65.217c0.007-24.114,8.723-45.784,23.113-63.238c13.628-16.531,32.426-28.996,53.187-35.43 c20.761,6.434,39.559,18.899,53.188,35.423c14.382,17.462,23.105,39.132,23.113,63.246c-0.015,20.078-6.03,42.081-20.8,65.217 c-10.291,16.175-15.049,29.508-15.126,41.57c-0.023,6.783,1.707,13.163,4.967,18.3c3.244,5.154,7.854,8.872,12.658,11.099 c3.322,1.56,7.032,2.391,10.641,2.376c5.448,0,10.408-1.762,14.575-4.238c6.279-3.757,11.254-9.073,15.771-15.352 c4.486-6.286,8.436-13.636,11.874-21.778c8.304-19.512,20.264-31.456,33.839-39.124c13.566-7.614,29.058-10.687,43.517-10.671 c8.273-0.008,16.167,1,22.965,2.616c4.828,1.14,9.073,2.608,12.465,4.121c4.378,10.812,6.923,23.594,6.923,37.634 C486.582,250.64,477.688,281.46,457.943,309.541z" />
            <path fill="currentColor" d="M322.417,322.338c-19.434,12.791-36.874,22.337-49.408,28.663c-3.415,1.723-6.426,3.182-9.057,4.431V79.63 h-15.895v275.81c-12.884-6.116-35.888-17.936-62.136-35.539c-38.138-25.557-83.03-63.339-113.904-113.174l-13.505,8.382 c33.7,54.305,82.254,94.112,122.34,120.508c25.922,17.051,48.283,28.461,60.98,34.452c-3.826,3.36-8.786,7.474-14.668,11.82 c-12.582,9.306-29.244,19.473-46.831,24.929l4.718,15.181c21.476-6.706,40.428-18.86,54.197-29.299 c7.164-5.448,12.868-10.415,16.756-13.978c3.888,3.563,9.593,8.53,16.756,13.978c13.768,10.439,32.721,22.593,54.197,29.299 l4.719-15.181c-18.759-5.813-36.462-17.004-49.292-26.776c-4.812-3.656-8.941-7.102-12.216-9.973 c12.697-5.992,35.057-17.393,60.988-34.452c40.079-26.396,88.64-66.204,122.34-120.508l-13.505-8.382 C408.124,258.169,361.308,296.773,322.417,322.338z" />
        </svg>
    ),
    "Machinery Owner": (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
        </svg>
    ),
    Consumer: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
    ),
};

const userTypeDescriptions = {
    Farmer: { en: "Buy & rent machinery", kn: "ಯಂತ್ರ ಖರೀದಿ ಮತ್ತು ಬಾಡಿಗೆ" },
    "Machinery Owner": { en: "List & manage equipment", kn: "ಉಪಕರಣ ಪಟ್ಟಿ ಮಾಡಿ" },
    Consumer: { en: "Browse & purchase produce", kn: "ಉತ್ಪನ್ನ ಖರೀದಿಸಿ" },
};

export default function Selection() {
    const { language, setLanguage, userType, setUserType, t } = useAppContext();
    const [slide, setSlide] = useState(0);
    const [animating, setAnimating] = useState(false);
    const navigate = useNavigate();

    const fontClass = language === "Kannada" ? "font-benne" : "font-lexend";

    const goToSlide = (next) => {
        setAnimating(true);
        // Slightly longer timeout for a smoother exit
        setTimeout(() => {
            setSlide(next);
            setAnimating(false);
        }, 300);
    };

    const handleContinue = () => {
        if (!userType) return;
        navigate("/login");
    };

    const userTypes = [
        { key: "Farmer", label: t.farmer },
        { key: "Machinery Owner", label: t.machineryOwner },
        { key: "Consumer", label: t.consumer },
    ];

    const CircularTick = ({ size = "18" }) => (
        <div className="bg-white rounded-full p-0.5 flex items-center justify-center shadow-sm shrink-0 scale-110 animate-in zoom-in duration-300">
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
        </div>
    );

    return (
        <div className={`bg-white flex flex-col relative overflow-hidden w-full h-dvh justify-center items-center ${fontClass}`}>

            {/* Language Switcher */}
            <div className="absolute top-6 right-6 z-50 flex gap-2 font-lexend">
                {["English", "Kannada"].map((l) => (
                    <button
                        key={l}
                        onClick={() => setLanguage(l)}
                        className={`px-3 py-1 text-[10px] font-bold tracking-wider rounded-full border transition-all duration-300 ${language === l
                            ? "bg-black text-white border-black"
                            : "bg-white text-zinc-400 border-zinc-200 hover:border-zinc-400"
                            }`}
                    >
                        {l === "English" ? "EN" : "ಕನ್ನಡ"}
                    </button>
                ))}
            </div>

            <div className="w-full flex-1 flex flex-col items-center justify-center px-6 overflow-hidden">
                <div className={`w-full max-w-sm transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${animating
                    ? "opacity-0 translate-y-8 scale-95 blur-sm"
                    : "opacity-100 translate-y-0 scale-100 blur-0"
                    }`}>

                    {slide === 0 ? (
                        <div className="flex flex-col gap-6">
                            <div className="space-y-1">
                                <h1 className={`text-3xl font-bold text-black tracking-tight leading-tight ${fontClass}`}>
                                    {t.selectLanguage}
                                </h1>
                                <p className="text-sm text-zinc-400 font-lexend">
                                    Choose your preferred language
                                </p>
                            </div>

                            <div className="flex gap-3">
                                {[
                                    { lang: "English", symbol: "A", sub: "English", f: "font-lexend" },
                                    { lang: "Kannada", symbol: "ಅ", sub: "ಕನ್ನಡ", f: "font-benne" },
                                ].map(({ lang, symbol, sub, f }, i) => (
                                    <button
                                        key={lang}
                                        onClick={() => setLanguage(lang)}
                                        style={{ transitionDelay: `${i * 50}ms` }}
                                        className={`flex-1 relative py-7 border-2 rounded-xl flex flex-col items-center justify-center gap-2 transition-all duration-300 active:scale-95 ${f} ${language === lang ? "border-black bg-black text-white shadow-lg shadow-zinc-200" : "border-zinc-200 bg-white text-zinc-700"
                                            }`}
                                    >
                                        <span className="text-4xl font-bold leading-none">{symbol}</span>
                                        <span className={`tracking-widest uppercase opacity-80 ${lang === "Kannada" ? "text-lg" : "text-sm"}`}>
                                            {sub}
                                        </span>
                                        {language === lang && (
                                            <div className="absolute top-3 right-3">
                                                <CircularTick size="14" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => language && goToSlide(1)}
                                disabled={!language}
                                className={`w-full py-4 uppercase rounded-xl transition-all duration-300 active:scale-[0.98] font-lexend ${language === "Kannada" ? "text-xl" : "text-lg"
                                    } ${language ? "bg-black text-white shadow-xl shadow-zinc-300" : "bg-zinc-100 text-zinc-300 border-transparent cursor-not-allowed"}`}
                            >
                                {t.next}
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">
                            <div className="space-y-1">
                                <h1 className={`text-2xl font-bold text-black tracking-tight leading-tight ${fontClass}`}>
                                    {t.selectUserType}
                                </h1>
                                <p className={`text-zinc-400 font-lexend ${language === "Kannada" ? "text-base" : "text-sm"}`}>
                                    {language === "Kannada" ? "ನೀವು ಯಾರು ಎಂದು ನಮಗೆ ತಿಳಿಸಿ" : "Tell us who you are"}
                                </p>
                            </div>

                            <div className="flex flex-col gap-2.5">
                                {userTypes.map(({ key, label }, i) => {
                                    const selected = userType === key;
                                    const desc = language === "Kannada" ? userTypeDescriptions[key].kn : userTypeDescriptions[key].en;
                                    return (
                                        <button
                                            key={key}
                                            onClick={() => setUserType(key)}
                                            style={{ transitionDelay: `${i * 40}ms` }}
                                            className={`w-full px-5 py-4 border-2 rounded-xl text-left transition-all duration-300 flex items-center gap-4 active:scale-[0.98] ${selected ? "border-black bg-black text-white shadow-md" : "border-zinc-200 bg-white text-zinc-800"
                                                }`}
                                        >
                                            <span className={selected ? "text-white" : "text-zinc-400"}>
                                                {userTypeIcons[key]}
                                            </span>
                                            <span className="flex flex-col">
                                                <span className={`font-semibold ${language === "Kannada" ? "text-lg" : "text-sm font-lexend"}`}>{label}</span>
                                                <span className={`mt-0.5 font-lexend ${selected ? "text-zinc-300" : "text-zinc-400"} ${language === "Kannada" ? "text-sm" : "text-xs"}`}>
                                                    {desc}
                                                </span>
                                            </span>
                                            {selected && (
                                                <div className="ml-auto">
                                                    <CircularTick size="18" />
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Bottom Navigation Buttons */}
                            <div className="flex gap-3 font-lexend">
                                <button
                                    onClick={() => goToSlide(0)}
                                    className={`flex-1 border-2 border-zinc-200 text-zinc-600 uppercase rounded-xl active:scale-95 transition-all duration-300 ${language === "Kannada"
                                        ? "text-xl font-benne py-2.5"
                                        : "text-sm font-semibold tracking-widest py-4"
                                        }`}
                                >
                                    {t.back}
                                </button>

                                <button
                                    onClick={handleContinue}
                                    disabled={!userType}
                                    className={`flex-1 uppercase rounded-xl transition-all duration-300 active:scale-95 ${language === "Kannada"
                                        ? "text-xl font-benne py-2.5"
                                        : "text-sm font-semibold tracking-widest py-4"
                                        } ${userType
                                            ? "bg-black text-white shadow-lg"
                                            : "bg-zinc-100 text-zinc-300 border-transparent cursor-not-allowed"
                                        }`}
                                >
                                    {t.continue}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="h-6" />
        </div>
    );
}