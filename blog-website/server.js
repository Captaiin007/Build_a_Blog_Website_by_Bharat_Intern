// #1 Install dependencies : npm i express mongoose ejs
// #2 Install another dependency : npm i --save-dev nodemon
// #3 Connect with the MongoDB Database
// #4 Install another dependencies : npm i marked slugify
// #5 Another dependency : npm i method-override
// #6 Another dependency : npm i dompurify jsdom

const express = require('express');
const articleRouter = require('./routes/articles');
const article = require('./models/article');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();

mongoose.connect('mongodb://localhost/blog-website-database');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.get('/', async(req,res)=>{
    const articles = await article.find().sort({createdAt: 'desc'});
    res.render('articles/index', {articles:articles});
}
);

app.use('/articles', articleRouter);

app.listen(3000);