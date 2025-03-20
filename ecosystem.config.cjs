module.exports = {
    apps: [
        {
            name: 'top100seg',
            port: '3000',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs'
        }
    ]
}
