module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@components': './src/components',
            '@services': './src/services', 
            '@utils': './src/utils',
            '@styles': './src/styles',
            '@config': './src/config',
            '@context': './src/context',
            '@assets': './assets'
          },
        },
      ],
    ],
  };
};