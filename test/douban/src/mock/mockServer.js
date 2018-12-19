/*
使用mockjs提供mock数据接口
 */
import Mock from 'mockjs'
import home_data from './home_data.json'
import topic_data from './topic_data.json'
// import item_data from './item_data.json'
import item_data from './datanav.json'
import login_data from './login_data.json'

//返回home页数据的接口
Mock.mock('/home', {code:0, data: home_data});
//返回识物页数据的接口
Mock.mock('/topic', {code:0, data: topic_data});
Mock.mock('/item', {code:0, data: item_data});
Mock.mock('/login', {code:0, data: login_data});


