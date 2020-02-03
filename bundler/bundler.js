const fs = require('fs')
const parse = require('@babel/parser');
const path = require('path');
const traverse = require('@babel/traverse').default
const babel = require("@babel/core")

const modle = (filename) => {
  let content =   fs.readFileSync(filename,'utf-8');

  // content = content.replace(/import/g,'require');  //第一个参数匹配到的内容会被第二个参数的字符串所替换掉
    let ast = parse.parse(content,{
        sourceType:'module'
    })  

    const dependencies = {};
    const dirname = path.dirname(filename);

    traverse(ast,{
        ImportDeclaration({node}){
            let newFile = '.\\'+ path.join(dirname,node.source.value)   // 打印出'./src/message.js'
            dependencies[node.source.value]  = newFile 
        }
    })

    console.log(dependencies) ;

  const {code} = babel.transformFromAst(ast,null,{
        presets:['@babel/preset-env']
    });  // 返回的可以再浏览器运行的代码

    return {
        filename,
        dependencies,
        code
    }
}

const make = (entry) =>{
    let entrymodule = modle(entry);
    let arr = [entrymodule];
    for(let i = 0; i < arr.length ;i++){
        let item  = arr[i];
        const {dependencies } = item;
        if(dependencies){
            for(let j in dependencies){

                dependencies[j] = dependencies[j].replace(/\\/g,"/") + '.js'

                //console.log(dependencies[j])    

             arr.push( modle(dependencies[j])) ;

             // 执行modle函数调用时,模块依赖文件路径会被写成window格式,但单要引用模块时,文件的路径就被修改成linux的格式
            }
        }

    };

     //arr是文件依赖图谱

    const graph = {}
    arr.forEach((item) =>{
        graph[item.filename] = {
            dependencies:item.dependencies,
            code:item.code
        }
    })

    return graph; 
}


const generateCode = (entry) =>{
    let makeInfo = JSON.stringify(make(entry));
    return `
    (function(graph){

        function require(module){

function localRequire(relativePath){
            return require(graph[module].dependencies[relativePath])
           }    // 保证第二次执行require引入模块的路径被改变掉
           var exports = {}; //闭包前面要加分号

    (function (require,exports,code){        
                eval(code)   //localRequire就是代码执行中的require
            })(localRequire,exports,graph[module].code)

            return exports  //用于在模块中导出数据
        }


       require('${entry}') 

    })(${makeInfo}) 

    `
}

let str = generateCode('./src/index.js');  //入口js文件

    fs.writeFileSync('./dist/main.js',str,'utf-8');   //打包输出的js文件

// 转化为js对象  ast树
// 分析模块的依赖
// 模块的源代码进行编译成浏览器可执行的代码

// 逐层遍历依赖的每一个模块文件,对每一个依赖文件的代码都进行打包,并生成它自身的依赖模块  采用递归的方式
// 传递一个对象进去,写一个require方法,递归调用require,使得对象中包含的各个模块的代码都被调用到了,然后使用eval对代码进行执行,路径需要进行处理

// require和export都需要提供出来,export用于给模块提供挂载的数据
// 相对路径和绝对路径的处理