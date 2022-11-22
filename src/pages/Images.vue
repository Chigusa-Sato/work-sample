<template>
  <!-- メインエリア -->
  <div class="mainArea">
    <!-- 画像が登録済みの場合 -->
    <div v-if="imageList.length > 0" class="mainArea__container cardList">
      <template
        v-for="(imageItem, imageIndex) in imageList"
        :key="imageItem.id"
      >
        <ImageCard
          :imageItem="imageItem"
          :imageIndex="imageIndex"
          :referenceImageIndex="referenceImageIndex"
          @editImage="editImage(imageIndex)"
          @deleteImage="deleteImage(imageIndex)"
        />
      </template>
    </div>
    <!-- 画像が未登録の場合 -->
    <div class="mainArea__container title" v-if="imageList.length === 0">
      <p>※画像をアップロードしてください。</p>
    </div>
    <!-- 操作フィールド -->
    <OperateField
      @onChangeEvent="uploadImageFile"
      @onClickEvent="storeImageList"
      @deleteImage="deleteImage"
      @deselectImage="deselectImage"
      @movingLeft="movingLeft"
      @movingRight="movingRight"
      :numberOfImageList="imageList.length"
      :referenceImageIndex="referenceImageIndex"
    />
  </div>
  <!-- トースト(保存成功) -->
  <Toast v-show="isShow && isSucceeded" class="success" label="保存しました" />
  <!-- トースト(保存失敗) -->
  <Toast
    v-show="isShow && isFailure"
    class="failure"
    label="保存に失敗しました"
  />
  <!-- トースト(画像サイズ超過) -->
  <Toast
    v-show="isShow && hasExceededFileSize"
    class="failure"
    label="※画像サイズは5MB以下にしてください"
  />
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';
import OperateField from '../components/organisms/OperateField.vue';
import ImageCard from '../components/organisms/ImageCard.vue';
import Toast from '../components/atoms/Toast.vue';
import axios from 'axios';

export default defineComponent({
  components: { OperateField, ImageCard, Toast },
  setup() {
    const imageList = reactive([]);

    //画像のアップロード
    let hasExceededFileSize = ref(false);
    const uploadImageFile = (event) => {
      const selectedFiles = Array.from(
        event.target.files || event.dataTransfer.files
      );
      //ファイルの選択をキャンセルしたら処理中断
      const hasFile = selectedFiles.length > 0;
      if (!hasFile) {
        return;
      }
      //ファイルサイズが5MG以上の場合はアップロード中断
      const FIlE_SIZE_LIMIT_BYTE = 1024 * 1024 * 5; //上限5MB
      hasExceededFileSize.value = selectedFiles.some(
        (file) => file.size > FIlE_SIZE_LIMIT_BYTE
      );
      if (hasExceededFileSize.value) {
        showToast();
        return;
      }
      selectedFiles.forEach((file) => {
        const READER = new FileReader();
        //Base64に変換
        READER.readAsDataURL(file);
        //プレビュー用のURLを作成する
        READER.onload = (e) => {
          const imageUrl = e.target.result;
          imageList.push({ url: imageUrl, id: getUniqueId() });
        };
      });
    };
    //画像に紐づけるIDを生成
    const getUniqueId = () => {
      return (
        new Date().getTime().toString() +
        Math.floor(Math.random() * 10).toString()
      );
    };

    //画像をDBへ保存する
    const storeImageList = () => {
      //サイズ上限のトースト判定を非表示にする
      hasExceededFileSize.value = false;
      axios
        .post(`https://httpbin.org/post?imageList=${imageList}`)
        .then((response) => {
          //トースト表示(保存成功)用のフラグを設定
          isSucceeded.value = true;
          isFailure.value = false;
        })
        .catch((error) => {
          //トースト表示(保存失敗)用のフラグを設定
          isSucceeded.value = false;
          isFailure.value = true;
          console.log('保存に失敗しました', error);
        });
      showToast();
    };

    //トーストを表示し3秒後に非表示に戻す
    let isShow = ref(false);
    let isSucceeded = ref(false);
    let isFailure = ref(false);

    const showToast = () => {
      isShow.value = true;
      setTimeout(() => {
        hideToast();
      }, 2000);
    };
    const hideToast = () => {
      isShow.value = false;
    };

    //画像を削除する
    const deleteImage = () => {
      if (window.confirm('画像を削除してもよろしいですか?')) {
        imageList.splice(referenceImageIndex.value, 1);
        referenceImageIndex.value = -1;
      }
    };

    //操作フィールドを「移動・削除ボタン」に切り替える
    let referenceImageIndex = ref(-1);
    const editImage = (imageIndex) => {
      //既に編集ボタンを選択済みの場合は選択を解除
      if (imageIndex === referenceImageIndex.value) {
        referenceImageIndex.value = -1;
        return;
      }
      referenceImageIndex.value = imageIndex;
    };

    //右移動
    const movingLeft = () => {
      const imageIndex = referenceImageIndex.value;
      const targetImage = imageList[imageIndex];
      imageList.splice(imageIndex, 1);
      imageList.splice(imageIndex - 1, 0, targetImage);
      referenceImageIndex.value = imageIndex - 1;
    };

    //左移動
    const movingRight = () => {
      const imageIndex = referenceImageIndex.value;
      const targetImage = imageList[imageIndex];
      imageList.splice(imageIndex, 1);
      imageList.splice(imageIndex + 1, 0, targetImage);
      referenceImageIndex.value = imageIndex + 1;
    };

    //画像の選択を解除する
    const deselectImage = () => {
      referenceImageIndex.value = -1;
    };

    return {
      imageList,
      referenceImageIndex,
      isShow,
      isSucceeded,
      isFailure,
      hasExceededFileSize,
      uploadImageFile,
      storeImageList,
      deleteImage,
      editImage,
      deselectImage,
      movingLeft,
      movingRight,
    };
  },
});
</script>

<style scoped>
.mainArea {
  width: 100%;
  height: 100vh;
  padding: 10px 0px;
}
.mainArea__container {
  height: 100%;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
}
.title p {
  font-weight: bold;
  color: rgb(88, 88, 88);
}
.cardList {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 10px;
}
/* トースト */
.success {
  background: rgb(0, 149, 255);
}
.failure {
  background: rgb(242, 85, 85);
}
/* トーストのアニメーション */
.v-enter-active,
.v-leave-active {
  transition: transform 100ms cubic-bezier(0, 0, 0.9, 1) 0ms;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(150px);
}

/* スマホサイズ */
@media screen and (max-width: 375px) {
  .toast {
    bottom: 90px;
  }
}
</style>
