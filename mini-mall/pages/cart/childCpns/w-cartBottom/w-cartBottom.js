// pages/cart/childCpns/w-cartBottom/w-cartBottom.js
Component({
  properties : {
    totalPrice : {
      type : Number,
      value : ''
    },
    cartLength : {
      type : Number,
      value : ''
    }
  },
  data : {
    checked : true
  },
  methods: {
    allCheck(){
      this.triggerEvent('selectAll')
    },
    checkAll(x){
      this.setData({
        checked : x
      })
    }
  }
})
