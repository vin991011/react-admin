import { makeAutoObservable } from "mobx"
import { getToken, setToken, removeToken } from "../utils/token"
import heimaAxios from "../utils/heimaAxios"

class LoginStore {
  token = getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }
  getToken = async (mobile, code) => {
    const res = await heimaAxios.post('http://geek.itheima.net/v1_0/authorizations', { mobile, code })
    this.token = res.data.token
    setToken(this.token)
  }
  loginOut = () => {
    this.token = ''
    removeToken()
  }
}

export default LoginStore