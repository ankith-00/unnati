import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "../context/AppContext";

const MicIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
    </svg>
);

export default function VoiceAssistant() {
    const { language } = useAppContext();
    const [isListening, setIsListening] = useState(false);
    const [volume, setVolume] = useState(0);

    // Audio API Refs
    const audioContextRef = useRef(null);
    const analyzerRef = useRef(null);
    const dataArrayRef = useRef(null);
    const animationFrameRef = useRef(null);

    const t = {
        prompt: language === "Kannada" ? "ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?" : "How can I help you?",
        listening: language === "Kannada" ? "ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ..." : "Listening...",
        tapToStart: language === "Kannada" ? "ಮಾತನಾಡಲು ಒತ್ತಿರಿ" : "Tap to speak",
        permissionDeny: language === "Kannada" ? "ಮೈಕ್ರೊಫೋನ್ ಅನುಮತಿ ಅಗತ್ಯವಿದೆ" : "Microphone permission required"
    };

    const startAudioEngine = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            // Initialize Web Audio API
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            analyzerRef.current = audioContextRef.current.createAnalyser();
            const source = audioContextRef.current.createMediaStreamSource(stream);

            analyzerRef.current.fftSize = 64; // Smaller size for smoother bar animations
            source.connect(analyzerRef.current);

            const bufferLength = analyzerRef.current.frequencyBinCount;
            dataArrayRef.current = new Uint8Array(bufferLength);

            setIsListening(true);
            updateAnimation();
        } catch (err) {
            console.error("Error accessing microphone:", err);
            alert(t.permissionDeny);
        }
    };

    const stopAudioEngine = () => {
        setIsListening(false);
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        if (audioContextRef.current) audioContextRef.current.close();
        setVolume(0);
    };

    const updateAnimation = () => {
        if (!analyzerRef.current) return;

        analyzerRef.current.getByteFrequencyData(dataArrayRef.current);

        // Calculate average volume from frequency data
        let sum = 0;
        for (let i = 0; i < dataArrayRef.current.length; i++) {
            sum += dataArrayRef.current[i];
        }
        const average = sum / dataArrayRef.current.length;

        // Map average volume (0-255) to a simpler 0-100 scale
        setVolume(average > 10 ? average : 0);

        animationFrameRef.current = requestAnimationFrame(updateAnimation);
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => stopAudioEngine();
    }, []);

    const toggleMic = () => {
        if (isListening) {
            stopAudioEngine();
        } else {
            startAudioEngine();
        }
    };

    // Calculate height based on real volume data
    const getBarHeight = (base) => {
        if (!isListening || volume === 0) return 6;
        // baseWeight * (normalized volume) + small random jitter for organic feel
        return Math.max(6, (volume / 100) * base + (Math.random() * 5));
    };

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-end bg-white/95 backdrop-blur-md transition-all duration-500">

            <div className="flex-1 flex flex-col items-center justify-center w-full px-10 text-center">
                <div className={`mb-6 px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase transition-all duration-300 ${volume > 20 ? 'bg-emerald-100 text-emerald-600' : 'bg-zinc-100 text-zinc-400'}`}>
                    {volume > 20 ? 'Speaking' : 'Listening...'}
                </div>

                <h2 className={`text-zinc-900 text-3xl font-black mb-4 transition-all duration-500 ${isListening ? 'opacity-100' : 'opacity-40'}`}>
                    {isListening ? t.listening : t.prompt}
                </h2>

                <p className="text-zinc-400 font-medium text-base font-lexend">
                    {isListening ? "" : t.tapToStart}
                </p>
            </div>

            {/* Bars sync with 'volume' variable driven by Real Audio */}
            <div className="flex items-center justify-center gap-2 h-32 mb-12">
                {[40, 70, 110, 70, 40].map((baseWeight, i) => (
                    <div
                        key={i}
                        style={{ height: `${getBarHeight(baseWeight)}px` }}
                        className={`w-2.5 rounded-full transition-all duration-75 ease-out ${volume > 15 ? 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'bg-zinc-200'
                            }`}
                    />
                ))}
            </div>

            <div className="relative mb-24">
                {volume > 25 && (
                    <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20 scale-150" />
                )}

                <button
                    onClick={toggleMic}
                    className={`relative z-10 w-24 h-24 flex items-center justify-center rounded-full transition-all duration-500 transform active:scale-90 ${isListening
                            ? 'bg-emerald-600 text-white shadow-[0_20px_50px_rgba(16,185,129,0.3)]'
                            : 'bg-zinc-100 text-zinc-400 border border-zinc-200'
                        }`}
                >
                    <MicIcon />
                </button>
            </div>

            <div className="pb-10 font-lexend text-zinc-400 text-[9px] font-bold uppercase tracking-[0.4em]">
                {language === "Kannada" ? "ಧ್ವನಿ ನಿಯಂತ್ರಣ ಸಕ್ರಿಯವಾಗಿದೆ" : "Real-time Voice Sync Active"}
            </div>
        </div>
    );
}