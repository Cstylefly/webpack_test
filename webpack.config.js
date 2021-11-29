const path = require("path/posix");
const { HotModuleReplacementPlugin,} = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry:'./src/index.js', // 需要打包的入口文件
    output:{
        filename:'[name]_[chunkhash:8].js',  // 输出的文件名
        path:path.resolve(__dirname,'dist')  // 输出的文件夹名
    },
    watch:true,
    module:{
        rules:[
            // css转换loader
            {
                test:/.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            // less转换loader
            {
                test:/.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            // 将es5 es6语法转换的loader
            {
                test:/.js$/,
                use:'babel-loader',
                exclude:/node_modules/
            },
            // 图片资源loader
            {
                test:/(.jpg|.jpeg|.png)$/,
                use:'file-loader'
            }
        ]
    },
    mode:'development',
    plugins:[
        new HotModuleReplacementPlugin(), // 热更新插件
        new HtmlWebpackPlugin({           // html生成插件
            title:"webpack-test",         
            inject:true,                  // 是否控制在底部加载引入的js
            template:'./src/index.html',  // 模版html
            filename:'index.html'         // 生成的html文件名
        })
    ],
    devServer:{
        static:path.join(__dirname,'dist'), // 需要监测的文件夹路径
        hot:true, // 是否需要热更新
        port:3003 // 打开的网页的端口号
    }
}