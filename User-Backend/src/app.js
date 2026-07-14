require("dotenv").config();

const path = require("path");
const fastify = require("fastify")({
    logger: true
});

const { connectDatabase } = require("./config/database");
const start = async () => {

    try {

        await connectDatabase();

        await fastify.register(require("@fastify/static"), {
            root: path.join(__dirname,"..", "public"),
            prefix: "/", // Hace que los archivos se sirvan en la raíz (ej: http://localhost:PORT/)
        });

        await fastify.register(require("./routes/message.routes"));
        console.log(fastify.printRoutes());
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