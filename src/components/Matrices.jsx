import { useAppContext } from "../context/AppContext";

// ── Shared Metric Card Component ──────────────────────────────────────────────
const MetricCard = ({ label, value, unit, icon, color }) => (
    <div className="bg-white border border-zinc-100 p-4 rounded-2xl shadow-sm flex flex-col gap-3 active:bg-zinc-50 transition-transform active:scale-[0.98]">
        <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center text-white shadow-sm`}>
            {icon}
        </div>
        <div>
            <p className="text-zinc-400 text-[10px] uppercase tracking-widest font-extrabold font-lexend leading-tight">
                {label}
            </p>
            <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-black text-zinc-900 font-lexend tracking-tight">{value}</span>
                {unit && <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">{unit}</span>}
            </div>
        </div>
    </div>
);

export default function MetricsContainer() {
    const { userType, language } = useAppContext();

    // ── Expanded Metrics Configuration (4 per User) ──────────────────────────
    const metricsData = {
        Farmer: [
            {
                label: language === "Kannada" ? "ಸಕ್ರಿಯ ಬುಕಿಂಗ್" : "Active Bookings",
                value: "3", unit: "items", color: "bg-emerald-500",
                icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            },
            {
                label: language === "Kannada" ? "ಒಟ್ಟು ವೆಚ್ಚ" : "Total Spent",
                value: "1,250", unit: "₹", color: "bg-emerald-600",
                icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            },
            {
                label: language === "Kannada" ? "ಪೂರ್ಣಗೊಂಡ ಕೆಲಸ" : "Work Done",
                value: "18", unit: "hours", color: "bg-emerald-400",
                icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            },
            {
                label: language === "Kannada" ? "ಸಹಾಯವಾಣಿ" : "Support",
                value: "24/7", unit: "Active", color: "bg-emerald-700",
                icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            }
        ],
        "Machinery Owner": [
            {
                label: language === "Kannada" ? "ಒಟ್ಟು ಗಳಿಕೆ" : "Total Earnings",
                value: "45,800", unit: "₹", color: "bg-blue-600",
                icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            },
            {
                label: language === "Kannada" ? "ಸಕ್ರಿಯ ಯಂತ್ರಗಳು" : "Active Units",
                value: "12", unit: "units", color: "bg-blue-500",
                icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            },
            {
                label: language === "Kannada" ? "ಬಳಕೆ ದರ" : "Utilization",
                value: "84", unit: "%", color: "bg-blue-400",
                icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
            },
            {
                label: language === "Kannada" ? "ರೇಟಿಂಗ್" : "Avg Rating",
                value: "4.9", unit: "Stars", color: "bg-blue-700",
                icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
            }
        ],
        Consumer: [
            {
                label: language === "Kannada" ? "ಒಟ್ಟು ಆರ್ಡರ್‌ಗಳು" : "Total Orders",
                value: "5", unit: "placed", color: "bg-orange-500",
                icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            },
            {
                label: language === "Kannada" ? "ಒಟ್ಟು ಉಳಿತಾಯ" : "Total Savings",
                value: "450", unit: "₹", color: "bg-orange-600",
                icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            },
            {
                label: language === "Kannada" ? "ರಿವಾರ್ಡ್ ಪಾಯಿಂಟ್ಸ್" : "Reward Points",
                value: "1,200", unit: "Pts", color: "bg-orange-400",
                icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            },
            {
                label: language === "Kannada" ? "ಸದಸ್ಯತ್ವ" : "Membership",
                value: "Gold", unit: "Tier", color: "bg-orange-700",
                icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4M7.835 4.697a.742.742 0 00-1.201 0l-1.21 1.64a.75.75 0 01-.657.305l-2.018-.122a.742.742 0 00-.742.742l.122 2.018a.75.75 0 01-.305.657l-1.64 1.21a.742.742 0 000 1.201l1.64 1.21a.75.75 0 01.305.657l-.122 2.018a.742.742 0 00.742.742l2.018-.122a.75.75 0 01.657.305l1.21 1.64a.742.742 0 001.201 0l1.21-1.64a.75.75 0 01.657-.305l2.018.122a.742.742 0 00.742-.742l-.122-2.018a.75.75 0 01.305-.657l1.64-1.21a.742.742 0 000-1.201l-1.64-1.21a.75.75 0 01-.305-.657l.122-2.018a.742.742 0 00-.742-.742l-2.018.122a.75.75 0 01-.657-.305l-1.21-1.64z" /></svg>
            }
        ]
    };

    const activeMetrics = metricsData[userType] || [];

    if (!userType) return null;

    return (
        <div className=" w-full mt-8 mb-10">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-4">
                <h2 className={`text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 font-lexend`}>
                    {language === "Kannada" ? "ನಿಮ್ಮ ಅಂಕಿಅಂಶಗಳು" : "Your Statistics"}
                </h2>
                <div className="h-[1px] flex-1 bg-zinc-100 ml-4"></div>
            </div>

            {/* Grid layout - Responsive 2-column */}
            <div className="grid grid-cols-2 gap-4">
                {activeMetrics.map((metric, index) => (
                    <MetricCard key={index} {...metric} />
                ))}
            </div>
        </div>
    );
}