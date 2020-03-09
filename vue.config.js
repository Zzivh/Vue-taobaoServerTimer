module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://api.m.taobao.com/rest/api3.do',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}