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
  padding: 5px;
  color: rgb(88, 88, 88);
  border: 2px solid rgb(88, 88, 88);
  background: #fff;
  border-radius: 4px;
  text-align: center;
  font-weight: bold;
}

.button_line:hover {
  background: rgb(88, 88, 88);
  color: #fff;
  font-weight: bold;
}
</style>
