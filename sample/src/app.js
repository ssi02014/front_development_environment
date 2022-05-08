import './app.css';
import './foo.css';
import nyancat from './nyancat.jpeg';
import axios from 'axios';

console.log(process.env.NODE_ENV);

document.addEventListener('DOMContentLoaded', async () => {
  const res = await axios.get('/api/keywords');

  console.log(res);

  document.body.innerHTML = `
    <img src="${nyancat}" />
  `;
});
