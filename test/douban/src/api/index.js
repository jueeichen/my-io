import ajax from './ajax'
//mock:

export const reqHomes = () => ajax('/home')
export const reqTopics = () => ajax('/topic')
export const reqItem = () => ajax('/item')
export const reqLogin = () => ajax('/login')

