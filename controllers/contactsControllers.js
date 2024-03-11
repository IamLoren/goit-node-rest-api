import * as contactsService from "../services/contactsServices.js";
import fs from "fs/promises";
import path from "path";
import HttpError from "../helpers/HttpError.js";
import ctrWrapper from "../decorators/ctrWrapper.js";

const contactsDir = path.resolve("public", "contacts");

export const getAllContacts = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

export const deleteContact = (req, res) => {
  const { id } = req.params;
  const result = contactsService.removeContact(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

export const createContact = async (req, res) => {
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(contactsDir, filename);
  await fs.rename(oldPath, newPath);

  const { _id: owner } = req.user;
  const photo = path.join("contacts", filename);
  const result = await contactsService.addContact({ ...req.body, photo, owner });

  res.status(201).json(result);
};

export const updateContact = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, (message = "Body must have at least one field"));
  }
  const { id } = req.params;
  const result = await contactsService.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

export const updateStatusContact = async (rec, res) => {
  const { id } = req.params;
  const result = await contactsService.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

export default {
  getAllContacts: ctrWrapper(getAllContacts),
  getOneContact: ctrWrapper(getOneContact),
  createContact: ctrWrapper(createContact),
  updateContact: ctrWrapper(updateContact),
  deleteContact: ctrWrapper(deleteContact),
  updateStatusContact: ctrWrapper(updateStatusContact),
};
