var path = require('path');

module.exports = {
	entry: './theme/static/js/admin.js',
	output: {
		filename: 'admin.js',
		path: path.resolve(__dirname, 'output/theme/js')
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			}
		]
	}
};
