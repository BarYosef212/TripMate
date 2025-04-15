import Message from '../models/messege.model'

export const createMessage = async (messageData) => {
  try {
    const message = new Message(messageData);
    await message.save();
    return message;
  } catch (error) {
    throw error;
  }
}

export const deleteMessage = async (messageId) => {
  try {
    return await Message.findByIdAndDelete(messageId);
  } catch (error) {
    throw error;
  }
}

export const updateMessage = async (messageId, messageData) => {
  try {
    return await Message.findByIdAndUpdate(messageId, messageData, { new: true });
  } catch (error) {
    throw error;
  }
}

export const getMessage = async (messageId) => {
  try {
    return await Message.findById(messageId);
  } catch (error) {
    throw error;
  }
}
