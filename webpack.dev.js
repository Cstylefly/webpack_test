const path = require("path/posix");
const { HotModuleReplacementPlugin,} = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const { glob } = require("glob");

const setMPA = () => {
    const entry = {}
    const htmlWebpackPlugins = []

    const entryFiles = glob.sync(path.join(__dirname,'./src/*/index.js'))

    Object.keys(entryFiles).map(index => {
        const entryFile = entryFiles[index]
        const match = entryFile.match(/src\/(.*)\/index\.js/)

        const pageName = match && match[1]

        entry[pageName] = entryFile
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                title:"webpack-test",         
                inject:true,                  // 是否控制在底部加载引入的js
                template:path.join(__dirname,`src/${pageName}/index.html`),  // 模版html
                filename:`${pageName}.html`,         // 生成的html文件名
                chunk:[pageName],
                minify:{
                    html5:true, // 根据HTML5规范解析输入
                    collapseWhitespace:true, // 移除换行符
                    minifyCSS:true, // 压缩html内样式
                    minifyJS:true, // 压缩js内样式
                    removeComments:true // 移除注释
                }
            })
        )
    })

    return {
        entry,
        htmlWebpackPlugins
    }
}

const {entry,htmlWebpackPlugins} = setMPA()

module.exports = {
    // entry:'./src/index.js', // 需要打包的单页面入口文件
    entry, // 多页面打包
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
                    MiniCssExtractPlugin.loader,
                    {
                       loader:'css-loader'
                    }
                ]
            },
            // less转换loader
            {
                test:/.less$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    {
                        loader:'css-loader'
                    },
                    {
                        loader:'less-loader'
                    },
                    {
                        // loader:'postcss-loader',
                        // options:{
                        //     plugins:() => {
                        //         require('autoprefixer')({
                        //             borwsers:['last 2 version','>1%','ios 7'] // webpack5中不支持了
                        //         })
                        //     }
                        // }
                        loader:'postcss-loader',
                        options:{
                            postcssOptions:{
                                ident:"postcss",
                                plugins:[
                                    // require('autoprefixer')()
                                    require('postcss-preset-env')() //自动给css3属性加上前缀 需要在package.json中配置browserslist栏目
                                ]
                            }
                        }
                    }
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
        new MiniCssExtractPlugin({
            filename:'css/common.css'
        }), // 分离出一个css的独立文件

        //   单页面

        // new HtmlWebpackPlugin({           // html生成插件
        //     title:"webpack-test",         
        //     inject:true,                  // 是否控制在底部加载引入的js
        //     template:'./src/index.html',  // 模版html
        //     filename:'index.html',         // 生成的html文件名
        //     chunk:['index'],
        //     minify:{
        //         html5:true, // 根据HTML5规范解析输入
        //         collapseWhitespace:true, // 移除换行符
        //         minifyCSS:true, // 压缩html内样式
        //         minifyJS:true, // 压缩js内样式
        //         removeComments:true // 移除注释
        //     }
        // }),
        new CssMinimizerPlugin(),//webpack5中css压缩插件
        new CleanWebpackPlugin() //自动清除构建产物
        // new OptimizeCssAssetsPlugin({
        //     assetNameRegExp:/\.css$/g,
        //     cssProcessor:require('cssnano')
        // })  // webpack5已不支持
    ].concat(htmlWebpackPlugins),   // 多页面打包
    devServer:{
        static:path.join(__dirname,'dist'), // 需要监测的文件夹路径
        hot:true, // 是否需要热更新
        port:3003 // 打开的网页的端口号
    }
}