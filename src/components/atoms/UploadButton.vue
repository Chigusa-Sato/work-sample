<template>
  <div class="fileUpload__area">
    <ButtonLine
      label="画像アップロード"
      @clickEvent="selectFile"
      class="fileUpload__button"
      id="buttonLine--normal"
    />
    <input
      type="file"
      multiple="multiple"
      accept="image/jpg, image/jpeg, image/png"
      required
      ref="inputFile"
      @change="onChangeEvent"
      class="fileUpload__input"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ButtonLine from '../atoms/ButtonLine.vue';
export default defineComponent({
  components: { ButtonLine },
  setup(props, { emit }) {
    const inputFile = ref();
    //「ファイルを選択」ボタンを押下すると非表示中の
    //input=fileが発火する
    const selectFile = () => {
      inputFile.value.click();
    };
    const onChangeEvent = (event) => {
      console.log('孫');
      emit('onChangeEvent', event);
    };
    return { inputFile, selectFile, onChangeEvent };
  },
});
</script>

<style scoped>
.fileUpload__input {
  display: none;
}
.fileUpload__button {
  cursor: default;
  background: #90c9ff;
  border-radius: 2px;
  color: #555;
  padding: 10px 12px;
}
#buttonLine--normal {
  color: rgb(88, 88, 88);
  border: 2px solid rgb(88, 88, 88);
}
#buttonLine--normal:hover {
  background: rgb(88, 88, 88);
  color: #fff;
}
</style>
