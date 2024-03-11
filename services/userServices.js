import User from "../models/User.js";

export const findUser = (filter) => {
  return User.findOne(filter);
};

export const findUserById = (id) => {
  return User.findById(id);
};

export const setSubscription = (id, subscription) => {
  return User.findByIdAndUpdate(id, { subscription });
};

export const updateUserAvatar = async (userId, avatarURL) => {
    return User.findByIdAndUpdate(userId, { avatarURL }, { new: true });
  };