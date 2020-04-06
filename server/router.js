let { Router } = require('express');
const formidable = require("formidable");
const utils = require('utility');
const router = new Router();
const fs = require('fs')
const models = require('./model');
const User = models.getModel('user');
const Chat = models.getModel('chat');
const _filter = { pwd: 0 }

router.get('/info', function (req, res) {
    debugger
    // 获取用户的cookies
    const { userid } = req.cookies
    if (!userid) return res.json({ code: 1 })
    User.findOne({ _id: userid }, _filter, function (err, doc) {
        if (err) {
            return res.json({ code: 1, msg: '后端出错' })
        }
        if (doc) {
            return res.json({ code: 0, data: doc })
        }
        return res.json({ code: 1 })
    })
})

router.get('/list', function (req, res) {
    const { type } = req.query;
    User.find({ type }, function (err, doc) {

        return res.json({ code: 0, data: doc })
    })
})
router.get('/getmsglist', function (req, res) {
    const user = req.cookies.userid;
    User.find({}, function (err, userdoc) {
        if (err) return res.json({ code: 1 })
        let users = {};
        userdoc.forEach(item => {
            users[item._id] = { name: item.user, headPic: item.headPic }
        })
        Chat.find({ '$or': [{ from: user }, { to: user }] }, function (err, doc) {
            if (err) return res.json({ code: 1 })
            return res.json({code: 0, data: doc, users})
        })
    })

})
router.post('/login', function (req, res) {
    const { user, pwd } = req.body;
    User.findOne({ user, pwd: utils.md5(pwd) }, function (err, doc) {
        if (!doc) {
            return res.json({ code: 1, msg: '用户名或密码错误' })
        }
        res.cookie('userid', doc._id)
        return res.json({ code: 0, data: doc, msg: '登录成功' })
    })
})
router.post('/register', function (req, res) {
    console.log(req.body)
    const { user, pwd, type } = req.body;
    User.findOne({ user: user }, _filter, function (err, doc) {
        if (doc) {
            return res.json({ code: 1, msg: '用户名重复' })
        }
        const userModel = new User({ user, type, pwd: utils.md5(pwd) })
        userModel.save(function (err, doc) {
            const { user, type, _id } = doc
            if (err) {
                return res.json({ code: 1, msg: '服务器出错' })
            }
            res.cookie('userid', _id)
            return res.json({ code: 0, data: { user, type, _id } })
        })
        // User.create({ user, pwd: utils.md5(pwd), type }, function (err, doc) {
        //     if (err) return res.json({ code: 1, msg: '后端出错' })

        //     return res.json({ code: 0, msg: '注册成功' })
        // })

    })
})

router.post('/update', function (req, res) {
    const userid = req.cookies.userid;
    console.log(userid)
    if (!userid) return res.json({ code: 1 });
    const form = new formidable();
    // 设置临时路径
    form.uploadDir = "./uploads";
    form.parse(req, function (err, fields, files) {
        console.log(err)

        if (err) return res.json({ code: 1, msg: '上传头像失败' })
        // 定义原路径
        let oldPath = files.headPic.path;
        // 定义新路径
        let newPath = `/headPic/${userid}.png`
        fs.rename(oldPath, '.' + newPath, function (err) {
            err && res.json({ code: 1 })
            User.findByIdAndUpdate(userid, { ...fields, headPic: `localhost:3002${newPath}` }, function (err, doc) {
                const data = Object.assign({}, {
                    user: doc.user,
                    type: doc.type,
                    headPic: doc.headPic,
                    title: doc.title
                })
                return res.json({ code: 0, data })
            })
        })
    })
    const body = req.body;
})

router.post('/readmsg', function(req, res) {
    const userid= req.cookies.userid;
    console.log(userid)
    const {from} = req.body;
    Chat.update({from, to: userid}, {'$set': {read: true}}, {'multi': true},function(err, doc) {
        console.log(doc)
        if (err) return res.json({code: 1, msg: '后端出错'})
        return res.json({code: 0, num: doc.nModified})
    })
})

module.exports = router