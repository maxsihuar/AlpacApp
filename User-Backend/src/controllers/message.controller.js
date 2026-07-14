const messageService = require("../services/message.service");

class MessageController {

    async sendMessage(request, reply) {

        try {

            const { senderId, receiverId, content } = request.body;

            const message = await messageService.sendMessage(
                senderId,
                receiverId,
                content
            );

            return reply.code(201).send(message);

        }
        catch (error) {

            console.error(error);

            return reply.code(500).send({
                message: "Error al enviar el mensaje."
            });

        }

    }
    async getAllMessages(request, reply) {
        try {
            const messages = await messageService.getAllMessages();

            return reply.code(200).send(messages);
        }
        catch (error) {
            console.error(error);
            return reply.code(500).send({
                message: "Error al obtener los mensajes."
            });
        }
    }

    async getConversation(request, reply) {
        try {
            const messages = await messageService.getConversation(Number(request.params.senderId), Number(request.params.receiverId))
            return reply.code(200).send(messages);
        }
        catch (error) {
            console.error(error);
            return reply.code(500).send({
                message: "Error al obtener la conversación."
            });
        }
    }
}

module.exports = new MessageController();