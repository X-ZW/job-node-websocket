const express = require('express');
const app = express();
const router = require('./router');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const server = require('http').Server(app)
const io = require('socket.io')(server);
const models = require('./model');
const Chat = models.getModel('chat');

io.on('connection', function (socket) {
    // console.log('后端')
    socket.on('sendmsg', function (data) {
        console.log('sendmsg', data)
        const { from, to, msg } = data;
        const chatid = [from, to].sort().join('_');
        const create_time = new Date().getTime();
        Chat.create({chatid, from, to, content: msg, create_time}, function(err, doc) {
            if(err) {
                return res.json({code: 1, msg: '后端出错'})
            }
            io.emit('recvmsg', Object.assign({}, doc._doc   ))
        })
        
    })
})
app.use("/headPic", express.static("./headPic"));
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', router)
server.listen(3002, function () {
    console.log('3002')
})