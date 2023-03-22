
<script>
import draggable from 'vuedraggable'
import Toggle from '@/components/Toggle'

export default {
  name: 'TheDraggable',

  components: {
    draggable,
    Toggle
  },

  props: {
    list: {
      type: Array,
      required: true
    }
  },

  computed: {
    listChecked () {
      return this.list.map(item => ({
        ...item, checked: false
      }))
    },
    draggableList: {
      get () { return this.list },

      set (sortedList) { this.$emit('sort', sortedList) }
    }
  },

  methods: {
    setStatus (id) {
      this.$refs['Toggle-' + id][0].toggle()
    },
    select (index) {
      this.listChecked[index].checked = !this.listChecked[index].checked
      this.$emit('select', this.listChecked.filter(({ checked }) => checked))
    },
    unselect (list) {
      list.forEach(({ id }) => {
        let checkbox = document.getElementById('Checkbox-' + id)
        checkbox.checked = false
        // засетить и перерисовать
        checkbox = this.listChecked.find(item => item.id === id)
        checkbox.checked = false
      })

      this.$emit('select', [])
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="header">
      <div class="title">Имя Фамилия</div>
      <div class="sub-title">Активность</div>
    </div>

    <draggable
      v-model="draggableList"
      handel=".drag"
      >

      <div
        class="draggable-person"
        v-for="(person, index) in listChecked"
        :key="person.id"
      >

        <div class="person-box">
          <ion-icon class="drag" name="apps-outline"></ion-icon>

          <input
            :id="'Checkbox-' + person.id"
            type="checkbox"
            :checked="person.checked"
            @change="select(index)">

          <span @click="$router.push({ name: 'user-id', params: { id: person.id } } )">
            {{ person.name }}
            {{ person.surname}}
          </span>
        </div>

        <toggle
          :ref="'Toggle-' + person.id"
          class="toggle"
          :value="person.active"
          @change="v => $emit('toggleActive', { id: person.id, active: Number(v) })"
        />
      </div>
    </draggable>
  </div>
</template>

<style scoped lang="scss">
  .container {
    margin-top: 6px;
    padding: 10px;
  }

  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-block: 16px;
    font-weight: 600;
    border-bottom:1px solid #ccc ;
    background: white;
    color: #6c6b6bbe;

    .title {
      padding-left: 120px;
    }
    .sub-title {
      margin-right: 14px;
    }
  }

  .draggable-person {
    display: flex;
    justify-content: space-between;
    border-bottom:1px solid #ccc;
    padding-block: 20px;
    padding-left: 24px;
    background: white;
    color: rgba(27, 27, 182, 0.644);
    font-weight: 600;
    .person-box {
      display: flex;
      gap: 30px;
    }
    ion-icon {
      color: black;
    }
    .toggle {
      margin-inline: 40px;
    }
  }
</style>
