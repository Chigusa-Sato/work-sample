<template>
  <div class="operateField">
    <!-- 編集時(ファイル選択・保存) -->
    <div class="buttonBlock">
      <ButtonLine @clickEvent="onClickEvent" label="保存" />
      <uploadButton @onChangeEvent="onChangeEvent" />
    </div>
    <!-- 編集時(移動・削除) -->
    <div class="buttonBlock" v-show="referenceImageIndex >= 0">
      <div class="buttonBlock__item">
        <!-- <ButtonSolid
          @clickEvent="movingLeft"
          :disabled="referenceImageIndex === 0"
          :label="buttonTextBack"
        />
        <ButtonSolid
          @clickEvent="movingRight"
          :disabled="referenceImageIndex >= numberOfImageList - 1"
          :label="buttonTextFoward"
        /> -->
      </div>
      <div class="buttonBlock__item">
        <ButtonLine
          @clickEvent="deselectImage"
          label="完了"
          id="buttonLine--normal"
        />
        <ButtonLine @clickEvent="deleteImage" label="削除" />
      </div>
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
    };
    const deleteImage = () => {
      emit('deleteImage');
    };
    const deselectImage = () => {
      emit('deselectImage');
    };

    //画像が登録済みか否かを返す(操作フィールドの表示判定用)
    // const hasImageList = computed(() => {
    //   return props.numberOfImageList > 0;
    // });

    return {
      onClickEvent,
      onChangeEvent,
      movingLeft,
      movingRight,
      deselectImage,
      deleteImage,
      buttonTextBack,
      buttonTextFoward,
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
