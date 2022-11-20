<template>
  <div class="operateField">
    <!-- 編集時(ファイル選択・保存) -->
    <div class="buttonBlock">
      <ButtonLine @clickEvent="onClickEvent" label="保存" />
      <uploadButton @onChangeEvent="onChangeEvent" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ButtonLine from '../atoms/ButtonLine.vue';
import ButtonSolid from '../atoms/ButtonSolid.vue';
import UploadButton from '../atoms/UploadButton.vue';

export default defineComponent({
  components: { ButtonLine, UploadButton, ButtonSolid },
  setup(props, { emit }) {
    const onClickEvent = (event) => {
      emit('onClickEvent', event);
    };
    const onChangeEvent = (event) => {
      emit('onChangeEvent', event);
      console.log('子:onChange');
    };

    return {
      onClickEvent,
      onChangeEvent,
    };
  },
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
