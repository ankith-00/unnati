import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";

const carouselData = {
    Farmer: [
        { id: 1, title: "Modern Tractors", desc: "Rent by the hour", color: "bg-emerald-500" },
        { id: 2, title: "Organic Seeds", desc: "Certified quality", color: "bg-emerald-600" },
        { id: 3, title: "Weather Alerts", desc: "Real-time updates", color: "bg-emerald-700" },
    ],
    "Machinery Owner": [
        { id: 1, title: "List Your Fleet", desc: "Start earning today", color: "bg-blue-500" },
        { id: 2, title: "Smart Tracking", desc: "GPS for your machines", color: "bg-blue-600" },
        { id: 3, title: "Fast Payments", desc: "Secure transactions", color: "bg-blue-700" },
    ],
    Consumer: [
        { id: 1, title: "Fresh Harvest", desc: "Direct from farms", color: "bg-orange-500" },
        { id: 2, title: "Eco-Packaging", desc: "100% sustainable", color: "bg-orange-600" },
        { id: 3, title: "Daily Deals", desc: "Save on bulk orders", color: "bg-orange-700" },
    ],
};

export default function UserCarousel() {
    const { userType, language } = useAppContext();
    const [currentIndex, setCurrentIndex] = useState(0);

    // Get slides based on userType, fallback to Consumer if null
    const slides = carouselData[userType] || carouselData["Consumer"];

    // Automatic slide logic (2 seconds)
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 4000);

        return () => clearInterval(timer);
    }, [slides.length, userType]); // Reset timer if userType changes


    return (
        <div className="relative w-full max-w-lg mx-auto overflow-hidden rounded-lg mt-16">
            {/* Wrapper for Slides */}
            <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((slide) => (
                    <div key={slide.id} className="w-full flex-shrink-0">
                        {/* Future Image Container */}
                        <div className={`relative h-40 sm:h-40 ${slide.color} flex items-center justify-center p-8 text-white`}>
                            {/* Replace the div below with <img src={slide.image} /> later */}
                            <div className="text-center">
                                <h3 className={`text-2xl font-bold ${language === "Kannada" ? "font-benne" : "font-lexend"}`}>
                                    {slide.title}
                                </h3>
                                <p className="opacity-90 mt-2 font-lexend text-sm">
                                    {slide.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {slides.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === i ? "w-6 bg-white" : "w-1.5 bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}