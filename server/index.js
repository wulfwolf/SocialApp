const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const db = require("./config");
const cors = require("cors");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const searchRouter = require("./routes/search");
const followRouter = require("./routes/follow");
const commentRouter = require("./routes/comment");
const userRouter = require("./routes/user");
const messageRouter = require("./routes/message");
db.connect();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/search", searchRouter);
app.use("/api/follow", followRouter);
app.use("/api/comment", commentRouter);
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);
const PORT = 5000;
const LOCAL = 3000;
app.listen(LOCAL, () => console.log(`local started on port ${LOCAL}`));
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

io.on("connection", (socket) => {
  console.log("a user connected ____ ", socket.id);

  socket.on("message", (msg) => {
    console.log(msg);
    socket.emit("message", msg);
  });
});
io.on("disconnected", (socket) => {
  console.log("a user disconnected");
});
