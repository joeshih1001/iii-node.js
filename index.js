console.log(process.env.NODE_ENV);

require('dotenv').config()
const express = require('express');
const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session);
const moment = require('moment-timezone');
const multer = require('multer');
// const upload = multer({dest:'tmp_uploads/'});
const upload = require('./module/upload-imgs')
const fs = require('fs').promises;
const db = require('./module/connect-db');
const sessionStore = new mysqlStore({}, db);

const app = express();

// app.get('/a.html', function(req, res){
//     res.send('動態內容'+`<p>${Math.random()}</p>`);
// });若app.get寫在前面 ,將蓋掉app.use的內容

app.set('view engine', 'ejs');

//Top-level Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));

app.use(session({
    saveUninitialized : false,
    resave: false,
    secret: 'dsdsd323232dsds232325645dsdsds',
    store: sessionStore,
    cookie: {
        maxAge: 1200000
    }
}));

//自訂 頂層 middleware
app.use((req, res, next) => {
    res.locals.joe = '哈囉';
    //res.json('00000'); 回應後, 將不會往下個路由走

    //helper 模板function
    res.locals.toDateString = d => moment(d).format('YYYY-MM-DD');
    res.locals.toDateTimeString = d => moment(d).format('YYYY-MM-DD HH:mm:ss');

    next();
});

app.get('/', (req, res) => {
    res.render('home', {name : 'JoeShih'});
});

app.get('/json-sales', (req, res) => {
    //嘗試以queryString去排序
     // req.query.orderByCol=age
    // req.query.orderByRule=desc

    const sales = require('./data/sales');
    //TODO : 排序
    console.log(sales);

    res.render('json-sales', {sales});
});
app.get('/try-jq', (req, res) => {
    res.json(req.query);
});


app.post('/try-post',  (req, res) => {
    res.json(req.body);
});

app.get('/try-post-form',  (req, res) => {
    res.render('try-post-form');
});
app.post('/try-post-form',  (req, res) => {
    res.render('try-post-form' ,req.body);
});
app.post('/try-upload', upload.single('avatar'), async (req, res) => {
    console.log(req)
    res.json(req.file);
    // const types = ['image/jpeg','image/png'];
    // const f = req.file;
    // if(f && f.originalname){
    //     if(types.includes(f.mimetype)) {
    //         await fs.rename(f.path, __dirname + '/public/img/' + f.originalname);
    //         return res.redirect('/img/' + f.originalname);
    //     }
    // }
    // res.send('fail');
});
app.post('/try-uploads', upload.array('photos'), async (req, res) => {

    //帥氣進階寫法
    // const result = req.files.map(({mimetype,filename,size}) => {
    //     return {mimetype,filename,size}  
    // })

    const result = req.files.map(el => {
        return {
            "mimetype" : el.mimetype,
            "filename" : el.filename,
            "size" : el.size
        }
    })

    res.json(result);
})

app.get('/my-params/:action?/:id?', (req, res) => {
    res.json(req.params);
});

app.get(/^\/m\/09\d{2}\-?\d{3}\-?\d{3}$/i, (req, res) => {
    let u = req.url.slice(1);
    u = u.split('?')[0];
    u = u.split('-').join('');
    res.json({mobile: u});
});

app.use('/admin2', require('./routes/admin2'));
app.use('/address-book', require('./routes/address-book'));

app.get('/try-session', (req,res)=>{
    req.session.my_var = req.session.my_var || 0;
    req.session.my_var++;
    res.json(req.session);
})

app.get('/try-moment', (req,res)=>{
    const fm = 'YYYY-MM-DD HH:mm:ss';

    res.json({
        moLocal : moment().format(fm),
        moLondon : moment().tz('Europe/London').format(fm),
        moLocalCookie : moment(req.session.cookie.expires).format(fm),
        moLondon2Cookie : moment(req.session.cookie.expires).tz('Europe/London').format(fm),
    })
})
app.get('/try-db', async (req, res)=>{
    const t_sql = "SELECT * FROM address_book LIMIT 5";
    const [rs, fields] = await db.query(t_sql);

    res.json(rs);
})


app.use((req, res)=>{
    res.status(404).send('走錯惹');
})

const port = process.env.port || 3000
app.listen(port, () => {
    console.log(`server start: ${port}`, new Date());
});