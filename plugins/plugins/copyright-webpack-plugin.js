class CopyrightWebpackPlugin {
    constructor(options){
        console.log('插件被使用了');
        console.log(options.name);
    }
    apply(compiler){
        compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin',(complilation,cb) =>{
          
          
            complilation.assets['copyright.txt'] = {
               source:function(){
                   return 'cxtao666'
               },
               size:function(){
                   return 21;
               }
           }
           // 该操作会生成copyright.txt文件,文件内容是cxtao666
           // hooks 钩子周期函
           cb()
        })
    }
}

module.exports = CopyrightWebpackPlugin;