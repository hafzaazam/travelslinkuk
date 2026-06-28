// PM2 process file for Hostinger VPS deployment
// Usage on the server:
//   pm2 start deploy/ecosystem.config.cjs
//   pm2 save
//   pm2 startup        # one-time, follow the printed command to enable boot start
//
// Logs:  pm2 logs travelslink
// Reload: pm2 reload travelslink

module.exports = {
  apps: [
    {
      name: "travelslink",
      script: ".output/server/index.mjs",
      cwd: "/var/www/travelslink",
      exec_mode: "fork",
      instances: 1,
      // Node 20+ is required by TanStack Start
      interpreter: "node",
      env: {
        NODE_ENV: "production",
        // Nitro listens on this port. Nginx proxies 80/443 -> 3000.
        PORT: 3000,
        HOST: "127.0.0.1",
      },
      // Restart policy
      max_memory_restart: "512M",
      autorestart: true,
      watch: false,
      // Log files
      out_file: "/var/log/travelslink/out.log",
      error_file: "/var/log/travelslink/err.log",
      merge_logs: true,
      time: true,
    },
  ],
};
