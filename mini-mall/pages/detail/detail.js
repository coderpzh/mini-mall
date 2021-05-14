// pages/detail/detail.js
import {getDetail,getRecommend} from '../../service/detail'
import {Goods,Shop,GoodsParam,GoodsComment} from '../../service/detail'
import {throttle} from '../../utils/util'

Page({
  data : {
    navText : ['商品','参数','评论','推荐'],
    topImage : [],
    goodsInfo : {},
    shopInfo : {},
    detailInfo : {},
    detailParams : {},
    detailComment : {},
    detailRecomd : [],
    toTop : '',
    isHidden : true,
    themeId : '',
    themeHeight : [Number.MAX_VALUE],
    idList : ['swiper','table','comment','recomd'],
    iid : ''
  },
  onLoad: function (options) {
    this.data.iid = options.iid
    this._getDetail(options.iid)
    // this._getDetail('1jw0sr2')
    this._getRecommend()
  },
  _getDetail(iid){
    getDetail(iid).then(res => {
      const data = res.data.result
      const image = data.itemInfo.topImages
      const text = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      const shop = new Shop(data.shopInfo)
      const detail = data.detailInfo
      const params = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      
      //有些商品没有评论信息
      let comment = ''
      if(data.rate.list) comment =  new GoodsComment(data.rate.list[0])

      this.setData({
        topImage : image,
        goodsInfo : text,
        shopInfo : shop,
        detailInfo : detail,
        detailParams : params,
        detailComment : comment
      })
    })
  },
  _getRecommend(){
    getRecommend().then(res => {
      const recomd = res.data.data.list
      this.setData({
        detailRecomd : recomd
      })
    })
  },
  backTop(){
    this.setData({
      toTop : 0
    })
  },
  scrolling(e){
    const top = e.detail.scrollTop
    const show = top <= 1000
    if(this.data.isHidden !== show){
      this.setData({
        isHidden : show
      })
    }
    this.themeMove(top)
  },
  navClick(e){
    const index = e.detail.index
    this.setData({
      themeId : this.data.idList[index]
    })
  },
  imgLoad(){
    const data = this.data.themeHeight
    for(let i of this.data.idList){
      wx.createSelectorQuery().select('#'+i).boundingClientRect(rect => {
        data.splice(data.length-1,0,rect.top)
      }).exec()
    }
  },
  themeMove(top){
    const nav_bar = this.selectComponent('#nav-bar')
    const height = this.data.themeHeight
    const navHeight = this.data.themeHeight[0] + 2
    const index = nav_bar.data.isActive

    for(let x=0; x<height.length-1; x++){
      if(index !== x && top >= height[x] - navHeight && top < height[x+1] - navHeight){
        nav_bar.setData({
          isActive : x
        })
      }
    }
  },
  addCart(){
    const cartInof = {
      iid : this.data.iid,
      img : this.data.topImage[0],
      price : this.data.goodsInfo.realPrice,
      title : this.data.goodsInfo.title,
      desc : this.data.goodsInfo.desc,
      count : 1,
      isCheck : true
    }
    const app = getApp()
    const newGood = app.appData.cartList.find(item => item.iid == this.data.iid)
    if(newGood){
      newGood.count++
    }else{
      app.appData.cartList.push(cartInof)
    }
    // find比for循环更高效，不用每个都遍历一遍
    // let isFound = false
    // for(let x of app.appData.cartList){
    //   if(x.iid == this.data.iid){
    //     x.count++
    //     isFound = true
    //   }
    // }
    // if(!isFound){
    //   app.appData.cartList.push(cartInof)
    // }
  }
})