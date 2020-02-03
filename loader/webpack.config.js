const path = require('path')
module.exports = {
	entry:{
        main:'./src/index.js'
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js'
    },
    module:{
        rules:[{
            test: /\.js/,
            use:[
                {
                loader: 'replace',
                options:{
                    name:"cxtao"
                }
            }
            // 继续写,可以写多个loader
            ]
        }
            
        ]
    },
    resolveLoaders:{
       modules:['node_modules','./loaders'] 
    }
    // 寻找loader时,先去node_module目录下去寻找,找不到再去loaders目录下去寻找
}
