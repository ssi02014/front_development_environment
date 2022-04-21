module.exports = function myWebpackLoader(content) {
  return content.replace("console.log(", "alert(");
};
