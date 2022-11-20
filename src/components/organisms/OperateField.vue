<template>
  <div class="operateField">
    <ButtonLine label="ButtonLine" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ButtonLine from '../atoms/ButtonLine.vue';

export default defineComponent({
  components: { ButtonLine },
});
</script>

<style>
.operateField {
  background: rgb(180, 180, 180);
  width: 100%;
  height: 100px;
  position: fixed;
  bottom: 0px;
  display: flex;
  justify-content: center;
}
</style>
