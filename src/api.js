import axios from 'axios'

const apix = axios.create({
  baseURL: '/IllusService.svc/'
})

export default apix
