const CopyRightWebpackPlugin = require('./plugins/copyright-webpack-plugin')
const path = require('path');

module.exports = {

	mode:'development',
	entry:{
		main:'./src/index.js'
	},
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js'
    },
    plugins:[
        new CopyRightWebpackPlugin({
            name:"cxtao"
        })
    ]

}
