require("dotenv").config();

const fastify = require("fastify")({
    logger: true
});

const { connectDatabase } = require("./config/database");
const start = async () => {

    try {

        await connectDatabase();

        await fastify.register(require("./routes/message.routes"));
        await fastify.listen({
            port: process.env.PORT
        });

        console.log("Servidor iniciado.");

    }
    catch (error) {

        console.error(error);
        process.exit(1);

    }

};
start();