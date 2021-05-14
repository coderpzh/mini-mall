// pages/detail/childCnps/w-dBottom/w-dBottom.js
Component({
  methods: {
    cartClick(){
      this.triggerEvent('addCart')
      wx.showToast({
        title: '加入购物车成功'
      })
    }
  }
})
