import contactsServices from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const result = await contactsServices.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsServices.getContactById(id);
    if (!result) {
      const error = new Error(`Contact with id=${id} not found`);
      error.status = 404;
      throw error;
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
};

export const createContact = (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
};

export const updateContact = (req, res, next) => {};
