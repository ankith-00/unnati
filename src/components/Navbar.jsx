import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

// ── Inline SVG Icons ──────────────────────────────────────────────────────────
const Icon = ({ d, size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {Array.isArray(d) ? d.map((path, i) => <path key={i} d={path} />) : <path d={d} />}
    </svg>
);

const Icons = {
    menu: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.846 5.25h14.308c.33 0 .596.336.596.75s-.267.75-.596.75H4.846c-.33 0-.596-.336-.596-.75s.267-.75.596-.75Z" fill="currentColor" />
            <path d="M3 11.25h18c.414 0 .75.336.75.75s-.336.75-.75.75H3c-.414 0-.75-.336-.75-.75s.336-.75.75-.75Z" fill="currentColor" />
            <path d="M4.846 17.25h14.308c.33 0 .596.336.596.75s-.267.75-.596.75H4.846c-.33 0-.596-.336-.596-.75s.267-.75.596-.75Z" fill="currentColor" />
        </svg>
    ),
    profile: <Icon d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />,
    browse: <Icon d={["M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M9 22V12h6v10"]} />,
    bookings: <Icon d={["M8 6h13", "M8 12h13", "M8 18h13", "M3 6h.01", "M3 12h.01", "M3 18h.01"]} />,
    manage: <Icon d={["M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"]} />,
    earnings: <Icon d={["M12 2v20", "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"]} />,
    orders: <Icon d={["M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z", "M3 6h18", "M16 10a4 4 0 0 1-8 0"]} />,
    cart: <Icon d={["M6 2H3l-1 5 1 1h18l-2-6H6z", "M1 8l2 14h18l2-14", "M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z", "M15 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"]} />,
    signout: <Icon d={["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", "M16 17l5-5-5-5", "M21 12H9"]} />,
};

const getMenuItems = (language) => ({
    "Farmer": [
        { label: language === "Kannada" ? "ನನ್ನ ಪ್ರೊಫೈಲ್" : "My Profile", path: "/profile", icon: Icons.profile, isProfile: true },
        { label: language === "Kannada" ? "ಯಂತ್ರಗಳ ಹುಡುಕಾಟ" : "Find Machinery", path: "/machines", icon: Icons.browse },
        { label: language === "Kannada" ? "ನನ್ನ ಬುಕಿಂಗ್‌ಗಳು" : "My Bookings", path: "/bookings", icon: Icons.bookings },
    ],
    "Machinery Owner": [
        { label: language === "Kannada" ? "ಉಪಕರಣ ನಿರ್ವಹಣೆ" : "Manage Equipment", path: "/manage", icon: Icons.manage },
        { label: language === "Kannada" ? "ಆದಾಯದ ವಿವರ" : "Earnings Report", path: "/earnings", icon: Icons.earnings },
    ],
    "Consumer": [
        { label: language === "Kannada" ? "ನನ್ನ ಆರ್ಡರ್‌ಗಳು" : "My Orders", path: "/orders", icon: Icons.orders },
        { label: language === "Kannada" ? "ಕಾರ್ಟ್" : "View Cart", path: "/cart", icon: Icons.cart },
    ],
});

export default function Navbar() {
    const { userType, language, setUserType } = useAppContext();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const fontClass = language === "Kannada" ? "font-benne" : "font-lexend";
    const allItems = getMenuItems(language)[userType] || [];
    const filteredMenu = allItems.filter(item => !item.isProfile);

    const handleNav = (path) => { navigate(path); setIsDrawerOpen(false); };
    const handleLogout = () => { setUserType(null); setIsDrawerOpen(false); navigate("/"); };

    return (
        <>
            {/* ── NAVBAR ── */}
            <nav className={`fixed top-0 left-0 w-full z-40 ${fontClass}`}>
                <div className="bg-white/80 backdrop-blur-xl px-5 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <p className="  text-xl font-extrabold font-lexend">UNNATI</p>
                    </div>
                    <button onClick={() => setIsDrawerOpen(true)} className="w-9 h-9 flex items-center justify-center">
                        {Icons.menu}
                    </button>
                </div>
            </nav>

            {/* ── BOTTOM DRAWER ── */}
            <div className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${isDrawerOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setIsDrawerOpen(false)} />

            <div className={`fixed bottom-0 left-0 w-full bg-white rounded-t-2xl z-50 shadow-2xl transform transition-transform duration-300 ease-out ${fontClass} ${isDrawerOpen ? "translate-y-0" : "translate-y-full"}`}>
                <div className="flex justify-center pt-3 pb-2"><div className="w-10 h-1 bg-zinc-200 rounded-full" /></div>

                {/* ALIGNED User Info Header */}
                {userType && (
                    <div className="px-3"> {/* Outer wrapper to match menu container */}
                        <div className="px-2 py-3 bg-zinc-50 rounded-xl flex items-center gap-3 cursor-pointer active:bg-zinc-100 transition-colors" onClick={() => handleNav("/profile")}>
                            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white flex-shrink-0">
                                {Icons.profile}
                            </div>
                            <div className="flex flex-col leading-tight">
                                <span className="text-[13px] font-lexend font-bold text-black tracking-tight">{userType}</span>
                                <span className="text-[10px] font-lexend text-zinc-400 uppercase tracking-wide">
                                    {language === "Kannada" ? "ಪ್ರೊಫೈಲ್ ವೀಕ್ಷಿಸಿ" : "View Profile"}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* List Items */}
                <div className="px-3 pb-1 mt-1">
                    {filteredMenu.map((item, i) => (
                        <button key={i} onClick={() => handleNav(item.path)} className="w-full flex items-center gap-3 px-2 py-2.5 rounded-xl active:bg-zinc-50 transition-colors text-left">
                            <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-600 flex-shrink-0">
                                {item.icon}
                            </div>
                            <span className={`font-semibold text-black flex-1 ${language === "Kannada" ? "text-base font-benne" : "text-sm font-lexend"}`}>
                                {item.label}
                            </span>
                            <svg className="text-zinc-300" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                        </button>
                    ))}
                </div>

                {/* Aligned Sign Out */}
                <div className="px-3 pb-8 pt-1">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-2 py-3 rounded-xl bg-red-50 active:bg-red-100 transition-colors text-left">
                        <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center text-white flex-shrink-0">
                            {Icons.signout}
                        </div>
                        <span className="text-sm font-lexend font-bold text-red-600">
                            {language === "Kannada" ? "ನಿರ್ಗಮಿಸಿ" : "Sign Out"}
                        </span>
                    </button>
                </div>
            </div>
        </>
    );
}