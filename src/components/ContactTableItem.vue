<template>
  <div style="display: contents;">
    <tr>
      <td class="td-name" :style="`margin-left: ${value.level * 10}px;`">
        <div v-if="value.child.length > 0 && !value.show" @click="swap()"> + </div>
        <div v-if="value.child.length > 0 && value.show"  @click="swap()"> - </div>
        <div> {{ value.name }} </div>
      </td>
      <td> {{ value.tel }} </td>
    </tr>
    <ContactTableItem
      v-show="value.show"
      v-for="val in value.child"
      :key="val.id"
      :value="val"
    ></ContactTableItem>
  </div>
</template>

<script>

export default {
  name: 'ContactTableItem',
  props: {
    value: Object
  },
  data () {
    return {

    }
  },
  methods: {
    swap: function () {
      this.value.show = !this.value.show
    }
  }
}
</script>

<style scoped>
.td-name {
  display: flex;
}
.td-name div:first-child {
  margin-right: 10px;
  margin-left: 10px;
  cursor: pointer;
}
td, th{
  border: solid 1px #ccc;
  border-spacing: 20px 0em;
  padding: 15px 0px;
}
</style>
