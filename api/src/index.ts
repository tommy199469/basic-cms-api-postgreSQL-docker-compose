import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { useExpressServer } from "routing-controllers";
import swaggerUi from "swagger-ui-express";
import { getMetadataArgsStorage } from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import { ScanResultController } from "./controller/scan-result";
const cors = require("cors");

const app = express();
app.use(express.json({ limit: "50mb" }));

// Config
const port = process.env.SERVER_PORT || 8080; // default port to listen
const serverUrl = process.env.SERVER_URL || "http://localhost";

// Logger middleware
const demoLogger = (req: any, res: any, next: any) => {
  const now = new Date();
  const formatted_date =
    now.getFullYear() +
    "-" +
    (now.getMonth() + 1) +
    "-" +
    now.getDate() +
    " " +
    now.getHours() +
    ":" +
    now.getMinutes() +
    ":" +
    now.getSeconds();
  const method = req.method;
  const url = req.url;
  const status = res.statusCode;
  const log = `[${formatted_date}] ${method}:${url} ${status}`;
  console.log(log);
  next();
};

app.use(demoLogger);

// OpenAPI/Swagger setup
const storage = getMetadataArgsStorage();
const spec = routingControllersToSpec(
  storage,
  {},
  {
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    info: {
      description: "Financial System API Doc",
      title: "Financial System",
      version: "1.0.0",
    },
    servers: [
      {
        url: `${serverUrl}:${port}/api`, // Set the full URL including the base path
        description: "API server",
      },
    ],
  }
);

// Swagger
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(spec, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  })
);

// app.options("*", cors()); // include before other routes

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: true,
    optionsSuccessStatus: 200,
  })
);

// Routing-controllers setup
useExpressServer(app, {
  routePrefix: "/api",
  controllers: [ScanResultController],
});

// Start the Express server
app.listen(port, () => {
  console.log(`server started at ${serverUrl}:${port}`);
});
