import ajax from './ajax'

// let baseUrl = '/openwallet-api';//  服务器代理 /openwallet-api     本地代理: /api
// let baseUrl = '/api';//

// export const reqNewsById = (id) => ajax(`../api/news/arc/${id}`);
export const reqNewsById = (id) => ajax(`http://localhost:3000/login/login`,{username:'z1',password:'123'},'POST');
// export const reqNewsById = (id) => ajax(`/news`);


