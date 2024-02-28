const mongoose= require('mongoose')
const bcrypt= require('bcrypt')
// saltRounds: salt가 몇글자인지 지정 > salt 생성 > salt를 이용하여 비번 암호화
const saltRounds= 10
const jwt= require('jsonwebtoken')

const userSchema= mongoose.Schema({
    name: {
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minLength: 5
    },
    lastname: {
        type: String,
        maxLength: 50
    },
    // role을 주는 이유는 관리자와 유저를 구분하기 위해(1: 관리자, 0: 일반유저)
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    // 토큰 유효기간
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function(next){
    var user = this

    // 유저가 비밀번호를 변경하려 할 때
    if(user.isModified('password')){

    // 비밀번호를 암호화 시킨다.
    // salt를 generate 할 때, saltRounds 필요
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) return next(err)
        //myPlaintextPassword은 postman에서 투명하게 보인 내 비번
        // hash는 암호화된 내 비번
        // bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // });
        bcrypt.hash(user.password , salt , function(err, hash){
            if(err) return next(err)
            user.password = hash
            next()
        })
    });

    }else {
        next()
    }
})

// comparePassword메서드 생성
// userSchema.methods.comparePassword = function(plainPassword, cb){

//     // plainPassword: 1234567, 암호화된 비번: 12fdsf23rugj 이 맞는지
//     // 확인하려면 plainPassword도 암호화 후  비교해야함

//     bcrypt.compare(plainPassword, this.password, function(err, isMatch){
//         if(err) return cb(err),
//         // 비번 일치할 경우
//             cb(null, isMatch)
//     })
// }

// generateToken메서드 생성
// index.js generateToken에 콜백함수 하나만 들어있어서 밑에도 cb만 써준거
// userSchema.methods.generateToken = function(cb){
//     var user= this

//     // jsonwebtoken을 이용해서 token을 생성하기
//     // sign을 이용해서 token을 생성함
//     jwt.sign(user._id.toHexString(), 'secretToken')

//     var token= user._id + 'secretToken'

//     user.token= token
//     user.save(function(err, user){
//         if(err) return cb(err),
//             cb(null, user)
//     })
// }

userSchema.methods.comparePassword = function (plainPassword) {
    // plainpassword와 db에 암호화된 비밀번호가 같은지 확인
    const result = bcrypt.compare(plainPassword, this.password);
    return result;
    };
    
    
userSchema.methods.generateToken = async function (cb) {
    var user = this;
    // jsonwebtoken을 이용해서 token을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken');
    // user._id(db의 _id) + secreToken = token
    // token으로 user를 판별할 수 있다.
    // user.token = token;
    user.token = token;

    try {
    const savedUser = await user.save();
    return user;
    } catch (err) {
    return err;
    }
};

userSchema.statics.findByToken= function(token, cb){
    var user= this;

    //토큰 디코드
    jwt.verify(token,'secretToken', function(err, decoded){
        //유저 아이디를 이용하여 유저를 찾은 후
        // 클라이언트에서 가져온 token과 DB에 보관된 TOKEN이 일치하는지 확인
        user.findOne({"_id": decoded, "token": token})
        .then((user)=>{
            cb(null, user);
        })
        .catch((err)=>{
            return cb(err);
        })
    })
}


// model로 schema 감싸줌
const User= mongoose.model('User', userSchema)

// 이 schema를 다른 파일에도 쓰기 위해서
module.exports = {User}