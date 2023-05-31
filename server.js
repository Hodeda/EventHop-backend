const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.use("*", (req, res) =>
  res.status(404).json({ message: "Page not found." })
);

app.listen(PORT, () => {
  console.log("Server is listening on port 8080.");
});
