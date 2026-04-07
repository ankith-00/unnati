import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { language, userType, t } = useAppContext();
    const navigate = useNavigate();

    const [slide, setSlide] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Redirect if someone tries to access /login without choosing a role
    useEffect(() => {
        if (!language || !userType) navigate("/");
    }, [language, userType, navigate]);

    const fontClass = language === "Kannada" ? "font-benne" : "font-lexend";

    const switchSlide = (next) => {
        setAnimating(true);
        setTimeout(() => {
            setSlide(next);
            setAnimating(false);
            setShowPassword(false);
        }, 220);
    };

    // --- ADDED: Handle Login Simulation ---
    const handleLogin = (e) => {
        e.preventDefault(); // Prevent page refresh
        // Here you would normally validate email/password
        // For now, we go straight to the dashboard
        navigate("/dashboard");
    };

    return (
        <div className={`bg-white flex flex-col relative overflow-hidden w-full h-dvh justify-center items-center ${fontClass}`}>

            <div className={`w-full max-w-sm px-6 transition-all duration-220 ease-out ${animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>

                {/* Status Badges */}
                <div className="flex items-center gap-2 mb-10 font-lexend">
                    <span className="text-[10px] border border-zinc-200 px-2 py-0.5 text-zinc-400 uppercase tracking-widest rounded-sm">
                        {language}
                    </span>
                    <span className="text-[10px] border border-zinc-200 px-2 py-0.5 text-zinc-400 uppercase tracking-widest rounded-sm">
                        {userType}
                    </span>
                </div>

                {slide === 0 ? (
                    /* LOGIN SLIDE */
                    <div className="flex flex-col">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-black tracking-tight">
                                {t.login}
                            </h1>
                        </div>

                        <form onSubmit={handleLogin} className="flex flex-col gap-6">
                            <div>
                                <label className="block text-[1em] text-zinc-600 uppercase tracking-wider mb-2 font-lexend font-bold">
                                    {t.email}
                                </label>
                                <input
                                    required
                                    type="email"
                                    placeholder={language === "Kannada" ? "ನಿಮ್ಮ ಇಮೇಲ್" : "Your Email"}
                                    className="w-full border border-zinc-200 px-4 py-4 text-[1em] text-black focus:outline-none focus:border-black transition-all rounded-xl bg-zinc-50/50 font-lexend"
                                />
                            </div>
                            <div>
                                <label className="block text-[1em] text-zinc-600 uppercase tracking-wider mb-2 font-lexend font-bold">
                                    {t.password}
                                </label>
                                <div className="relative">
                                    <input
                                        required
                                        type={showPassword ? "text" : "password"}
                                        placeholder={language === "Kannada" ? "ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್" : "Password"}
                                        className="w-full border border-zinc-200 px-4 py-4 text-[1em] text-black focus:outline-none focus:border-black transition-all rounded-xl bg-zinc-50/50 font-lexend"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black transition-colors"
                                    >
                                        {showPassword ? (
                                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                        ) : (
                                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" /></svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* UPDATED: Login Button now triggers handleLogin */}
                            <button
                                type="submit"
                                className="mt-4 w-full bg-black text-white py-4.5 text-[1em] tracking-widest uppercase rounded-xl shadow-lg active:scale-95 transition-all font-lexend"
                            >
                                {t.login}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-[1em] text-zinc-500 font-lexend">
                                {language === "Kannada" ? "ಖಾತೆ ಇಲ್ಲವೇ?" : "Don't have an account?"}{" "}
                                <button
                                    onClick={() => switchSlide(1)}
                                    className="text-black font-extrabold underline underline-offset-4 decoration-zinc-200 hover:decoration-black transition-all"
                                >
                                    {language === "Kannada" ? "ಸೈನ್ ಅಪ್ ಮಾಡಿ" : "Create one"}
                                </button>
                            </p>
                        </div>
                    </div>
                ) : (
                    /* REGISTER SLIDE */
                    <div className="flex flex-col">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-black tracking-tight">
                                {language === "Kannada" ? "ನೋಂದಾಯಿಸಿ" : "Register"}
                            </h1>
                        </div>

                        {/* Note: I wrapped buttons in a form for consistent behavior */}
                        <form onSubmit={handleLogin} className="flex flex-col gap-6">
                            <div>
                                <label className="block text-[1em] text-zinc-600 uppercase tracking-wider mb-2 font-lexend font-bold">
                                    {language === "Kannada" ? "ಹೆಸರು" : "Full Name"}
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder={language === "Kannada" ? "ನಿಮ್ಮ ಹೆಸರು" : "Your Name"}
                                    className="w-full border border-zinc-200 px-4 py-4 text-[1em] text-black focus:outline-none focus:border-black transition-all rounded-xl bg-zinc-50/50 font-lexend"
                                />
                            </div>
                            <div>
                                <label className="block text-[1em] text-zinc-600 uppercase tracking-wider mb-2 font-lexend font-bold">
                                    {t.email}
                                </label>
                                <input
                                    required
                                    type="email"
                                    placeholder={language === "Kannada" ? "ನಿಮ್ಮ ಇಮೇಲ್" : "your@email.com"}
                                    className="w-full border border-zinc-200 px-4 py-4 text-[1em] text-black focus:outline-none focus:border-black transition-all rounded-xl bg-zinc-50/50 font-lexend"
                                />
                            </div>
                            <div>
                                <label className="block text-[1em] text-zinc-600 uppercase tracking-wider mb-2 font-lexend font-bold">
                                    {t.password}
                                </label>
                                <div className="relative">
                                    <input
                                        required
                                        type={showPassword ? "text" : "password"}
                                        placeholder={language === "Kannada" ? "ಪಾಸ್‌ವರ್ಡ್ ರಚಿಸಿ" : "* * * * *"}
                                        className="w-full border border-zinc-200 px-4 py-4 text-[1em] text-black focus:outline-none focus:border-black transition-all rounded-xl bg-zinc-50/50 font-lexend"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black transition-colors"
                                    >
                                        {showPassword ? (
                                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                        ) : (
                                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" /></svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="mt-4 w-full bg-black text-white py-4.5 text-[1em] tracking-widest uppercase rounded-xl shadow-lg active:scale-95 transition-all font-lexend"
                            >
                                {language === "Kannada" ? "ಖಾತೆ ರಚಿಸಿ" : "Sign Up"}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-[1em] text-zinc-500 font-lexend">
                                {language === "Kannada" ? "ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?" : "Already have an account?"}{" "}
                                <button
                                    onClick={() => switchSlide(0)}
                                    className="text-black font-extrabold underline underline-offset-4 decoration-zinc-200 hover:decoration-black transition-all"
                                >
                                    {t.login}
                                </button>
                            </p>
                        </div>
                    </div>
                )}

                <button
                    onClick={() => navigate("/")}
                    className="mt-6 w-full py-3 text-[0.8em] text-zinc-400 hover:text-black transition-colors duration-150 tracking-widest uppercase font-lexend"
                >
                    {language === "Kannada" ? "ಹಿಂದಕ್ಕೆ ಹೋಗಿ" : "Change User Type / Language"}
                </button>
            </div>
        </div>
    );
}