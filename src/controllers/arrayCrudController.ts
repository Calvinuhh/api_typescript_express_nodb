import { Request, Response } from "express";

import {
  getAllDataService,
  createDataService,
  getDataByIdService,
  updateDataByIdService,
  deleteDataByIdService,
} from "../services/arrayDataServices";

import {
  validateEmptyParams,
  validateStrings,
  validateNumbers,
} from "../utils/validation";

import { PersonDTO } from "../DTOs/personsDTOs";

export const createDataController = (req: Request, res: Response): void => {
  try {
    const { name, age, lastName }: PersonDTO = req.body;

    validateEmptyParams({ name, age, lastName });
    validateStrings({ name, lastName });
    validateNumbers({ age });

    createDataService({ name, age, lastName });
    res.status(201).json({ "data created": { name, age, lastName } });
  } catch (error) {
    const err = error as Error;
    res.status(400).json(err.message);
  }
};

export const getAllDataController = (req: Request, res: Response): void => {
  try {
    res.status(200).json(getAllDataService());
  } catch (error) {
    const err = error as Error;
    res.status(404).json(err.message);
  }
};

export const getDataByIdController = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;

    res.status(200).json(getDataByIdService(id));
  } catch (error) {
    const err = error as Error;
    res.status(404).json(err.message);
  }
};

export const updateByIdController = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const { name, age, lastName } = req.body;

    validateEmptyParams({ name, age, lastName });
    validateStrings({ name, lastName });
    validateNumbers({ age });

    res.status(201).json(updateDataByIdService(id, { name, age, lastName }));
  } catch (error) {
    const err = error as Error;
    res.status(404).json(err.message);
  }
};

export const deleteByIdController = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;

    res.status(200).json(deleteDataByIdService(id));
  } catch (error) {
    const err = error as Error;
    res.status(404).json(err.message);
  }
};
