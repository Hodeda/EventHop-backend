const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const URI = process.env.URI;
const ordersRoute = require("./routes/orders");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], //don't forget to add cors for the deployed version's url!
  })
);

app.use("/order", ordersRoute);

app.use("*", (req, res) =>
  res.status(404).json({ message: "Page not found." })
);

main();

async function main() {
  try {
    await mongoose.connect(URI);
    console.log("connected to db");
    const server = app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
