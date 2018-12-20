import ajax from './ajax'
//mock:

export const reqHomes = () => ajax('/home')
export const reqTopics = () => ajax('/topic')
export const reqItem = () => ajax('/item')
// export const reqLogin = () => ajax('/login')
export const reqLogin = () => ajax(`http://localhost:3000/login/login`, {username: 'z1', password: '123'}, 'POST');


