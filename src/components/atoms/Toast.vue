<template>
  <transition>
    <div class="toast">{{ label }}</div>
  </transition>
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
});
</script>

<style scoped>
.toast {
  position: fixed;
  bottom: 30px;
  right: 10px;
  color: #fff;
  border-radius: 4px;
  font-weight: bold;
  padding: 10px 20px;
}
</style>
