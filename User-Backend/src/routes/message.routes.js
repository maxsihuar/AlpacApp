const messageController = require("../controllers/message.controller");

async function messageRoutes(fastify, options) {

    fastify.post(
        "/messages",
        messageController.sendMessage
    );
    fastify.get(
        "/messages",
        messageController.getAllMessages
    );
    fastify.get(
        "/messages/ultimo/:senderId/:receiverId",
        messageController.getLastMessage
    );
    fastify.get(
        "/messages/conversation/:senderId/:receiverId",
        messageController.getConversation
    );
    fastify.put(
        "/messages/:id/read",
        messageController.markAsRead
    );
    fastify.delete(
        "/messages/:id",
        messageController.deleteMessage
    );
}

module.exports = messageRoutes;
