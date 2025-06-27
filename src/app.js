import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionsRouter from "./routes/adoption.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import mocksRouter from "./routes/mocks.router.js";
import dotenv from "dotenv";

dotenv.config();

import os, { version } from "os";
import cluster from "cluster";

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

const connection = mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Entrega Final, Backend III, Coderhouse",
      version: "1.0.0",
      description: "API para adopción de mascotas",
    },
    servers: [
      {
        url: "http://localhost:8080",
        descripcion: "production",
      },
      {
        url: "http://localhost:3000",
        descripcion: "development",
      },
    ],
  },
  apis: ["./docs/*.yaml"],

  // apis: ["./src/**/*.js"], // o apis: ['./src/*.js'],  apis: ['./src/routes/**/*.js']
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/mocks", mocksRouter);

app.get("/", (req, res) => {
  const styles = `
        <style>
            body {
                font-family: Arial, sans-serif;
                text-align: center;
                margin-top: 50px;
            }
            button {
                padding: 10px 20px;
                font-size: 16px;
                cursor: pointer;
            }
        </style>
    `;
  const html = `
    <DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>API ABM Users</title>
    </head>
    <body>
        ${styles}
        <h1>Entrega Final, Backend III</h1>
        <button onclick="window.location.href='/api-docs'">Ver Documentación API</button>
    </body>
    </html>
    `;
  res.status(200).send(html);
});

// console.log(os.cpus().length);
// console.log("Núcleos disponibles: ", os.cpus());
// console.log("Cluster: ", cluster);
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

export default app;
