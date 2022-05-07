import './app.css';
import './foo.css';
import nyancat from './nyancat.jpeg';

console.log(process.env.NODE_ENV);

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = `
    <img src="${nyancat}" />
  `;
});
