import i18next from "i18next";
import {initReactI18next} from "react-i18next";

export const GAME_NAMESPACE = 'game';

const missingGameTranslations = {
    "cat_material": "Raw material",
};

export function initI18n(gameLocales: any) {
    i18next.use(initReactI18next)
        .init({
            fallbackLng: 'en',
            debug: true,
            resources: {
                en: {
                    [GAME_NAMESPACE]: {...gameLocales, ...missingGameTranslations},
                },
            },
            interpolation: {
                escapeValue: false,
            },
        });
}