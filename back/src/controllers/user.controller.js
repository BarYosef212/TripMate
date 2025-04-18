import * as UserServices from '../services/user.service.js';
import HTTP from '../constants/status.js';
import sendErrorResponse from '../utils/errorHandler.js'
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserServices.login(email, password);
    if (!user) {
      return sendErrorResponse(res, HTTP.StatusCodes.UNAUTHORIZED, 'Invalid email or password');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 3600000,
    });


    return res.sendStatus(HTTP.StatusCodes.OK)
  } catch (error) {
    return sendErrorResponse(res, HTTP.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to login');
  }
};

export const register = async (req, res) => {
  try {
    const user = await UserServices.createUser(req.body);
    return res.sendStatus(HTTP.StatusCodes.CREATED).json(user);
  } catch (error) {
    return sendErrorResponse(
      res,
      HTTP.StatusCodes.BAD_REQUEST,
      'Error in register',
      error
    );
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await UserServices.getUser(req.params.userId);
    if (!user) {
      return sendErrorResponse(
        res,
        HTTP.StatusCodes.NOT_FOUND,
        'User not found'
      );
    }
    return res.status(HTTP.StatusCodes.OK).json(user);
  } catch (error) {
    return sendErrorResponse(
      res,
      HTTP.StatusCodes.BAD_REQUEST,
      'Error in getUser',
      error
    );
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await UserServices.deleteUser(req.body.userId);
    if (!deleted) {
      return sendErrorResponse(
        res,
        HTTP.StatusCodes.NOT_FOUND,
        'User not found for deletion'
      );
    }
    return res.sendStatus(HTTP.StatusCodes.OK).json({ message: 'User deleted' });
  } catch (error) {
    return sendErrorResponse(
      res,
      HTTP.StatusCodes.BAD_REQUEST,
      'Error in deleteUser',
      error
    );
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId, userData } = req.body;
    const user = await UserServices.updateUser(userId, userData);
    if (!user) {
      return sendErrorResponse(
        res,
        HTTP.StatusCodes.NOT_FOUND,
        'User not found for update'
      );
    }
    return res.sendStatus(HTTP.StatusCodes.OK).json(user);
  } catch (error) {
    return sendErrorResponse(
      res,
      HTTP.StatusCodes.BAD_REQUEST,
      'Error in updateUser',
      error
    );
  }
};
