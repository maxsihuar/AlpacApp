const Message = require("../models/message.model");
const { getDatabase } = require("../config/database");
class MessageService {

    async sendMessage(senderId, receiverId, content) {
        const message = new Message(senderId, receiverId, content);
        const db = getDatabase();
        const collection = db.collection("messages");
        const result = await collection.insertOne(message);
        message.id = result.insertedId;

        return message;
    }
    async getAllMessages() {
        const db = getDatabase();
        const collection = db.collection("messages");
        const messages = await collection.find().toArray();
        return messages;
    }
    async getConversation(senderId, receiverId) {
        const db = getDatabase();
        const collection = db.collection("messages");
        const messages = await collection.find({
            $or: [
                {
                    senderId : senderId,
                    receiverId :  receiverId
                },
                {
                    senderId : receiverId,
                    receiverId : senderId
                }
            ]
        }).toArray();
        return messages;
    }
}
module.exports = new MessageService();