import http from '@/utils/http'
import { prefix,Temp_interface } from '../config'
import type * as User from './type'
import type { MenuItem } from '@/apis/system/type'

/** @desc 登录 */
export function login(data: { username: string; password: string }) {
  return http.post<User.LoginRes>(`${prefix}/api/login`, data)
}

/** @desc 退出登录 */
export function logout() {
  return http.post(`${prefix}/api/logout`)
}

/** @desc 获取用户信息 */
export const getUserInfo = () => {
  return http.get<User.UserInfo>(`${Temp_interface}${prefix}/api/getUserInfo`)
}

/** @desc 获取用户路由信息 */
export const getUserAsyncRoutes = () => {
  return http.get<MenuItem[]>(`${Temp_interface}${prefix}/api/routes`)
}
