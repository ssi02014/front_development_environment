class MyWebpackPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('My Plugin', () => {
      console.log('MyPlugin: done');
    });

    compiler.hooks.emit.tapAsync('My Plugin', (compilation, callback) => {
      const source = compilation.assets['main.js'].source();
      console.log(source);

      callback();
    });
  }
}

module.exports = MyWebpackPlugin;
