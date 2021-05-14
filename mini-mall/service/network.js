const baseUrl = 'http://152.136.185.210:7878/api/m5'

export default function request(options){
  return new Promise((resolve,reject) => {
    wx.request({
      url: baseUrl + options.url,
      data: options.data || {},
      method: options.method || 'get',
      success: resolve,
      fail: reject
    })
  })
}