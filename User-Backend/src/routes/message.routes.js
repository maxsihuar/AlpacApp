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
        "/messages/conversation/:senderId/:receiverId",
        messageController.getConversation
    );
}

module.exports = messageRoutes;
