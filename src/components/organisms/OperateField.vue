<template>
  <div class="operateField">
    <!-- 編集時(ファイル選択・保存) -->
    <div class="buttonBlock" v-show="referenceImageIndex === -1">
      <ButtonLine
        @clickEvent="onClickEvent"
        label="保存"
        v-show="hasImageList"
      />
      <uploadButton @onChangeEvent="onChangeEvent" />
    </div>
    <!-- 編集時(移動・削除) -->
    <div class="buttonBlock" v-show="referenceImageIndex >= 0">
      <div class="buttonBlock__item">
        <ButtonSolid
          @clickEvent="movingLeft"
          :disabled="referenceImageIndex === 0"
          label="左へ移動"
        />
        <ButtonSolid
          @clickEvent="movingRight"
          :disabled="referenceImageIndex >= numberOfImageList - 1"
          label="右へ移動"
        />
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
import { defineComponent, computed } from 'vue';
import ButtonLine from '../atoms/ButtonLine.vue';
import ButtonSolid from '../atoms/ButtonSolid.vue';
import UploadButton from '../atoms/UploadButton.vue';

export default defineComponent({
  components: { ButtonLine, UploadButton, ButtonSolid },
  props: {
    referenceImageIndex: {
      type: Number,
      required: true,
    },
    numberOfImageList: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const onClickEvent = (event) => {
      emit('onClickEvent', event);
    };
    const onChangeEvent = (event) => {
      emit('onChangeEvent', event);
    };
    const movingLeft = () => {
      emit('movingLeft');
    };
    const movingRight = () => {
      emit('movingRight');
    };
    const deleteImage = () => {
      emit('deleteImage');
    };
    const deselectImage = () => {
      emit('deselectImage');
    };

    //画像が登録済みか否かを返す(操作フィールドの表示判定用)
    const hasImageList = computed(() => {
      return props.numberOfImageList > 0;
    });

    return {
      onClickEvent,
      onChangeEvent,
      movingLeft,
      movingRight,
      deselectImage,
      deleteImage,
      hasImageList,
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
.buttonBlock {
  display: flex;
  gap: 15px;
  align-items: center;
}
.buttonBlock__item {
  display: flex;
  gap: 5px;
}
#buttonLine--normal {
  color: rgb(88, 88, 88);
  border: 2px solid rgb(88, 88, 88);
}
#buttonLine--normal:hover {
  background: rgb(88, 88, 88);
  color: #fff;
}
/* PCサイズ */
@media screen and (min-width: 376px) {
  .buttonBlock__item {
    align-items: center;
  }
}
/* スマホサイズ */
@media screen and (max-width: 375px) {
  .buttonBlock__item {
    flex-direction: column;
  }
}
</style>
