<template>
  <div>
    <table>
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header.id"
            @click="onClickHeaderFromSortTable(header.sorttable)"
          >
          <div class="table-th">
            <div class="arrowSVG" v-if="header.sorttable">
              <img v-if="typeSort == 'asc'" :src="arrowUpSVG" />
              <img v-if="typeSort == 'dsc'" :src="arrowDownSVG" />
            </div>
            <div class="table-th__header">
              {{ header.name }}
            </div>
          </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <ContactTableItem
          v-for="value in getTableValues"
          :key="value.id"
          :value="value"
        ></ContactTableItem>
      </tbody>
    </table>
  </div>
</template>

<script>
import ContactTableItem from './ContactTableItem.vue'

export default {
  name: 'ContactTable',
  components: {
    ContactTableItem
  },
  props: {
    headers: Array,
    values: Array
  },
  data () {
    return {
      oldValues: [],
      typeSort: '',
      arrowUpSVG: require('../assets/arrow-up.svg'),
      arrowDownSVG: require('../assets/arrow-down.svg')
    }
  },
  created: function () {
    this.init()
  },
  methods: {
    init: function () {
      this.oldValues = this._.assign(this.$props.values)
    },
    onClickHeaderFromSortTable: function (sorttable) {
      if (sorttable === false) {
        return
      }
      switch (this.typeSort) {
        case 'asc': {
          this.typeSort = 'dsc'
          break
        }
        case 'dsc': {
          this.typeSort = ''
          break
        }
        case '': {
          this.typeSort = 'asc'
          break
        }
        default: break
      }
    },
    sortData: function (data, label, order) {
      data.sort((a, b) => {
        const x = order === 'asc' ? a : b
        const y = order === 'asc' ? b : a

        if ([x[label], y[label]].some(e => typeof e === 'string')) {
          return x[label].localeCompare(y[label])
        } else {
          return x[label] - y[label]
        }
      })

      data.forEach(el => {
        if (el.child) {
          this.sortData(el.child, label, order)
        }
      })
    }
  },
  computed: {
    getTableValues: function () {
      if (this.typeSort === '') {
        return this.oldValues
      }
      let array = JSON.parse(JSON.stringify((this.$props.values)))

      this.sortData(array, 'name', this.typeSort)
      return array
    }
  }
}
</script>

<style scoped>
.arrowSVG {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.arrowSVG img {
  width: 100%;
  height: 100%;
}
table {
  border: 1px solid #ccc;
  border-spacing: 3px;
  border-collapse: collapse;
  margin-top: 20px;
  border-left: 0px solid;
  width: 100%;
}
th {
  border: solid 1px #ccc;
  padding: 10px 40px;
  padding: 15px 0px;
}
.table-th {
  display: flex;
  align-content: center;
  justify-content: center;
}
.table-th__header {
  cursor: pointer;
}
</style>
