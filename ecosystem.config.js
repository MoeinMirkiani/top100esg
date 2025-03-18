export default {
    apps: [
        {
            name: 'top100esg',
            exec_mode: 'cluster',
            instances: 'max', // Or specify a number of instances
            script: '.output/server/index.mjs',
            env: {
                NODE_ENV: 'production'
            }
        }
    ]
}
