import i18next from "i18next";
import global_es from "./translations/es/global.json";
import global_en from "./translations/en/global.json";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  es: {
    global: global_es,
  },
  en: {
    global: global_en,
  },
};

const lng = localStorage.getItem("lng");

i18next.init({
  interpolation: { escapeValue: false },
  lng: lng ? lng : "es",
  resources,

  // keySeparator: false, // we do not use keys in form messages.welcome
});

export default i18next;
