const express = require('express') // 다운받은 express를 가져옴
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const { User } = require("./models/User")
const config= require("./config/key")

// form에서부터 데이터를 분석해서 가져오는 것
app.use(bodyParser.urlencoded({extended : true}))
// json 타입을 분석해서 가져올 수 있도록 해줌
app.use(bodyParser.json())


const mongoose= require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>{
    console.log('Mongo DB Connect')
}).catch((error)=> console.log(error))

// root 디렉터리에 오면 hello world 출력
app.get('/', (req, res)=> res.send("Hello World~~~ gyul"))

app.post('/register', async(req, res)=> {

    // 회원가입할 때 필요한 정보들을 client에서 가져오고 DB에 넣는다.
    // req.body로 client에서 데이터를 받아오는 것
    const user = new User(req.body)

    // save는 req.body가 user 모델에 저장됨
    try {
        await user.save();
        return res.status(200).json({success:true})
    } catch (err) {
        return res.json({success:false, err})
    }
})


// app이 5000포트에 listen을 하면 consoel 출력
app.listen(port, ()=> console.log(`port is ${port}!`))