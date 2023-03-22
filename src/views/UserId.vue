<script>
import Field from '@/components/Field'
import Api from '@/service/api'

const AdditionalField = { value: '', error: '' }

export default {
  name: 'UserId',

  components: {
    Field
  },

  data () {
    return {
      name: '',
      surname: '',
      nameError: '',
      surnameError: '',
      additionalsList: []
    }
  },

  computed: {
    id () {
      return this.$router.currentRoute.params.id
    },
    editMode () {
      return this.id !== 'create'
    },
    disabledPlus () {
      for (const { value } of this.additionalsList) {
        if (!value) { return true }
      }

      return false
    }
  },

  mounted () {
    if (this.editMode) {
      this.setUser(this.id)
    }
  },

  methods: {
    addUser () {
      if (!this.validUser()) { return false }

      const { status, error } = Api.post.user({
        id: new Date(),
        name: this.name,
        surname: this.surname,
        active: 0
      })

      if (status) {
        this.$router.push('/')
      } else {
        alert(error)
      }
    },

    setUser (id) {
      const { status, error, data: { name, surname, additionalsList } } = Api.get.user(id)

      if (status) {
        this.name = name
        this.surname = surname
        if (additionalsList) {
          additionalsList.forEach((value, index) => {
            this.$set(this.additionalsList, index, { value, error: '' })
          })
        }
      } else {
        alert(error)
      }
    },

    editUser () {
      if (!this.validUser()) { return false }

      if (this.isEqualUsers(Api.get.user(this.id))) {
        alert('Данные не изменились')

        return
      }

      const { status, error } = Api.patch.user({
        id: this.id,
        name: this.name,
        surname: this.surname,
        additionalsList: this.additionalsList.map(({ value }) => value)
      })

      if (status) {
        this.$router.push('/')
      } else {
        alert(error)
      }
    },

    validUser () {
      let isValid = true

      if (!this.name) {
        this.nameError = 'заполните поле'
        isValid = false
      }

      if (!this.surname) {
        this.surnameError = 'заполните фамилию'
        isValid = false
      }

      this.additionalsList.forEach(additional => {
        if (!additional.value) {
          additional.error = 'Заполните поле'
          isValid = false
        }
      })

      return isValid
    },

    isEqualUsers ({ data: { name, surname, additionalsList } }) {
      if ((!this.additionalsList && additionalsList) || (this.additionalsList && !additionalsList) || this.surname !== surname || this.name !== name || this.additionalsList.length !== additionalsList.length) {
        return false
      }

      for (const [index, additional] of additionalsList.entries()) {
        if (this.additionalsList[index].value !== additional) {
          return false
        }
      }

      return true
    },

    addAdditional () {
      this.$set(this.additionalsList, this.additionalsList.length, JSON.parse(JSON.stringify(AdditionalField)))
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="user-id">user {{ id }}</div>

    <button class="remove" @click="$router.push('/')">Отмена</button>

    <button
      :class="editMode ? 'edit' : 'add'"
      @click="editMode ? editUser() : addUser()">
      {{ editMode ? 'Редактировать' : 'Добавить' }}
    </button>

    <field
      placeholder="Введите имя"
      :value="name"
      :error="nameError"
      @input="value => {   name = value, nameError = '' }"
    >
    </field>

    <field
      placeholder="Введите фамилию"
      :value="surname"
      :error="surnameError"
      @input="value => { surname = value, surnameError = '' }"
    >
    </field>

    <div
      class="additional"
      v-for="(additional, index) in additionalsList"
      :key="index"
    >
      <field
        placeholder="Дополнительное поле"
        :value="additional.value"
        :error="additional.error"
        @input="value => { additionalsList[index].value = value, additionalsList[index].error = '' }"
      >
      </field>
      <div class="delete" @click="additionalsList.splice(index, 1)">+</div>
    </div>

    <button
      :disabled="disabledPlus"
      class="plus"
      @click="addAdditional"
    >+
    </button>
  </div>
</template>

<style scoped lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    * {
      margin-bottom: 8px;
    }

    .user-id {
      font-family: Roboto, Arial, sans-serif;
      font-size: 120px;
      background-color: #432aa5;
      background-image: linear-gradient(90deg, #501db5, #19de19);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 40px;
    }

    button {
        width: 160px;
        font-size: 16px;
        padding: 8px 16px;
        border-radius: 4px;
        font-weight: 600;
        border: 1px solid #ccc;
        color: white;
    }
    .add {
      background: rgba(31, 176, 31, 0.64);
    }
    .edit {
      background: rgba(34, 50, 175, 0.64);
    }
    .remove {
      background: rgba(255, 0, 0, 0.606);
    }
    .plus {
      background: rgba(0, 98, 255, 0.294);
    }
    .additional {
      display: flex;
      margin: 0;
    }
    .delete {
      transform: rotate(45deg);
      cursor: pointer;
      margin: 8px -10px 0 0;
    }
  }
</style>
