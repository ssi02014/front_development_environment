// my-babel-plugin.js:
module.exports = function myBabelPlugin() {
  return {
    visitor: {
      // https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-block-scoping/src/index.js#L26
      VariableDeclaration(path) {
        console.log("VariableDeclaration() kind:", path.node.kind); // const

        // const => var로 변환
        if (path.node.kind === "const") {
          path.node.kind = "var";
        }
      },
    },
  };
};
