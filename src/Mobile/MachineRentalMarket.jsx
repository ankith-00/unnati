import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// ── Machines Data (10 Items) ───────────────────────────────────────────────
const listingsData = [
    {
        id: 1,
        name: { en: "John Deere 5050D", kn: "ಜಾನ್ ಡಿಯರ್ 5050D" },
        info: { en: "50 HP, Dual Clutch, Power Steering. Perfect for plowing.", kn: "50 HP, ಡ್ಯುಯಲ್ ಕ್ಲಚ್. ಉಳುವಿಕೆಗೆ ಸೂಕ್ತವಾಗಿದೆ." },
        images: [
            "https://images.unsplash.com/photo-1592919016383-40749ec45942?q=80&w=600",
            "https://images.unsplash.com/photo-1530263303783-65996024926f?q=80&w=600",
            "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=600"
        ],
        tags: [{ label: { en: "FEATURED", kn: "ವಿಶೇಷ" }, color: "bg-emerald-600 text-white" }],
        specs: [{ label: { en: "Rate", kn: "ದರ" }, value: "₹2,500/Ha" }, { label: { en: "HP", kn: "ಎಚ್ಪಿ" }, value: "50" }]
    },
    {
        id: 2,
        name: { en: "New Holland 3630", kn: "ನ್ಯೂ ಹಾಲೆಂಡ್ 3630" },
        info: { en: "Turbo Super technology. Reliable for all tasks.", kn: "ಟರ್ಬೊ ಸೂಪರ್ ತಂತ್ರಜ್ಞಾನ. ಎಲ್ಲದಕ್ಕೂ ವಿಶ್ವಾಸಾರ್ಹ." },
        images: [
            "https://images.unsplash.com/photo-1627993074092-b437c35d6f51?q=80&w=600",
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600",
            "https://images.unsplash.com/photo-1533560272481-9b7e7197171e?q=80&w=600"
        ],
        tags: [{ label: { en: "POPULAR", kn: "ಜನಪ್ರಿಯ" }, color: "bg-red-600 text-white" }],
        specs: [{ label: { en: "Rate", kn: "ದರ" }, value: "₹2,800/Ha" }, { label: { en: "Power", kn: "ಶಕ್ತಿ" }, value: "55HP" }]
    },
    {
        id: 7,
        name: { en: "Kubota L4508", kn: "ಕುಬೋಟಾ L4508" },
        info: { en: "Japanese technology for wetland puddling.", kn: "ಜಪಾನೀಸ್ ತಂತ್ರಜ್ಞಾನ." },
        images: [
            "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=600",
            "https://images.unsplash.com/photo-1550985543-f47f38aee65e?q=80&w=600",
            "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=600"
        ],
        tags: [{ label: { en: "4WD", kn: "4WD" }, color: "bg-cyan-600 text-white" }],
        specs: [{ label: { en: "Rate", kn: "ದರ" }, value: "₹2,200/Ha" }, { label: { en: "Dry/Wet", kn: "ಒಣ/ತೇವ" }, value: "Both" }]
    },
    {
        id: 8,
        name: { en: "Power Tiller 15HP", kn: "ಪವರ್ ಟಿಲ್ಲರ್ 15HP" },
        info: { en: "Handheld plowing for small vegetable farms.", kn: "ಸಣ್ಣ ತರಕಾರಿ ತೋಟಗಳಿಗೆ ಕೈಯಲ್ಲಿ ಹಿಡಿಯುವ ಉಳುವ ಯಂತ್ರ." },
        images: [
            "https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?q=80&w=600",
            "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=600",
            "https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?q=80&w=600"
        ],
        tags: [{ label: { en: "ECONOMY", kn: "ಮಿತವ್ಯಯ" }, color: "bg-zinc-500 text-white" }],
        specs: [{ label: { en: "Rate", kn: "ದರ" }, value: "₹500/Hr" }, { label: { en: "Fuel", kn: "ಇಂಧನ" }, value: "Diesel" }]
    },
    {
        id: 9,
        name: { en: "Massey Ferguson 241", kn: "ಮ್ಯಾಸ್ಸೆ ಫರ್ಗುಸನ್ 241" },
        info: { en: "Versatile tractor for haulage and cultivation.", kn: "ಸಾಗಾಣಿಕೆ ಮತ್ತು ಸಾಗುವಳಿಗೆ ಬಹುಮುಖ ಟ್ರ್ಯಾಕ್ಟರ್." },
        images: [
            "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=600",
            "https://images.unsplash.com/photo-1495107336059-ed258722b3a7?q=80&w=600",
            "https://images.unsplash.com/photo-1502394202744-021cfbb17454?q=80&w=600"
        ],
        tags: [{ label: { en: "CLASSIC", kn: "ಕ್ಲಾಸಿಕ್" }, color: "bg-amber-600 text-white" }],
        specs: [{ label: { en: "Rate", kn: "ದರ" }, value: "₹2,400/Ha" }, { label: { en: "Location", kn: "ಸ್ಥಳ" }, value: "Mysuru" }]
    },
    {
        id: 10,
        name: { en: "Baler Machine", kn: "ಬೇಲರ್ ಯಂತ್ರ" },
        info: { en: "Clean up straw after harvest quickly.", kn: "ಕೊಯ್ಲು ಮಾಡಿದ ನಂತರ ಹುಲ್ಲನ್ನು ಬೇಗನೆ ಸ್ವಚ್ಛಗೊಳಿಸಿ." },
        images: [
            "https://images.unsplash.com/photo-1594391627918-062e24ba8958?q=80&w=600",
            "https://images.unsplash.com/photo-1593113616828-6f22bca04804?q=80&w=600",
            "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=600"
        ],
        tags: [{ label: { en: "FAST", kn: "ವೇಗದ" }, color: "bg-teal-600 text-white" }],
        specs: [{ label: { en: "Rate", kn: "ದರ" }, value: "₹10/Bundle" }, { label: { en: "Type", kn: "ವಿಧ" }, value: "Square" }]
    }
];

