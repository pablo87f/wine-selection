const DEFAULT_COLOR = "blue";
const SEPARETOR = " | ";
export const AC_COLOR_WHEEL = [
  "#b170ff",
  "#ff61c9",
  "#ff5166",
  "#f5aa38",
  "#aa8b6f",
  "#37c18d",
  "#0095f4",
];

type ColorfulContent = {
  content: any;
  color?: string;
};

type LogPattern = {
  pattern: string;
  params: any[];
};

const LogUtils = {
  logColor: (...contentsWithColors: ColorfulContent[]): void => {
    const initialLogPattern: LogPattern = { pattern: "", params: [] };
    const pattern = contentsWithColors.reduce<LogPattern>(
      (prevPattern: LogPattern, currentContent: ColorfulContent) => {
        const newStrPattern = `${prevPattern.pattern}${SEPARETOR}%c%s`;
        const newParamsPattern = [
          ...prevPattern.params,
          `color: ${currentContent?.color || DEFAULT_COLOR}`,
          currentContent.content,
        ];
        return { pattern: newStrPattern, params: newParamsPattern };
      },
      initialLogPattern
    );
    // eslint-disable-next-line no-console
    console.log(pattern.pattern, ...pattern.params);
  },

  log: (...contents: any[]): void => {
    if (contents && Array.isArray(contents)) {
      const initialLogPattern: LogPattern = { pattern: "", params: [] };
      const pattern = contents.reduce<LogPattern>(
        (prevPattern: LogPattern, currentContent: any, index: number) => {
          const newStrPattern = `${prevPattern.pattern}%c%s${SEPARETOR}`;
          const color = `color: ${
            AC_COLOR_WHEEL[index % AC_COLOR_WHEEL.length]
          }`;
          const newParamsPattern = [
            ...prevPattern.params,
            color,
            currentContent,
          ];
          return { pattern: newStrPattern, params: newParamsPattern };
        },
        initialLogPattern
      );
      // eslint-disable-next-line no-console
      console.log(pattern.pattern, ...pattern.params);
    }
  },
};

export default LogUtils;
