// import { createPinia } from 'pinia'
// import {boot} from 'quasar/wrappers'
// /*
//  * If not building with SSR mode, you can
//  * directly export the Store instantiation;
//  *
//  * The function below can be async too; either use
//  * async/await or return a Promise which resolves
//  * with the Store instance.
//  */
//
// export default boot( async (/* { ssrContext } */ {app}) => {
//   const pinia = createPinia()
//
//   // You can add Pinia plugins here
//   // pinia.use(SomePiniaPlugin)
//   app.use(pinia)
//   if (process.env.CLIENT) {
//     pinia.state.value = JSON.parse(window.__pinia)
//   }
//   // return pinia
// })
