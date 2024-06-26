export interface UserInfo {
  user:user
  token: string
}

export interface user{
  id: string
  name: string
  headUrl: string
  roles: string[]
  balance: number
  isClerk: number
  openId:string
}

export interface LoginRes {
  token: string
}
