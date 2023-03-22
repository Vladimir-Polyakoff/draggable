<script>
export default {
  name: 'TheToggle',
  props: {
    value: {
      type: [Boolean, Number],
      required: true,
      default: false
    }
  },
  data () {
    return {
      isChacked: Boolean(this.$props.value)
    }
  },
  // watch: {
  //   // v - this.$props.value из даты
  //   isChacked (v) {
  //     this.$emit('input', v)
  //   }
  // },
  methods: {
    toggle () {
      this.isChacked = !this.isChacked
    }
  }
}
</script>

<template>
  <div class="center">
    <input
      type="checkbox"
      v-model="isChacked"
      @change="$nextTick(() => $emit('change', isChacked))"
    >
  </div>
</template>

<style scoped lang="scss">
input[type="checkbox"] {
  position: relative;
  width: 30px;
  height: 10px;
  -webkit-appearance: none;
  background: linear-gradient(0deg, #333, #000);
  outline: none;
  border-radius: 20px;
  box-shadow: 0 0 0 4px #353535, 0 0 0 5px #3e3e3e, inset 0 0 10px rgba(0,0,0,1), 0 5px 20px rgba(27, 27, 182, 0.644), inset 0 0 15px rgba(27, 27, 182, 0.644);
}

input[type="checkbox"]::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 10px;
  background: linear-gradient(0deg, #000, #6b6b6b);
  border-radius:20px;
  box-shadow: 0 0 0 1px #232323;
  transform: scale(.96,.96);
  transition: .5s;
}

input[type="checkbox"]::after {
  content: '';
  position: absolute;
  top: calc(50% - 2px);
  left: 16px;
  width: 2px;
  height: 2px;
  background: linear-gradient(0deg,#6b6b6b, #000);
  border-radius: 50%;
  transition: .5s;
}

input:checked[type="checkbox"] {
  background: linear-gradient(0deg, #6dd1ff, #20b7ff);
  box-shadow:0 0 2px #6dd1ff ,0 0 0 4px rgba(27, 27, 182, 0.644), 0 0 0 5px #e9e6e6, inset 0 0 10px rgba(27, 27, 182, 0.644), 0 5px 20px rgba(218, 215, 215, 0.5), inset 0 0 15px rgba(27, 27, 182, 0.644);
}
input:checked[type="checkbox"]::before {
  left: 10px;
  background:rgba(27, 27, 182, 0.233);
}
input:checked[type="checkbox"]::after {
  background: #63cdff;
  left: 26.2px;
  box-shadow: 0 0 5px #13b3ff, 0 0 15px #13b3ff;
}
</style>
