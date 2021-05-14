// pages/home/childCpn/w-swiper/w-swiper.js
Component({
  data : {
    done : true
  },
  methods : {
    eventTap(){
      if(this.data.done){
        this.triggerEvent('imgLoad')
        this.data.done = false
      }
    }
  },
  properties: {
    list : {
      type : Array,
      value : []
    },
    _mode : {
      type : String,
      value : ''
    }
  },
  externalClasses : ['sw-class']
})
