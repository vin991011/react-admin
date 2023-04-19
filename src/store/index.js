
import { createContext, useContext } from 'react'
import ChannelStore from './channel.store'
import LoginStore from './login.store'

class RootStore {
  constructor() {
    this.channelStore = new ChannelStore()
    this.loginStore = new LoginStore()
  }
}
const rootStore = new RootStore()

const context = createContext(rootStore)

const useStore = () => useContext(context)

export { useStore }