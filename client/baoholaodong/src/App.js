import React, { useEffect, useState } from "react";
import UserRouter from "./routers/UserRouter";
import getUserLanguage from "./utils/getUserLanguage";
import { translateText } from "./utils/translate";

function App() {
    const [translations, setTranslations] = useState(null);

    useEffect(() => {
        const fetchTranslations = async () => {
            const lang = await getUserLanguage();
            const translatedWelcome = await translateText("Welcome", lang);
            const translatedLogin = await translateText("Login", lang);

            setTranslations({
                welcome: translatedWelcome,
                login: translatedLogin,
            });
        };

        fetchTranslations();
    }, []);



    return (
        <div className="App">
            <UserRouter translations={translations} />
        </div>
    );
}

export default App;
