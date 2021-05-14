// components/w-backTop/w-backTop.js
Component({
  properties: {
    isHidden:{
      type : Boolean,
      value : true
    }
  },
  methods: {
    backTop(){
      this.triggerEvent('_backTop')
    }
  },
  externalClasses : ['bt-class']
})
