// pages/home/childCpns/tabControl/tabControl.js
Component({
  properties : {
    isHidden : {
      type : Boolean,
      value : false
    }
  },
  data: {
    tabList : ['流行','新款','精选'],
    tabIndex:0
  },
  methods:{
    handleTap(event){
      const currentIndex = event.currentTarget.dataset.index
      this.setData({
        tabIndex : currentIndex
      })
      this.triggerEvent('tabClick',{tabIndex:this.data.tabIndex})
    }
  }
})
