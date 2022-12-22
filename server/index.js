const express = require("express");
const app = express();
const db = require("./config");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const searchRouter = require("./routes/search");
const followRouter = require("./routes/follow");
const commentRouter = require("./routes/comment");
const userRouter = require("./routes/user");
const messageRouter = require("./routes/message");

const cors = require("cors");
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
const PORT = 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
