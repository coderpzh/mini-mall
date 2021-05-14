// pages/cart/childCpns/w-cartItem/w-cartItem.js
Component({
  properties : {
    cartList : {
      type : Array,
      value : []
    }
  },
  methods: {
    _getApp(){
      const app = getApp()
      this.data.cartList = app.appData.cartList
    },
    check(event){
      this._getApp()
      const index = event.currentTarget.dataset.index
      const check = `cartList[${index}].isCheck`
      this.setData({
        [check] : !this.data.cartList[index].isCheck
      })
      this.triggerEvent('itemClick')
    },
    checkAll(y){
      this._getApp()
      for(let x=0; x<this.data.cartList.length; x++){
        const check = `cartList[${x}].isCheck`
        this.setData({
          [check] : y
        })
      }
    }
  }
})
