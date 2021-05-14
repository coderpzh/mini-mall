// pages/detail/childCnps/w-dImg/w-dImg.js
Component({
  properties: {
    detailInfo : {
      type : Object,
      value : {}
    }
  },
  data : {
    count : 0
  },
  methods : {
    imgLoad(){
      this.data.count ++
      const length = this.data.detailInfo.detailImage[0].list.length
      //判断，所有图片加载完后只传一次事件
      if(this.data.count == length) this.triggerEvent('imgLoad')
    }
  }
})
