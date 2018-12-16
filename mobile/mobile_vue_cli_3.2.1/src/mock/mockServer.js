/*
使用mockjs提供mock数据接口
 */
import Mock from 'mockjs'


import news from './data.json'


Mock.mock('/news', {code:0, data: news});



