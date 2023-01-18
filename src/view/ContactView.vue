<template>
  <div>
    <div class="container">
      <ButtonUniversal
        name="Добавить"
        @onClickButton="openFromContact"
      />
      <ContactTable
        :values="valuesTable"
        :headers="headersTable"
        :key="keyTable"
      />
    </div>
   <FromContactAdd
      @onClickButtonClose= "closeFormContact"
      @onClickButtonSave= "saveContact"
      :userList="valuesTable"
    />
  </div>
</template>

<script>
import ContactTable from '../components/ContactTable.vue'
import FromContactAdd from '../components/FromContactAdd.vue'
import ButtonUniversal from '../components/UI/buttons/ButtonUniversal.vue'

import { computed } from 'vue'

export default {
  name: 'ContactView',
  components: {
    ContactTable,
    FromContactAdd,
    ButtonUniversal
  },
  data () {
    return {
      active: false,
      keyTable: 0,
      headersTable: [
        {
          id: 1,
          name: 'Имя',
          sorttable: true
        },
        {
          id: 2,
          name: 'Телефон',
          sorttable: false
        }
      ],
      valuesTable: [
        {
          id: 0,
          name: 'Данил',
          tel: '89306950086',
          level: 0,
          show: false,
          child: [
            {
              id: 1,
              name: 'Женя',
              tel: '89306950086',
              level: 1,
              show: false,
              child: [
                {
                  id: 2,
                  name: 'Дима',
                  tel: '89306950086',
                  level: 2,
                  show: false,
                  child: [
                    {
                      id: 3,
                      level: 3,
                      show: false,
                      name: 'Антон',
                      tel: '89306950086',
                      child: []
                    }
                  ]
                }
              ]
            },
            {
              id: 8,
              name: 'Женя',
              tel: '89306950086',
              level: 1,
              show: false,
              child: []
            }
          ]
        },
        {
          id: 4,
          name: 'Антон',
          tel: '89306950086',
          show: false,
          level: 0,
          child: [
            {
              id: 5,
              name: 'Женя',
              tel: '89306950086',
              show: false,
              level: 1,
              child: [
                {
                  id: 6,
                  name: 'Дима',
                  tel: '89306950086',
                  show: false,
                  level: 2,
                  child: [
                    {
                      id: 7,
                      name: 'Антон',
                      tel: '89306950086',
                      show: false,
                      level: 3,
                      child: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  provide () {
    return {
      $active: computed(() => this.active)
    }
  },
  created: function () {
    this.init()
  },
  methods: {
    init: function () {
      let contacts = localStorage.getItem('contacts')

      if (contacts) {
        this.valuesTable = JSON.parse(contacts)
      }
    },
    openFromContact: function () {
      this.active = true
    },
    closeFormContact: function () {
      this.active = false
    },
    findNode: function (id, array) {
      for (const node of array) {
        if (node.id === id) return node
        if (node.child) {
          const child = this.findNode(id, node.child)
          if (child) return child
        }
      }
    },
    saveContact: function (user) {
      this.active = false
      let parent = this.findNode(user.parent, this.valuesTable)

      user.id = self.crypto.randomUUID()
      user.level = parent.level + 1
      user.show = true
      user.child = []

      parent.child.push(user)

      this.keyTable += 1
      this.valuesTable = JSON.parse(JSON.stringify(this.valuesTable))

      localStorage.setItem('contacts', JSON.stringify(this.valuesTable))
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
table,
td {
    border: 1px solid #333;
}
thead,
tfoot {
    background-color: #333;
    color: #fff;
}
</style>
