import PersonData from "../interfaces/PersonInterface";
import { PersonDTO } from "../DTOs/personsDTOs";
import { v4 } from "uuid";

let data: Array<PersonData> = [];

// data.push({ id: v4(), name: "Jhon", lastName: "Doe", age: 30 });
// data.push({ id: v4(), name: "Jane", lastName: "Doe", age: 25 });

export const createDataService = ({ name, age, lastName }: PersonDTO): void => {
  data.push({ id: v4(), name, lastName, age });
};

export const getAllDataService = (): Array<PersonData> => {
  if (data.length === 0) {
    throw Error("Data not found");
  } else return data;
};

export const getDataByIdService = (id: string): PersonData => {
  const dataById = data.find((person) => String(person.id) === id);

  if (!dataById) {
    throw Error("Person not found");
  } else return dataById;
};

export const updateDataByIdService = (
  id: string,
  { name, age, lastName }: PersonDTO
): void | string => {
  let nameAux: string;
  let lastNameAux: string;

  const dataById: PersonData | undefined = data.find(
    (person) => person.id === id
  );

  if (!dataById) {
    throw Error("Person not found");
  } else {
    nameAux = dataById.name;
    lastNameAux = dataById.lastName;

    dataById.name = name;
    dataById.lastName = lastName;
    dataById.age = age;
  }
  return `${nameAux} ${lastNameAux} was updated, new data: name: ${dataById.name}, lastName: ${dataById.lastName}, age: ${dataById.age}`;
};

export const deleteDataByIdService = (id: string): void | string => {
  const dataById = data.find((person) => person.id === id);

  if (!dataById) {
    throw Error("Person not found");
  } else {
    data = data.filter((person) => person.id !== id);
  }

  return `${dataById.name} ${dataById.lastName} was deleted`;
};
