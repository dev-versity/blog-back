const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const db = mongoose.connection
db.once("open", () => {
    console.log('[📚Database] MongoDB connected')
})

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/bookstoredb');
}

const articleRouter = require("./routes/articleRoute");
const userRouter = require("./routes/userRoute");
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');


app.use(express.urlencoded({ extended: true}))

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/articles", articleRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
