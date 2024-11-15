import { StringsDTO, NumbersDTO, PersonDTO } from "../DTOs/personsDTOs";

export const validateEmptyParams = (params: PersonDTO): void => {
  for (const value in params) {
    if (!params[value as keyof PersonDTO])
      throw Error(`Missing field: ${value}`);
  }
};

export const validateStrings = (params: StringsDTO): void => {
  const regex = /^[A-Za-z]+$/;

  for (const value in params) {
    if (!regex.test(params[value as keyof StringsDTO])) {
      throw Error(
        `${value} field can only have characters, no spaces, numbers or special characters`
      );
    }
  }
};

export const validateNumbers = (params: NumbersDTO): void => {
  const regex = /^[0-9]+$/;

  for (const value in params) {
    const key = params[value as keyof NumbersDTO];
    if (!regex.test(String(key))) {
      throw Error(
        `${value} field can only have numbers, no spaces, letters or special characters`
      );
    }
  }
};
