/*
 * @Description:
 * @Author: ShuaiBi
 * @Date: 2021-05-28 10:06:23
 * @LastEditTime: 2022-06-09 11:46:02
 * @LastEditors:
 */
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Routers from './pages/router'

const App = () => (
  <div className="app" id="app">
    <Routers />
  </div>
)

ReactDOM.render(
  <App />,
  document.getElementById('root'),
)

// if (module.hot) {
//  module.hot.accept('./print.js', function() {
//       console.log('Accepting the updated printMe module!');
//       printMe();
//    })
//  }
