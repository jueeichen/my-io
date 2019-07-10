import ajax from './ajax'

// let baseUrl = '/openwallet-api';//  服务器代理 /openwallet-api     本地代理: /api
// let baseUrl = '/api';//

// export const reqNewsById = (id) => ajax(`../api/news/arc/${id}`);
export const reqNewsById = (name,pass,auth) => ajax(`http://localhost:3000/users/add`,{name,pass,auth},'POST');
// export const reqNewsById = (id) => ajax(`/news`);


