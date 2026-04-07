import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const translations = {
    English: {
        selectLanguage: "Select Language",
        selectUserType: "Select User Type",
        farmer: "Farmer",
        machineryOwner: "Machinery Owner",
        consumer: "Consumer",
        continue: "Continue",
        next: "Next",
        back: "Back",
        login: "Login",
        email: "Email",
        password: "Password",
        userType: "User Type",
        language: "Language",
        step: "Step",
        of: "of",
    },
    Kannada: {
        selectLanguage: "ಭಾಷೆ ಆಯ್ಕೆ ಮಾಡಿ",
        selectUserType: "ಬಳಕೆದಾರ ಪ್ರಕಾರ ಆಯ್ಕೆ ಮಾಡಿ",
        farmer: "ರೈತ",
        machineryOwner: "ಯಂತ್ರ ಮಾಲೀಕ",
        consumer: "ಗ್ರಾಹಕ",
        continue: "ಮುಂದುವರಿಯಿರಿ",
        next: "ಮುಂದೆ",
        back: "ಹಿಂದೆ",
        login: "ಲಾಗಿನ್",
        email: "ಇಮೇಲ್",
        password: "ಪಾಸ್‌ವರ್ಡ್",
        userType: "ಬಳಕೆದಾರ ಪ್ರಕಾರ",
        language: "ಭಾಷೆ",
        step: "ಹಂತ",
        of: "ರಲ್ಲಿ",
    },
};

export const AppProvider = ({ children }) => {
    // Read from localStorage on first load, fall back to null
    const [language, setLanguageState] = useState(
        () => localStorage.getItem("agro_language") || null
    );
    const [userType, setUserTypeState] = useState(
        () => localStorage.getItem("agro_userType") || null
    );

    // Wrap setters to also write to localStorage
    const setLanguage = (val) => {
        if (val) localStorage.setItem("agro_language", val);
        else localStorage.removeItem("agro_language");
        setLanguageState(val);
    };

    const setUserType = (val) => {
        if (val) localStorage.setItem("agro_userType", val);
        else localStorage.removeItem("agro_userType");
        setUserTypeState(val);
    };

    const t = translations[language] || translations["English"];

    return (
        <AppContext.Provider value={{ language, setLanguage, userType, setUserType, t }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);