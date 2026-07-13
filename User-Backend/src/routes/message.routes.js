const messageController = require("../controllers/message.controller");

async function messageRoutes(fastify, options) {

    fastify.post(
        "/messages",
        messageController.sendMessage
    );

}

module.exports = messageRoutes;