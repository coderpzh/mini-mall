// pages/cart/cart.js
Page({
  data : {
    cartList : '',
    cartItem : '',
    cartBottom : '',
    totalPrice : '',
    cartLength : ''
  },
  onShow: function () {
    const app = getApp()
    const item = this.selectComponent('#cartItem')
    const bottom = this.selectComponent('#cartBottom')
    this.setData({
      cartList : app.appData.cartList,
      cartItem : item,
      cartBottom : bottom,
    })
    this.getInfo()
  },
  selectAll(){
    //全选按钮
    if(this.data.cartBottom.data.checked){
      this.data.cartItem.checkAll(false)
      this.data.cartBottom.checkAll(false)
    }else{
      this.data.cartItem.checkAll(true)
      this.data.cartBottom.checkAll(true)
    }
    this.getInfo()
  },
  itemClick(){
    //监听商品按钮的点击，判断全选按钮的状态
    //find函数用于找出首个符合条件的数组成员并返回，所有成员依次执行该回调函数
    //且结果为true才返回该成员，找不到则返回undefined

    //满足条件即某个isCheck为false时，返回这个整个的商品对象，再取反为false
    //不满足条件时即所有isCheck都为true，返回undefined，再取反为true
    
    //该方法比遍历高效，因为遍历要全部都遍历一遍，而find找到首个符合条件的就返回
    // let allCheck = true
    // for(let x of this.data.cartList){
    //   if(!x.isCheck){
    //     this.data.cartBottom.checkAll(false)
    //     allCheck = false
    //   }
    // }
    // if(allCheck){
    //   this.data.cartBottom.checkAll(true)
    // }
    const allCheck = this.data.cartList.find(item => !item.isCheck)
    if(!allCheck){
      this.data.cartBottom.checkAll(true)
    }else{
      this.data.cartBottom.checkAll(false)
    }
    this.getInfo()
  },
  getInfo(){
    //计算购物车length + 合计价格
    const price = this.data.cartList.filter(n => n.isCheck).reduce((p,n) => {
      return p + n.count * n.price
    },0).toFixed(2)
    const length = this.data.cartList.filter(n => n.isCheck).length
    this.setData({
      totalPrice : price,
      cartLength : length
    })
  }
})