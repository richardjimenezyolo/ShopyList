const path = require("path");

module.exports = {
	module: {
		rules: [
			// {
			// 	test: /\.(j|t)sx?$/,
			// 	exclude: /node_modules/,
			// 	use: {
			// 		loader: "babel-loader",
			// 		options: {
			// 			cacheDirectory: true,
			// 			babelrc: false,
			// 			presets: [
			// 				[
			// 					"@babel/preset-env",
			// 					{ targets: { browsers: "last 2 versions" } }, // or whatever your project requires
			// 				],
			// 				"@babel/preset-typescript",
			// 				"@babel/preset-react",
			// 			],
			// 			plugins: [
			// 				"react-hot-loader/babel",
			// 			],
			// 		},
			// 	},
			// },
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	entry: "./src/main.tsx",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "www"),
	},
	devServer: {
		contentBase: path.join(__dirname, "www"),
		compress: true,
		port: 5000,
	},
};
