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
}
module.exports = new MessageService();