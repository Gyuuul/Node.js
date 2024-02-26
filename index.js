const express= require('express') // 다운받은 express를 가져옴
const app= express()
const port= 5000

const mongoose= require('mongoose')
mongoose.connect('mongodb+srv://gyyul1008:qw332211@study1.ngutcqf.mongodb.net/?retryWrites=true&w=majority&appName=study1', {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>{
    console.log('Mongo DB Connect')
}).catch((error)=> console.log(error))

// root 디렉터리에 오면 hello world 출력
app.get('/', (req, res)=> res.send("Hello World"))
// app이 5000포트에 listen을 하면 consoel 출력
app.listen(port, ()=> console.log(`port is ${port}!`))