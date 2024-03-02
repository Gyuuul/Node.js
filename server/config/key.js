if(process.env.NODE_ENV === 'production'){
    // 개발 환경이 production (배포 후일 때)
    module.exports= require('./prod')
} else{
    // 개발 환경이 developement (로컬일 때)
    module.exports= require('./dev')
}