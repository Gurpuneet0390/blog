const express = require('express');
const mongoose=require('mongoose');
const Article=require('./models/article');
const articleRouter=require('./routes/articles');
const { router } = require('./routes/articles');
const methodOverride=require('method-override');
const app = express()
mongoose.connect('mongodb://0.0.0.0:27017/raunaq')
.then(() => { // if all is ok we will be here
    console.log("db conncted");
})
.catch(err => { // we will not be here...
    console.error('App starting error:', err.stack);
    process.exit(1);
});

app.set('view engine' , 'ejs');

app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'))
app.use('/articles',articleRouter);


app.get('/',async (req,res)=>{
    const articles=await Article.find().sort({
        createdAt:'desc'})
    res.render('articles/index',{articles:articles});
});

app.use('/articles',articleRouter);

app.listen(5000, ()=>{
    console.log('Server is running');
});
