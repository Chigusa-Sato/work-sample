<template>
  <button @click="onClickEvent" class="button_line">{{ label }}</button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const onClickEvent = (event) => {
      emit('clickEvent', event);
    };
    return { onClickEvent };
  },
});
</script>

<style scoped>
.button_line {
  width: 150px;
  padding: 5px;
  color: rgb(226, 83, 83);
  border: 2px solid rgb(226, 83, 83);
  background: #fff;
  border-radius: 4px;
  text-align: center;
  font-weight: bold;
}

.button_line:hover {
  background: rgb(226, 83, 83);
  color: #fff;
  font-weight: bold;
}
</style>
