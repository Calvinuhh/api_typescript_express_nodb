import express from "express";
import { json } from "express";
import morgan from "morgan";
import router from "./router";

const server = express();

server.use(morgan("dev"));
server.use(json());

server.use(router);

export default server;