// ── Icons ──────────────────────────────────────────────────────────
const CallIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>;
const BookIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;

export default function MachineListings() {
    const { language } = useAppContext();
    const [itemsToShow, setItemsToShow] = useState(4); // Pagination Logic

    const fontClass = language === "Kannada" ? "font-benne" : "font-lexend";

    const t = {
        book: language === "Kannada" ? "ಬುಕ್ ಮಾಡಿ" : "Book Now",
        call: language === "Kannada" ? "ಕರೆ ಮಾಡಿ" : "Call Owner",
        heading: language === "Kannada" ? "ಬಾಡಿಗೆಗೆ ಲಭ್ಯವಿರುವ ಯಂತ್ರಗಳು" : "Available for Rent",
        showMore: language === "Kannada" ? "ಇನ್ನಷ್ಟು ನೋಡಿ" : "Show More",
        allLoaded: language === "Kannada" ? "ಎಲ್ಲಾ ಫಲಿತಾಂಶಗಳು" : "No more results"
    };

    const displayedMachines = listingsData.slice(0, itemsToShow);

    return (
        <div className={`px-5 w-full mt-10 pb-20 ${fontClass}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className={`text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400`}>
                    {t.heading}
                </h2>
                <div className="h-[1px] flex-1 bg-zinc-100 ml-4"></div>
            </div>

            {/* List */}
            <div className="flex flex-col gap-6">
                {displayedMachines.map((machine) => {
                    const name = language === "Kannada" ? machine.name.kn : machine.name.en;
                    const info = language === "Kannada" ? machine.info.kn : machine.info.en;

                    return (
                        <div key={machine.id} className="bg-white border border-zinc-100 rounded-xl overflow-hidden shadow-sm">
                            <div className="relative group">
                                <Swiper
                                    modules={[Pagination]}
                                    pagination={{ clickable: true }}
                                    className="h-52 w-full"
                                >
                                    {machine.images.map((img, index) => (
                                        <SwiperSlide key={index}>
                                            <img src={img} alt={name} className="w-full h-full object-cover" />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
                                    {machine.tags.map((tag, i) => (
                                        <span key={i} className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider ${tag.color} shadow-sm font-lexend`}>
                                            {language === "Kannada" ? tag.label.kn : tag.label.en}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="p-4">
                                <h3 className={`text-lg font-extrabold text-zinc-900 ${language === "Kannada" ? "text-xl" : ""}`}>
                                    {name}
                                </h3>
                                <p className={`text-xs text-zinc-500 mt-1 line-clamp-2 ${language === "Kannada" ? "text-sm" : ""}`}>
                                    {info}
                                </p>

                                <div className="flex items-center gap-2 flex-wrap mt-4">
                                    {machine.specs.map((spec, i) => (
                                        <div key={i} className="bg-zinc-50 border border-zinc-100 px-3 py-1.5 rounded-lg flex flex-col items-start font-lexend">
                                            <span className="text-[7px] text-zinc-400 font-bold uppercase">{language === "Kannada" ? spec.label.kn : spec.label.en}</span>
                                            <span className="text-xs font-black text-zinc-900">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 gap-2 mt-5">
                                    <button className="flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-lg font-bold text-xs active:scale-95 transition-all shadow-sm font-lexend">
                                        <BookIcon /> {t.book}
                                    </button>
                                    <button className="flex items-center justify-center gap-2 px-4 py-3 border border-zinc-200 text-zinc-900 rounded-lg font-bold text-xs active:scale-95 active:bg-zinc-50 transition-all font-lexend">
                                        <CallIcon /> {t.call}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Pagination Button */}
            <div className="mt-10 flex justify-center">
                {itemsToShow < listingsData.length ? (
                    <button
                        onClick={() => setItemsToShow(prev => prev + 4)}
                        className="px-8 py-3 border-2 border-zinc-900 text-zinc-900 rounded-xl font-black text-[10px] uppercase tracking-widest active:bg-zinc-900 active:text-white transition-all font-lexend"
                    >
                        {t.showMore}
                    </button>
                ) : (
                    <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest font-lexend">
                        {t.allLoaded}
                    </span>
                )}
            </div>
        </div>
    );
}