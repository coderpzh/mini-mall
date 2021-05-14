// pages/detail/childCnps/w-navBar/w-navBar.js
Component({
  properties: {
    list : {
      type : Array,
      value : []
    }
  },
  data : {
    isActive : 0
  },
  methods : {
    navClick(event){
      const index = event.currentTarget.dataset.navidex
      this.setData({
        isActive : index
      })
      this.triggerEvent('navClick',{index}) //es6增强语法 {index : index}
    }
  }
})
