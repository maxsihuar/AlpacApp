const Message = require("../models/message.model");
const { getDatabase } = require("../config/database");
const { ObjectId } = require("mongodb");
class MessageService {

    async sendMessage(senderId, receiverId, content) {
        const message = new Message(senderId, receiverId, content);
        const db = getDatabase();
        const collection = db.collection("messages");
        const result = await collection.insertOne(message);
        message._id = result.insertedId;

        return message;
    }
    async getAllMessages() {
        const db = getDatabase();
        const collection = db.collection("messages");
        const messages = await collection.find().toArray();
        return messages;
    }
    async getLastMessage(senderId, receiverId) {

        const db = getDatabase();
        const collection = db.collection("messages");

        return await collection.findOne(
            {
                $or: [
                    {
                        senderId: senderId,
                        receiverId: receiverId
                    },
                    {
                        senderId: receiverId,
                        receiverId: senderId
                    }
                ]
            },
            {
                sort: { sentAt: -1 }
            }
        );
    }
    async getConversation(senderId, receiverId) {
        const db = getDatabase();
        const collection = db.collection("messages");
        const messages = await collection.find({
            $or: [
                {
                    senderId: senderId,
                    receiverId: receiverId
                },
                {
                    senderId: receiverId,
                    receiverId: senderId
                }
            ]
        }).toArray();
        return messages;
    }
    async markAsRead(messageId) {
        const db = getDatabase();
        const collection = db.collection("messages");
        const result = await collection.updateOne(
            {
                _id: new ObjectId(messageId)
            },
            {
                $set: {
                    isRead: true
                }
            }
        );

        return result;

    }
    async deleteMessage(messageId) {
        const db = getDatabase();
        const collection = db.collection("messages");
        const result = await collection.deleteOne({
            _id: new ObjectId(messageId)
        })
        return result;
    }
    async getMessageLive(data, currentSocket, websocketServer) {

        try {
            const { senderId, receiverId, content } = data;

            const message = new Message(senderId, receiverId, content);
            const db = getDatabase();
            const collection = db.collection("messages");
            
            const result = await collection.insertOne(message);
            message._id = result.insertedId;

            let active = false;
            websocketServer.clients.forEach((client) => {
                if (String(client.userId) === String(receiverId) && client.readyState === currentSocket.OPEN) {
                    active = true;
                }
            });

            message.isRead = active;

            currentSocket.send(JSON.stringify({ event: "message_sent", data: message }));

            const payload = JSON.stringify({
                event: "new_message",
                data: message
            });

            
            websocketServer.clients.forEach((client) => {
                const esDestinatario = String(client.userId) === String(receiverId);
                const esEmisorEnOtraPestana = String(client.userId) === String(senderId) && client !== currentSocket;

                if ((esDestinatario || esEmisorEnOtraPestana) && client.readyState === currentSocket.OPEN) {
                    client.send(payload);
                    
                }
            });

        } catch (error) {
            console.log("Error al realizar la peticion", error)
        }
    }

}
module.exports = new MessageService();