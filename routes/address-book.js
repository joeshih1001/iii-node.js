const express = require('express');
const db = require('./../module/connect-db')

const router = express.Router();

async function getData (req, res){
    const perPage = 5;
    let page = req.query.page ? parseInt(req.query.page) : 1;
    if(page<1){
        return res.redirect('/address-book/list')
    }

    const output = {
        perPage,
        page,
        totalRows:0,
        totalPages:0,
        rows:[]
    };

    const t_sql = "SELECT COUNT(1) num FROM address_book";

    const[rs1] = await db.query(t_sql);
    const totalRows = rs1[0].num;
    let totalPages = 0;
    if(totalRows){
        output.totalPages = Math.ceil(totalRows/perPage);
        output.totalRows = totalRows;

        if(page>output.totalPages){
            return res.redirect(`/address-book/list?page=${output.totalPages}`);
        }

        const sql = `SELECT * FROM address_book LIMIT ${perPage * (page-1)}, ${perPage}`;//ex: page = 1, perPage =5 從第0筆開始起算後續5筆資料(due to perPage = 5)
        const [rs2] = await db.query(sql);
        rs2.forEach(el => {
            el.birthday = res.locals.toDateString(el.birthday);
        })
        output.rows = rs2;
        

    }

    // res.json(output);
    // res.render('address-book/list', output);
    return output;
}

router.get('/list', async(req, res) => {
    res.render('address-book/list', await getData(req, res));
})
router.get('/api/list', async(req, res) => {
    res.json(await getData(req, res));
})


module.exports = router ;