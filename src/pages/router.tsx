/*
 * @Description:
 * @Author: ShuaiBi
 * @Date: 2021-05-28 10:06:24
 * @LastEditTime: 2022-06-09 11:52:56
 * @LastEditors:
 */
import React, { lazy, Suspense } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

const Home = lazy(() => import('./home'))
export default function Routers() {
  return (
    <Router basename={__DEV__ ? '/' : '/'}>
      <Suspense fallback={<div>Loading</div>}>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </Suspense>
    </Router>
  )
}
