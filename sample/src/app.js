import * as math from "./math.js";
import "./app.css";
import "./foo.css";
import nyancat from "./nyancat.jpeg";

console.log(process.env.NODE_ENV);
console.log(EXAMPLE);
console.log(STRING_EXAMPLE);
console.log(api.domain);

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = `
    <img src="${nyancat}" />
  `;
});
