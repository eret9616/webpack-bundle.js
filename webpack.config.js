module.exports = {
    entry: {
        bundle1: './src/bundle1.js',
        bundle2: './src/bundle2.js'
    },
    module: {
        rules: [
            {
                test: /\.js/,
                use: [{
                    loader: 'babel-loader',
                    options: {//如果有这个设置则不用再添加.babelrc文件进行配置
                        "babelrc": false,// 不采用.babelrc的配置
                        "plugins": [
                            "dynamic-import-webpack"
                        ]
                    }
                }]
            }
        ]
    }
}