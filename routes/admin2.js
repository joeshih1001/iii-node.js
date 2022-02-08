const express = require('express');
const req = require('express/lib/request');
const router = express.Router();

//自訂  middleware
router.use((req, res, next) => {
    res.locals.joe += 'you';
    next();
});

router.get('/admin2', (req, res) => {
    res.json('admin2 : root')
})
router.get('/abc', (req, res) => {
    let {params, url, baseUrl, originalUrl } = req;
    res.json({
        originalUrl,
        local:res.locals.joe});
})
router.get('/def', (req, res) => {
    let {params, url, baseUrl, originalUrl } = req;
    res.json({
        params, 
        local:res.locals.joe});
})

router.get('/:p1?/:p2?', (req, res) =>{
    let {params, url, baseUrl, originalUrl } = req;
    res.json({
        params, 
        url, 
        baseUrl, 
        originalUrl,
        local:res.locals.joe});
});
module.exports = router ;