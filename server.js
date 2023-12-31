const express = require("express");
const connectDB = require("./db");
const authenticate = require("./middleware/authenticate");
const routes = require("./routes/index");

const app = express();
app.use(express.json());
app.use(routes);

app.get("/private", authenticate, async (req, res) => {
  console.log("I am user: ", req.user);
  return res.status(200).json({ message: "I am a private route" });
});

app.get("/", (_req, res) => {
  res.send("Server is running");
});

app.use((err, _req, res, _next) => {
  console.log(err);
  const message = err.message ? err.message : "Server error occurred";
  const status = err.status ? err.status : 500;
  return res.status(status).json({ message });
});

connectDB("mongodb://0.0.0.0:27017/attendance-app")
  .then(() => {
    console.log("Database connected with server");
    app.listen(5000, () => {
      console.log("Server is running on port: 5000");
    });
  })
  .catch((e) => console.log(e));
