require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const routes = require("./routes");

// Pengambilan data dari file .env
// const IP_ADDRESS = process.env.IP_ADDRESS;
// const PORT = process.env.PORT;
const { PORT, IP_ADDRESS } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(routes);

app.get("/", (req, res, next) => {
  try {
    return res.send("Welcome to Our API");
  } catch (error) {
    next(error);
  }
});

// Error handling 404 -- not found
app.use((req, res) => {
  return res.status(404).json({
    status: false,
    message: "not found",
  });
});

// Error handling 500 -- internal server error
app.use((err, req, res) => {
  return res.status(500).json({
    status: false,
    message: "internal server error" + err.message,
    data: null,
  });
});

app.listen(PORT, () => {
  return console.log(`running on http://${IP_ADDRESS}:${PORT}`);
});
