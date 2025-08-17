import { camelCase, upperFirst } from "es-toolkit/compat";

export const convertPascalCase = (value: string) => {
  return upperFirst(camelCase(value));
};
