<template>
  <div class="operateField">
    <!-- 編集時(ファイル選択・保存) -->
    <div class="buttonBlock" v-show="referenceImageIndex === -1">
      <uploadButton @onChangeEvent="onChangeEvent" />
      <ButtonSolid
        @clickEvent="onClickEvent"
        label="保存"
        v-show="hasImageList"
        class="button__medium"
      />
    </div>
    <!-- 編集時(移動・削除) -->
    <div class="buttonBlock" v-show="referenceImageIndex >= 0">
      <div class="buttonBlock__item">
        <ButtonLine
          @clickEvent="movingLeft"
          :disabled="referenceImageIndex === 0"
          :label="buttonTextBack"
          id="buttonLine--normal"
          class="button__small"
        />
        <ButtonLine
          @clickEvent="movingRight"
          :disabled="referenceImageIndex >= numberOfImageList - 1"
          :label="buttonTextFoward"
          id="buttonLine--normal"
          class="button__small"
        />
      </div>
      <div class="buttonBlock__item">
        <button-solid
          @clickEvent="deselectImage"
          label="完了"
          class="button__medium"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue';
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

    // resizeでウィンドウサイズ変更を検知
    onMounted(() => {
      window.addEventListener('resize', calculateWindowWidth);
    });
    //移動ボタンに表示するテキスト
    let buttonTextBack = ref('←左へ');
    let buttonTextFoward = ref('右へ→');
    // 画面幅(px)
    const windowWidth = ref(0);
    //509px以下の場合は「上下」へ移動
    const calculateWindowWidth = () => {
      windowWidth.value = window.innerWidth;
      if (windowWidth.value < 509) {
        buttonTextBack.value = '↑上へ';
        buttonTextFoward.value = '↓下へ';
      } else {
        buttonTextBack.value = '←左へ';
        buttonTextFoward.value = '右へ→';
      }
    };

    return {
      onClickEvent,
      onChangeEvent,
      movingLeft,
      movingRight,
      deselectImage,
      deleteImage,
      hasImageList,
      buttonTextBack,
      buttonTextFoward,
    };
  },
});
</script>

<style scoped>
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
.button__small {
  width: 100px;
}
.button__medium {
  width: 150px;
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
