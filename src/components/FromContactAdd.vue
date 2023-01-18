<template>
  <DialogWindow
    :height="300"
    :width="400"
  >
    <template v-slot:header>
      <div class="dialog-header">
        <div>
          Добавление пользователя
        </div>
        <div>
          <ButtonUniversal type="svg" :file="crossSVG" @onClickButton="onClickButtonClose()" />
        </div>
      </div>
    </template>
    <template v-slot:content>
      <div class="dialog-content">
        <div class="dialog-content__item">
          <div>Имя</div>
          <div>
            <input type="text" v-model="user.name">
          </div>
        </div>
        <div class="dialog-content__item">
          <div>Телефон</div>
          <div>
            <input type="text" v-model="user.tel">
          </div>
        </div>
        <div class="dialog-content__item">
          <div>Начальник</div>
          <div>
            <select v-model="user.parent" >
              <option v-for="item in getParent" :key="item.id" :value="item.id">{{item.name}}</option>
            </select>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="dialog-footer">
        <div>
          <ButtonUniversal name="Сохранить" @onClickButton="onClickButtonSave()" />
        </div>
        <div>
        </div>
      </div>
    </template>
  </DialogWindow>
</template>

<script>

import DialogWindow from './UI/dialog/DialogWindow.vue'
import ButtonUniversal from '../components/UI/buttons/ButtonUniversal.vue'

export default {
  name: 'FromContactAdd',
  components: {
    DialogWindow,
    ButtonUniversal
  },
  props: {
    headers: Array,
    userList: Array
  },
  data () {
    return {
      crossSVG: require('../assets/cross.svg'),
      user: {
        name: '',
        tel: '',
        parent: ''
      }
    }
  },
  methods: {
    onClickButtonClose: function () {
      this.$emit('onClickButtonClose')
    },
    onClickButtonSave: function () {
      let user = this._.assign(this.user)
      this.$emit('onClickButtonSave', user)
      this.user = {
        name: '',
        tel: '',
        parent: ''
      }
    },
    getParentUser: function (array) {
      let user = []
      array.forEach(item => {
        if (item.child.length > 0) {
          user.push(...this.getParentUser(item.child))
        }
        user.push(item)
      })
      return user
    }
  },
  computed: {
    getParent: function () {
      return this.getParentUser(this.$props.userList)
    }
  }
}
</script>

<style scoped>
.dialog-header {
  display: flex;
  padding: 20px 20px;
  justify-content: space-between;
  align-items: center;
}
.dialog-footer {
  display: flex;
  padding: 20px 20px;
  justify-content: space-between;
  align-items: center;
}
.dialog-content__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px;
}
.dialog-content__item input {
  border-radius: 4px;
  padding: 3px;
}
.dialog-content__item select {
  width: 150px;
  padding: 5px 15px;
  border-radius: 4px;
  border: 1px solid;
}
.dialog-content {
  padding: 0px 20px;
}

</style>
