module.exports = {
    apps: [
        {
            name: 'top100esg',
            port: '3000',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs'
        }
    ]
}
