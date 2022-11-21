<template>
  <button @click="onClickEvent" class="button_solid">{{ label }}</button>
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
.button_solid {
  padding: 5px;
  color: #fff;
  font-weight: bold;
  border: 2px solid rgb(62, 136, 255);
  background: rgb(62, 136, 255);
  border-radius: 4px;
  text-align: center;
}
.button_solid:hover {
  color: rgb(62, 136, 255);
  border: 2px solid rgb(62, 136, 255);
  background: #fff;
}
</style>
