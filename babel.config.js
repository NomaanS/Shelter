module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@components': './components',
            '@services': './services', 
            '@utils': './utils',
            '@styles': './styles',
            '@assets': './assets'
          },
        },
      ],
    ],
  };
};
