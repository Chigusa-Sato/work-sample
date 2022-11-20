<template>
  <!-- メインエリア -->
  <div class="mainArea">
    <!-- 画像がある場合 -->
    <div v-if="imageList.length > 0" class="cardList">
      <template v-for="(imageItem, imageIndex) in imageList" :key="imageIndex">
        <ImageCard :imageItem="imageItem" />
      </template>
    </div>
    <!-- 画像がない場合 -->
    <div v-if="imageList.length === 0">画像をアップロードしてください。</div>
  </div>

  <input
    type="file"
    multiple="multiple"
    accept="image/jpg, image/jpeg, image/png"
    required
    ref="inputFile"
    @change="uploadImageFile"
    class="fileUpload__input"
  />
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';
import ImageCard from '../components/organisms/ImageCard.vue';

export default defineComponent({
  components: { ImageCard },
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
    return { imageList, uploadImageFile };
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
