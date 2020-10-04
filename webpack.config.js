const path = require("path");

module.exports = {
	module: {
		rules: [
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
