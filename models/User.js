const mongoose= require('mongoose')

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

// model로 schema 감싸줌
const User= mongoose.model('User', userSchema)

// 이 schema를 다른 파일에도 쓰기 위해서
module.exports = {User}