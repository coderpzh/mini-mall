// pages/home/home.js
import {getHomeMultidata,getHomeData} from '../../service/home.js'

Page({
  data: {
    nweBanner : [],
    banners : '',
    recomds : '',
    goods:{
      pop : {list:[] , page:0},
      new : {list:[] , page:0},
      sell : {list:[] , page:0},
    },
    goodsType : 'pop',
    tabInfo : ['pop','new','sell'],
    isBacktop : false,
    tabTop : '',
    isTab2 : true
  },
  onLoad: function (options) {
    this._getHomeMultidata()
    this._getHomeData('pop')
    this._getHomeData('new')
    this._getHomeData('sell')
  },

  //-----------------------------------网络请求------------------------------
  _getHomeMultidata(){
    getHomeMultidata().then(res => {
      const banner = res.data.data.banner.list
      this.getBannerImg(banner)
      this.setData({
        banners : this.data.nweBanner,
        recomds : res.data.data.recommend.list
      })
    })
  },
  _getHomeData(type){
    let page = this.data.goods[type].page + 1
    getHomeData(type,page).then(res => {
      const dataList = res.data.data.list
      const newList = this.data.goods[type].list
      newList.push(...dataList)
      
      let list = `goods.${type}.list`   //es6拼接变量 : ${}承载变量，拼接时必须用反引号``
      let page = `goods.${type}.page`
      this.setData({
        [list] : newList,
        [page] : this.data.goods[type].page+1
      })
    })
  },

  //-----------------------------------事件监听------------------------------
  onPageScroll(event){
    // -----------------------------回到顶部的显隐----------------------------
    //判断：满足条件后只执行一次赋值
    //当滚动高度小于1000时isShow为false，等于isBacktop(默认为false)，不满足条件，不执行赋值

    //当滚动高度大于1000时isShow为true，不等于isBacktop(默认为false)，满足条件
    //继续往下滚动isShow也是为true，满足条件后两者都为true，不符合条件，不执行赋值
    const isShow = event.scrollTop >= 1000
    if(isShow !== this.data.isBacktop){
      this.setData({
        isBacktop : isShow
      })
    }
    // -----------------------------tab2的显隐----------------------------
    if(this.data.isTab2 && event.scrollTop >= this.data.tabTop){
      this.setData({
        isTab2 : false
      })
    }else if(!this.data.isTab2 && event.scrollTop <= this.data.tabTop){
      this.setData({
        isTab2 : true
      })
    }
  },
  onReachBottom(){
    this._getHomeData(this.data.goodsType)
  },
  changeGoods(event){
    const index = event.detail.tabIndex
    this.setData({
      goodsType : this.data.tabInfo[index]
    })
    
    const tab1 = this.selectComponent('#tab1')
    const tab2 = this.selectComponent('#tab2')
    tab1.setData({
      tabIndex : index
    })
    tab2.setData({
      tabIndex : index
    })
  },
  backTop(){
    wx:wx.pageScrollTo({
      duration: 300,
      scrollTop: 0
    })
  },
  imgLoad(){
    wx.createSelectorQuery().select('#tab1').boundingClientRect(rect => {
      this.setData({
        tabTop : rect.top
      })
    }).exec()
  },
  getBannerImg(x){
    for(let i of x){
      this.data.nweBanner.push(i.image)
    }
  }
})