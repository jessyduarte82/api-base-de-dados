const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./connect/database");

const port = process.env.PORT || 3000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api/auth", require("./routes/user.route"));
app.use("/api/user", require("./routes/user.route"));

app.listen(port, () => console.log(`Aplicação rodando em http://localhost:${port}`));
