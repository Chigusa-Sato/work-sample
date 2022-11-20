<template>
  <!-- メインエリア -->
  <div class="mainArea">
    <!-- 画像がある場合 -->
    <div v-if="imageList.length > 0" class="cardList">
      <template v-for="(imageItem, imageIndex) in imageList" :key="imageIndex">
        <ImageCard
          :imageItem="imageItem"
          :imageIndex="imageIndex"
          :referenceImageIndex="referenceImageIndex"
          @clickEvent="editImage(imageIndex)"
        />
      </template>
    </div>
    <!-- 画像がない場合 -->
    <div v-if="imageList.length === 0">画像をアップロードしてください。</div>
    <!-- 操作フィールド -->
    <OperateField
      @onChangeEvent="uploadImageFile"
      @deleteImage="deleteImage"
      @movingLeft="movingLeft"
      @movingRight="movingRight"
      :numberOfImageList="imageList.length"
      :referenceImageIndex="referenceImageIndex"
    />
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';
import OperateField from '../components/organisms/OperateField.vue';
import ImageCard from '../components/organisms/ImageCard.vue';

export default defineComponent({
  components: { OperateField, ImageCard },
  setup() {
    const imageList = reactive([]);

    const uploadImageFile = (event) => {
      const selectedFiles = Array.from(
        event.target.files || event.dataTransfer.files
      );

      //ファイルの選択をキャンセルしたら処理を中断する
      const hasFile = selectedFiles.length > 0;
      if (!hasFile) {
        return;
      }

      selectedFiles.forEach((file, index) => {
        const reader = new FileReader();
        //Base64に変換
        reader.readAsDataURL(file);
        //プレビュー用のURLを作成する
        reader.onload = (e) => {
          const imageUrl = e.target.result;
          imageList.push({ url: imageUrl });
        };
      });
    };

    // const isCollectSizeImage = () => {
    //   //TODO:サイズが大きい画像ファイルをはじく
    // };

    //画像編集時の操作フィールド(移動・削除ボタン)に切り替える
    const referenceImageIndex = ref(-1); //編集対象の画像のインデックス
    const editImage = (imageIndex) => {
      //既に編集ボタンを選択済みの場合は選択を解除する
      if (imageIndex === referenceImageIndex.value) {
        referenceImageIndex.value = -1;
        return;
      }
      referenceImageIndex.value = imageIndex;
    };
    //右に移動する
    const movingLeft = () => {
      const imageIndex = referenceImageIndex.value;
      const targetImage = imageList[imageIndex];
      imageList.splice(imageIndex, 1);
      imageList.splice(imageIndex - 1, 0, targetImage);
      referenceImageIndex.value = imageIndex - 1;
    };

    //左に移動する
    const movingRight = () => {
      const imageIndex = referenceImageIndex.value;
      const targetImage = imageList[imageIndex];
      imageList.splice(imageIndex, 1);
      imageList.splice(imageIndex + 1, 0, targetImage);
      referenceImageIndex.value = imageIndex + 1;
    };
    //削除する
    const deleteImage = () => {
      if (window.confirm('画像を削除してもよろしいですか?')) {
        imageList.splice(referenceImageIndex.value, 1);
        referenceImageIndex.value = -1;
      }
    };

    return {
      imageList,
      referenceImageIndex,
      uploadImageFile,
      deleteImage,
      editImage,
      movingLeft,
      movingRight,
    };
  },
});
</script>

<style>
.mainArea {
  padding: 10px 0px;
}
.cardList {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 10px;
}
.card_item {
  width: 250px;
  height: 250px;
  border: 1px solid #a0a0a0;
  display: flex;
  align-items: center;
}
.card_item_img {
  width: 100%;
}

.button_line {
  width: 150px;
  padding: 5px;
  color: rgb(226, 83, 83);
  border: 2px solid rgb(251, 124, 124);
  background: #fff;
  border-radius: 4px;
  text-align: center;
}
.button_solid {
  width: 150px;
  padding: 5px;
  color: #fff;
  font-weight: bold;
  border: 2px solid rgb(62, 136, 255);
  background: rgb(62, 136, 255);
  border-radius: 4px;
  text-align: center;
}
</style>
