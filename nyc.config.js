module.exports = {
  all: true,
  extends: "@istanbuljs/nyc-config-typescript",
  exclude: [
    'src/tests',
    'src/database/config',
    'src/database/migrations',
    'src/database/seeders',
    'src/routers',
    'src/app.ts',
    'src/server.ts'
  ],
  include: ['src/**/*.ts']
};