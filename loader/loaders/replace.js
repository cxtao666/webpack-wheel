module.exports = function (source){
    console.log(this.query);
    const callback = this.async();
    setTimeout(()=>{
     const result =  source.replace('cxtao','xiantao');
     callback(null,result)
    },1000);

}
// source 是源文件输入的字符串
// return 的是打包后文件的字符串
// 写loader时可以通过this,调用非常多的api
// async 使用异步