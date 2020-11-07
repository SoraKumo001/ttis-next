const ignoreEntory = /\.stories\.js$/;
const ignoreMap = /\.stories$/;

module.exports = {
  webpack: config => ({
    ...config,
    entry: async () => {
      const entries = await config.entry();
      Object.keys(entries).forEach(
        key => ignoreEntory.test(key) && delete entries[key]
      );
      return entries;
    },
    module: {
      rules: [
        ...config.module.rules,
        {
          test: /\.(jpg|png|svg|gif)$/,
          type: "asset/inline"
        }
      ]
    }
  }),
  exportPathMap: async pathMap => {
    Object.keys(pathMap).forEach(
      key => ignoreMap.test(key) && delete pathMap[key]
    );
    return pathMap;
  }
};
