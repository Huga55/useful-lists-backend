import i18next from "i18next";
import Backend from "i18next-node-fs-backend";
import i18nextMiddleware from "i18next-express-middleware";

const i18n = () => {
  i18next
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
      backend: {
        loadPath: `${__dirname}/../locales/{{lng}}/translation.json`,
      },
      fallbackLng: "ru",
      preload: ["en", "ru"],
    });
};

export default i18n;
