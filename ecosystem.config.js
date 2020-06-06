module.exports = {
  apps: [{
    script: "index.js",
    watch: true,
    watch_delay: 3000,
    ignore_watch : ["node_modules",],
    watch_options: {
      "followSymlinks": false
    }
  }]
};
