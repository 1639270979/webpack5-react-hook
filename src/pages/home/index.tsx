/*
 * @Description:
 * @Author: ShuaiBi
 * @Date: 2021-05-28 10:06:24
 * @LastEditTime: 2022-06-14 15:00:58
 * @LastEditors:
 */
import React from 'react'
import styles from './index.module.scss'

export default function Home() {
  // const aa = () => {

  // }

  console.log('1245')

  return (
    <div style={{ textAlign: 'center', paddingTop: '10vh' }}>
      <p>首页示例</p>
      <p className="name">
        你可以在
        {' '}
        <code>./pages/home/index.tsx</code>
        更改这里的内s
      </p>
      <p>
        在 pages 目录新建目录，然后在
        {' '}
        <code>./router.tsx</code>
        {' '}
        里添加路由配置eedssasdssd
      </p>
      <div className={styles.demo}>有东西</div>

      <div className={styles.demo1}>没有有东西</div>
    </div>
  )
}
