import './app.css';
// import './foo.css';
// import nyancat from './nyancat.jpeg';
// import axios from 'axios';

// console.log(process.env.NODE_ENV);

// document.addEventListener('DOMContentLoaded', async () => {
//   const res = await axios.get('/api/keywords');
//   document.body.innerHTML = `
//     <img src="${nyancat}" />
//   `;
// });

// HMR 예제
import form from './form';
// import result from './result';

let resultEl;
let formEl;

// function sayHello() {
//   import(/* webpackChunkName: "hello" */ './hello').then(({ default: Hello }) =>
//     document.body.appendChild(Hello()),
//   );
// }

document.addEventListener('DOMContentLoaded', async () => {
  formEl = document.createElement('div');
  formEl.innerHTML = form.render();
  document.body.appendChild(formEl);

  import(/* webpackChunkName: "result" */ './result').then(
    async ({ default: result }) => {
      resultEl = document.createElement('div');
      resultEl.innerHTML = await result.render();
      document.body.appendChild(resultEl);
    },
  );
});

// if (module.hot) {
//   console.log('핫 모듈 켜짐');
//   module.hot.accept('./result', async () => {
//     resultEl.innerHTML = await result.render();
//   });
//   module.hot.accept('./form', async () => {
//     formEl.innerHTML = form.render();
//   });
// }

// console.log('app.js');
