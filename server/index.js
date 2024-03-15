const express = require('express') // 다운받은 express를 가져옴
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { User } = require("./models/User")
const { auth }= require("./middleware/auth")
const config= require("./config/key")

// form에서부터 데이터를 분석해서 가져오는 것
app.use(bodyParser.urlencoded({extended : true}))
// json 타입을 분석해서 가져올 수 있도록 해줌
app.use(bodyParser.json())

app.use(cookieParser());

const mongoose= require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>{
    console.log('Mongo DB Connect')
}).catch((error)=> console.log(error))


// axios 테스트
app.get('/api/hello', (req, res)=>{
    res.send('안녕하세용')
})
// root 디렉터리에 오면 hello world 출력
app.get('/', (req, res)=> res.send("Hello World~~~ gyul"))

// register router
app.post('/api/users/register', async(req, res)=> {

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

app.post('/api/users/login', async(req, res)=> {

    try{
        // client로부터 요청된 이메일이 DB에 있는지 확인
        const user= await User.findOne({ email: req.body.email })

        if(!user){
            return res.json({
                loginSuccess: false,
                message: "요청받은 이메일에 해당하는 유저가 없습니다."
            })
        }

        // 요청된 이메일이 있다면, 비번이 맞는지 확인
        // comparePassword 메서드는 usermodel에서 만들어줌
        const isMatch= await user.comparePassword(req.body.password);
        if(!isMatch){
            return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." }) 
        }

        // 비번이 맞다면, 토큰 생성
        //generateToken 메서드 또한 usermodel에서 생성
        const userdata= await user.generateToken();
        res
            .cookie("x_auth",user.token)
            .status(200)
            .json({loginSuccess:true, userId: user._id})
    } catch(err){
        return res.status(400).send(err)
    }
})


app.get('/api/users/auth', auth ,(req,res)=>{
    //여기까지 미들웨어를 통과해 왔다는 얘기는 Auth가 true라는 말
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth:true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})


app.get('/api/users/logout', auth, (req, res) => {
    
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" })
        .then(() => {
            console.log(req.user._id);
            res.status(200).send({success: true})
        })
        .catch((err)=>{
            res.json({ success: false, err });
        })
})

// app이 5000포트에 listen을 하면 consoel 출력
app.listen(port, ()=> console.log(`port is ${port}!`))