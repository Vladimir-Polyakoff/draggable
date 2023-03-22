<script>
import Api from '@/service/api'
import Draggable from '@/views/Draggable'

export default {
  name: 'UserList',

  components: {
    Draggable
  },

  data () {
    return {
      list: [],
      selectedList: []
    }
  },
  created () {
    this.getList()
    // this.saveList([
    //   {
    //     id: 1,
    //     name: 'Alesha',
    //     surname: 'Palikyan',
    //     active: 1
    //   },
    //   {
    //     id: 2,
    //     name: 'Sasha',
    //     surname: 'Papunyan',
    //     active: 1
    //   },
    //   {
    //     id: 3,
    //     name: 'Volod',
    //     surname: 'Pojijyam',
    //     active: 1
    //   }
    // ])
  },

  methods: {
    getList () {
      const { status, data } = Api.get.list()
      status ? this.list = data : alert('ошибка при получение списка пользователей')
    },

    toggleActive ({ id, active }) {
      setTimeout(() => {
        const { status } = Api.patch.toggleStatus(id, active)
        if (status) {
          const edeited = this.list.find(user => user.id === id)
          edeited.active = active
        } else {
          alert('Ошибка при изменение статуса')
          this.$refs.Draggable.setStatus(id)
        }
      }, 2000)
    },

    deleteChecked () {
      setTimeout(() => {
        const idsList = this.selectedList.map(({ id }) => id)
        const { status } = Api.delete.deleteUsers(idsList)

        if (status) {
          this.list = this.list.filter(({ id }) => !idsList.includes(id))

          this.selectedList = []
        } else {
          alert(`Ошибка при удалении ${idsList.length > 1 ? 'пользователей' : 'пользователя'}`)
        }
      }, 2000)
    },

    showAlertDelete () {
      if (window.confirm('вы действительно хотите удалить')) {
        this.deleteChecked()
      } else {
        this.$refs.Draggable.unselect(this.selectedList)
      }
    },
    sortedList (sortedList) {
      this.list = sortedList
      const { status } = Api.patch.setOrder(sortedList)

      if (!status) {
        alert('Ошибка при изменении приоритетности')
        this.getList()
      }
    }
  }
}
</script>

<template>
  <div id="app">

    <div class="buttons">
      <button
        class="edit"
        :disabled="selectedList.length !== 1"
        @click="$router.push({ name: 'user-id', params: { id: selectedList[0].id } } )"
      >
        Редактировать
      </button>

      <button
        class="remove"
        :disabled="!selectedList.length"
        @click="showAlertDelete"
      >
        Удалить
      </button>

      <button class="add" @click="$router.push({ name: 'user-id', params: { id: 'create' } } )">Добавить</button>
    </div>

    <draggable
      ref="Draggable"
      :list="list"
      @toggleActive="toggleActive"
      @select="value => { selectedList = value }"
      @sort="sortedList"
    >
    </draggable>
  </div>
</template>

<style lang="scss">
body {
  background: #cccccc5b;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-inline: 40px 80px;
}
.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 40px ;
  margin-right: 10px;

  .edit {
    font-size: 16px;
    padding: 8px 16px;
    border-radius: 4px;
    font-weight: 600;
    background: white;
    border: 1px solid #ccc;
  }
  .remove {
    font-size: 16px;
    padding: 8px 16px;
    font-weight: 600;
    border-radius: 4px;
    background: rgba(255, 0, 0, 0.606);
    color: white;
    border: 1px solid #ccc;
  }
  .add {
    font-size: 16px;
    padding: 8px 16px;
    border-radius: 4px;
    font-weight: 600;
    background: rgba(31, 176, 31, 0.64);
    color: white;
    border: 1px solid #ccc;
  }
}
</style>
