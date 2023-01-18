<template>
  <div>
    <template v-if="type == 'button'">
      <div class="button">
        <input type="button" :value="name" @click="onClickButton()">
      </div>
    </template>
    <template v-if="type == 'svg'">
      <div class="svgButton">
        <img :src="file" @click="onClickButton()" />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ButtonUniversal',
  props: {
    name: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'button'
    },
    file: {
      default: ''
    },
    width: {
      type: Number,
      default: 30
    },
    height: {
      type: Number,
      default: 40
    }
  },
  data () {
    return {
    }
  },
  methods: {
    onClickButton: function () {
      this.$emit('onClickButton')
    }
  }
}
</script>

<style>
  .btn {
    display: initial;
    padding: 5px 10px;
    width: auto;
    border-radius: 20px;
    background-color: cadetblue;
    cursor: pointer;
  }
  .svgButton{
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .svgButton img{
    width: 100%;
    height: 100%;
  }
  .button input {
    width: 150px;
    padding: 5px 15px;
    border-radius: 4px;
    border: 1px solid;
  }
</style>
