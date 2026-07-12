const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const blogsRouter = require("./controllers/blogs");

// Workaround: local network's default DNS resolver fails on SRV lookups
// required for the mongodb+srv:// connection string. Force Node to use
// Google's DNS instead. Remove if deploying somewhere without this issue.
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

logger.info("connecting to", config.MONGODB_URI);

mongoose
	.connect(config.MONGODB_URI, { family: 4 })
	.then(() => {
		logger.info("connected to MongoDB");
	})
	.catch((error) => {
		logger.error("error connecting to MongoDB:", error.message);
	});

app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint);

module.exports = app;
