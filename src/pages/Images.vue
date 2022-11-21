<template>
  <!-- メインエリア -->
  <div class="mainArea">
    <!-- 画像がある場合 -->
    <div v-if="imageList.length > 0" class="mainArea__contentainer cardList">
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
    <!-- 画像がない場合 -->
    <div class="mainArea__contentainer title" v-if="imageList.length === 0">
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
  <div
    class="toast success"
    :id="isShow && isSucceeded ? 'active' : 'inactive'"
  >
    保存しました
  </div>
  <!-- トースト(保存失敗) -->
  <div class="toast failure" :id="isShow && isFailure ? 'active' : 'inactive'">
    保存に失敗しました
  </div>
  <!-- トースト(画像サイズ超過) -->
  <div
    class="toast failure"
    :id="isShow && hasExceededFileSize ? 'active' : 'inactive'"
  >
    ※画像サイズは5MB以下にしてください
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';
import OperateField from '../components/organisms/OperateField.vue';
import ImageCard from '../components/organisms/ImageCard.vue';
import axios from 'axios';

export default defineComponent({
  components: { OperateField, ImageCard },
  setup() {
    const imageList = reactive([]);

    //IDを生成(画像に紐づける)
    const getUniqueId = () => {
      return (
        new Date().getTime().toString() +
        Math.floor(Math.random() * 10).toString()
      );
    };

    //画像のアップロード-------------------
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

      //imageListに格納
      selectedFiles.forEach((file) => {
        const reader = new FileReader();
        //Base64に変換
        reader.readAsDataURL(file);
        //プレビュー用のURLを作成する
        reader.onload = (e) => {
          const imageUrl = e.target.result;
          imageList.push({ url: imageUrl, id: getUniqueId() });
        };
      });
    };

    //画像をDBに保存する---------------------------
    const storeImageList = () => {
      axios
        .post(`https://httpbin.org/post?imageList=${imageList}`)
        // .post(`https://httpbin.org/status/404`)
        .then((response) => {
          console.log('res', response);
          //トースト表示(保存成功)用のフラグを設定
          isSucceeded.value = true;
          isFailure.value = false;
        })
        .catch(() => {
          //トースト表示(保存失敗)用のフラグを設定
          isSucceeded.value = false;
          isFailure.value = true;
          console.log('保存に失敗しました');
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
    //画像の選択を解除する
    const deselectImage = () => {
      referenceImageIndex.value = -1;
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
.mainArea__contentainer {
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
/* トースト */
.toast {
  position: fixed;
  bottom: 10px;
  right: 10px;
  color: #fff;
  border-radius: 4px;
  font-weight: bold;
  padding: 10px 20px;
}
.success {
  background: rgb(0, 149, 255);
}
.failure {
  background: rgb(242, 85, 85);
}
#active {
  display: block;
  transition: 0.5s;
}
#inactive {
  display: none;
  transition: 0.5s;
}
</style>
