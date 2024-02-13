"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AC_COLOR_WHEEL = void 0;
const DEFAULT_COLOR = "blue";
const SEPARETOR = " | ";
exports.AC_COLOR_WHEEL = [
    "#b170ff",
    "#ff61c9",
    "#ff5166",
    "#f5aa38",
    "#aa8b6f",
    "#37c18d",
    "#0095f4",
];
const LogUtils = {
    logColor: (...contentsWithColors) => {
        const initialLogPattern = { pattern: "", params: [] };
        const pattern = contentsWithColors.reduce((prevPattern, currentContent) => {
            const newStrPattern = `${prevPattern.pattern}${SEPARETOR}%c%s`;
            const newParamsPattern = [
                ...prevPattern.params,
                `color: ${(currentContent === null || currentContent === void 0 ? void 0 : currentContent.color) || DEFAULT_COLOR}`,
                currentContent.content,
            ];
            return { pattern: newStrPattern, params: newParamsPattern };
        }, initialLogPattern);
        // eslint-disable-next-line no-console
        console.log(pattern.pattern, ...pattern.params);
    },
    log: (...contents) => {
        if (contents && Array.isArray(contents)) {
            const initialLogPattern = { pattern: "", params: [] };
            const pattern = contents.reduce((prevPattern, currentContent, index) => {
                const newStrPattern = `${prevPattern.pattern}%c%s${SEPARETOR}`;
                const color = `color: ${exports.AC_COLOR_WHEEL[index % exports.AC_COLOR_WHEEL.length]}`;
                const newParamsPattern = [
                    ...prevPattern.params,
                    color,
                    currentContent,
                ];
                return { pattern: newStrPattern, params: newParamsPattern };
            }, initialLogPattern);
            // eslint-disable-next-line no-console
            console.log(pattern.pattern, ...pattern.params);
        }
    },
};
exports.default = LogUtils;
