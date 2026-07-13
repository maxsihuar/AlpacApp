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

}

module.exports = new MessageController();