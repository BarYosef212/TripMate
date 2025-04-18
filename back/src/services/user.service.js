import User from '../models/user.model.js'
import bcrypt from 'bcrypt'

export const login = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User doesn't exist");

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) throw new Error("Email or Password not valid");

    return user;
  } catch (error) {
    throw error;
  }
};


export const createUser = async (userData) => {
  try {
    const existEmail = await User.findOne({ email: userData.email });
    if (existEmail) throw new Error("User with this email already exists");

    const salt = await bcrypt.genSalt(10);
    userData.passwordHash = await bcrypt.hash(userData.password, salt);
    delete userData.password;

    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
}

export const deleteUser = async (userId) => {
  try {
    return await User.findByIdAndDelete(userId)
  } catch (error) {
    throw error
  }
}

export const updateUser = async(userId,userData) => {
  try {
    return await User.findByIdAndUpdate(userId,userData,{new:true})
  } catch (error) {
    throw error
  }
}

export const getUser = async(userId) => {
  try {
    return await User.findById(userId)
  } catch (error) {
    throw error
  }
}