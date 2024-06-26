import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import { resetRouter } from '@/router'
import { login as loginApi, logout as logoutApi, getUserInfo as getUserInfoApi } from '@/apis'
import type { user } from '@/apis'
import { setToken, clearToken, getToken } from '@/utils/auth'
import { resetHasRouteFlag } from '@/router/permission'

const storeSetup = () => {
  const userInfo = reactive<Pick<user, 'name' | 'headUrl'>>({
    name: '',
    headUrl: ''
  })
  const name = computed(() => userInfo.name)
  const avatar = computed(() => userInfo.headUrl)

  const token = ref(getToken() || '')
  const roles = ref<string[]>([]) // 当前用户角色
  // const permissions = ref<string[]>([]) // 当前角色权限标识集合

  // 重置token
  const resetToken = () => {
    token.value = ''
    clearToken()
    resetHasRouteFlag()
  }

  // 登录
  const login = async (params: any) => {
    const res = await loginApi(params)
    setToken(res.data.token)
    token.value = res.data.token
  }

  // 退出
  const logout = async () => {
    try {
      await logoutApi()
      token.value = ''
      roles.value = []
      // permissions.value = []
      resetToken()
      resetRouter()
      return true
    } catch (error) {
      return false
    }
  }

  // 获取用户信息
  const getInfo = async () => {
    const res = await getUserInfoApi()
    const data = res.data.user;
    userInfo.name = data?.name
    userInfo.headUrl = data.headUrl
    if (data.roles && data.roles.length) {
      roles.value = data.roles
      // permissions.value = res.data.permissions
    }
  }

  // 模拟用 临时模拟token过期
  const editToken = (value: string) => {
    token.value = value
    setToken(token.value)
  }

  return { userInfo, name, avatar, token, roles, login, logout, getInfo, resetToken, editToken }
}

export const useUserStore = defineStore('user', storeSetup, {
  persist: { paths: ['token', 'roles'], storage: localStorage }
})
