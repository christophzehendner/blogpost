const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

/*const { MongoClient } = require('mongodb');
//const uri = "mongodb+srv://rshdd:hola123@blogpostup.mwjnm.mongodb.net/posts?retryWrites=true&w=majority";
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err) => {
  console.log("Connected");
  const database = client.db("posts");
  // perform actions on the collection object
  client.close();
});*/

const { MongoClient } = require('mongodb');
const uri = "rshdd:hola@blogpostup.mwjnm.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log("Connected");
  const database = client.db("test");
  // perform actions on the collection object
  client.close();
});

/*mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(res => {
  console.log("DB Connected!")
}).catch(err => {
  console.log(Error, err.message);
})*/

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use('/public', express.static('public'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
});

app.use('/articles', articleRouter)

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port);