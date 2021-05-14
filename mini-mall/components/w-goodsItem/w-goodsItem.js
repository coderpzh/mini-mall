// components/w-goodsItem/w-goodsItem.js
Component({
  properties : {
    goodsItem: {
      type : Object,
      value : {}
    }
  },
  methods : {
    toDetailPage(){
      const goodsId = this.data.goodsItem.iid
      if(goodsId){
        wx.navigateTo({
          url: `/pages/detail/detail?iid=${goodsId}`
        })
      }
    }
  }
})
