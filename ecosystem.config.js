module.exports = {
    apps : [
        {
            name: 'dev',
            script: 'index.js',
            args: 'null',
            instances: 1,
            autorestart: true,
            watch: true, // 检查文件变化
            error_file: "./logs/index/app-err.log",
            out_file: "./logs/index/app-out.log",
            log_date_format: "YYYY-MM-DD HH:mm Z", // pm2 log添加日期
            env: {
                NODE_ENV: 'development'
            },
            env_production: {
                NODE_ENV: 'production'
            },
            max_memory_restart: '1G',
        },
    ],
};  