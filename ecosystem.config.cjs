module.exports = {
  apps: [
    {
      name: "quote_management-staging",
      script: "npm",
      args: "run start",
      instances: 1,
      exec_mode: "fork",
      watch: false,
      env: {
        NODE_ENV: "development",
        PORT: 3333,
      },
      error_file: "/var/log/pm2/quote_management-staging-error.log", // Error log file
      out_file: "/var/log/pm2/quote_management-staging-out.log", // Output log file
      log_date_format: "YYYY-MM-DD HH:mm:ss", // Add timestamps to logs
    },
    {
      name: "quote_management-production",
      script: "npm",
      args: "run start",
      instances: 1,
      exec_mode: "fork",
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 3333,
      },
      error_file: "/var/log/pm2/quote_management-production-error.log", // Error log file
      out_file: "/var/log/pm2/quote_management-production-out.log", // Output log file
      log_date_format: "YYYY-MM-DD HH:mm:ss", // Add timestamps to logs
    },
  ],
};
