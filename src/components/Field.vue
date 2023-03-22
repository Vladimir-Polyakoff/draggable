
<script>
export default {
  name: 'TheField',
  props: {
    value: { type: String, required: false, default: '' },
    type: { type: String, required: false, default: 'text' },
    placeholder: { type: String, required: false },
    error: { type: String, required: false }
  },

  computed: {
    model: {
      get () { return this.value },

      set (value) { this.$emit('input', value) }
    }
  },

  methods: {
    fieldFocus () {
      this.$refs.Field.focus()
    }
  }
}
</script>

<template>
  <div class="field">
    <div class="error" v-if="error"> {{ error }}</div>

    <input
      ref="Field"
      :type="type"
      v-model="model"
      :placeholder="placeholder"
    >
  </div>
</template>

<style scoped>
  input {
    height: 20px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 4px;
  }
  .error {
      color: red;
      text-transform: lowercase;
      font-size: 12px;
    }
</style>
