import ajax from './ajax'

// let baseUrl = '/openwallet-api';//  服务器代理 /openwallet-api     本地代理: /api
// let baseUrl = '/api';//

// export const reqNewsById = (id) => ajax(`../api/news/arc/${id}`);
export const reqNewsById = () => ajax(`http://localhost:3000/login/login`,{username:'z1',password:'123'},'POST');
// export const reqNewsById = (id) => ajax(`/news`);
export const reqUserMessageById = () => ajax(`http://localhost:4000/login/login`,{username:'z1',password:'123'},'POST');
export const reqAddUserMessage = (userMessage) => ajax(`http://localhost:4000/userm/addUser`,userMessage,'POST');
export const reqShowUserMessage = () => ajax(`http://localhost:4000/userm/showUser`);
export const reqDeleteUserMessage = ({name}) => ajax(`http://localhost:4000/userm/delUser`,{name},'POST');
export const reqUpdateUserMessage = (data) => ajax(`http://localhost:4000/userm/updateUser`,data,'POST');



