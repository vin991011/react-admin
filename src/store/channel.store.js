import { action, makeAutoObservable } from "mobx"
import heimaAxios from "../utils/heimaAxios"

class ChannelStore {
  channelList = []
  constructor() {
    makeAutoObservable(this)
  }

  loadChannelList = async () => {
    const res = await heimaAxios.get('/channels')
    this.channelList = res.data.channels
  }
}

export default ChannelStore