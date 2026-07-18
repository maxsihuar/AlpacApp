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

    async getLastMessage(request, reply) {
        try {
            const messages = await messageService.getLastMessage(Number(request.params.senderId), Number(request.params.receiverId))
            return reply.code(200).send(messages);
        }
        catch (error) {
            console.error(error);
            return reply.code(500).send({
                message: "Error al obtener el último mensaje."
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

    async markAsRead(request, reply) {
        try {
            const { id } = request.params;

            const result = await messageService.markAsRead(id);
            if (result.matchedCount === 0) {
                return reply.code(404).send({
                    message : "Mensaje no encontrado."
                });
            }
            return reply.code(200).send(result);
        }
        catch (error) {
            console.error(error);
            return reply.code(500).send({
                message: "Error al marcar el mensaje como leído."
            })
        }
    }
    async deleteMessage(request ,reply) {
        try {
            const { id } = request.params;
            const result = await messageService.deleteMessage(id);
            if (result.deletedCount === 0) {
                return reply.code(404).send({
                    message: "Mensaje no encontrado."
                })
            }
            return reply.code(200).send(result);
        }
        catch (error) {
            console.error(error);
            return reply.code(500).send({
                message: "Error al eliminar el mensaje."
            })
        }
    }

    async getliveMessage(socket, request) {
        const fastifyInstance = request?.server;
        const userId = Number(request.query.userId);

        if (!socket || typeof socket.on !== 'function') {
            console.error("No se recibió un socket con métodos activos.");
            return;
        }

        if (!userId) {
            console.log("Intento de conexión WebSocket sin userId");
            socket.close(4000, "userId requerido");
            return;
        }
        socket.userId = userId;
        console.log("Usuario conectado correctamente");

        socket.on("message", async (rawData) => {
            try {
                const data = JSON.parse(rawData.toString());
                const newMessage = {
                    senderId: Number(socket.userId),
                    receiverId: Number(data.receiverId),
                    content: data.content,
                    createdAt: new Date()
                };                

                await messageService.getMessageLive(newMessage, socket, fastifyInstance.websocketServer);
            } catch (error) {
                socket.send(JSON.stringify({ error: "Formato no valido" }));
            }
        })

        socket.on("close", () => {
            fastifyInstance.log.info(`Usuario ${socket.userId} desconectado del WebSocket`);
        });
    }
}

module.exports = new MessageController();