<template>
  <div class="dialog" v-if="$active">
    <div class="dialog-window" :style="getSizeStyleDialogWindow()">
      <slot name="header" class="dialog-window__item header"></slot>
      <slot name="content" class="dialog-window__item content"></slot>
      <slot name="footer" class="dialog-window__item footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DialogWindow',
  inject: {
    $active: {
      default: false
    }
  },
  props: {
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 400
    }
  },
  data () {
    return {
    }
  },
  methods: {
    getSizeStyleDialogWindow: function () {
      console.log(this.width)
      return `
        width: ${this.width}px;
        height: ${this.height}px;
      `
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dialog {
  width: 100%;
  height: 100vh;
  background-color: rgba(240, 240, 240, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.dialog-window {
  background-color: rgb(200, 200, 200);
  margin: 0 auto;
  color: black;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.dialog-window__item{
  display: flex;
  flex-direction: column;
}
.header {

}
.content {
  flex: 1;
}
.footer {

}
</style>
