var path = require('path')
var webpack = require('webpack')

module.exports = {
	entry: './src/main.js',
	output: {
		path:path.resolve(__dirname,'./dist'),
		path: '/dist',
		filename: 'build.js'
	},
	module: {
		loaders: [{
                test:/\.js$/,
                loader:'babel',
                exclude:/node_modules/
            },
			{
				test: /\.vue$/,
				loader: 'vue'
			}
		]
	},
	vue: {
		loader: {
			js: 'babel'
		}
	}
	babel: {
		"presets": ['es2015', stage - 0],
		"plugins": ["transform-runtime"]
	}
}