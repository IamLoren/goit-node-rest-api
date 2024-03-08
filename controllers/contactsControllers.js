import contactsServices from "../services/contactsServices.js";

import {createContactSchema, updateContactSchema} from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const result = await contactsServices.listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsServices.getContactById(id);
    if (!result) {
      throw HttpError(404, `Not found`)
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await contactsServices.removeContact(id);
      if (!result) {
        throw HttpError(404, `Not found`)
      }
      res.status(200).json({message: "Delete success"});
    } catch (error) {
        next(error)
    }
};

export const createContact = async (req, res, next) => {
    try {
      const {error} = createContactSchema.validate(req.body);
      if (error) {
        throw HttpError(400, error.message);
      }
        const result = await contactsServices.addContact(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

export const updateContact = async (req, res, next) => {
  try {
    const {error} = updateContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const {id} = req.params;
      const result = await contactsServices.updateContactById(id, req.body);
      if (!result) {
        throw HttpError(404, `Not found`)
      }
      res.status(200).json(result);
  } catch (error) {
      next(error);
  }
};
