<template>
  <div class="card_list">
    <div class="card_item">
      <img
        class="card_item_img"
        src="../assets/anita-austvika-W2M7vaZSl0w-unsplash.jpg"
        alt=""
      />
    </div>
    <div class="card_item">
      <img
        class="card_item_img"
        src="../assets/anita-austvika-W2M7vaZSl0w-unsplash.jpg"
        alt=""
      />
    </div>
    <div class="card_item">
      <img
        class="card_item_img"
        src="../assets/anita-austvika-W2M7vaZSl0w-unsplash.jpg"
        alt=""
      />
    </div>
    <div class="card_item">
      <img
        class="card_item_img"
        src="../assets/anita-austvika-W2M7vaZSl0w-unsplash.jpg"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';

const getUniqueStr = (myStrong) => {
  let strong = 1000;
  if (myStrong) strong = myStrong;
  return (
    new Date().getTime().toString(16) +
    Math.floor(strong * Math.random()).toString(16)
  );
};

export default defineComponent({
  setup() {
    const imageList = reactive(new Array());
    const imageItem = { id: getUniqueStr(), img: 'hahahah' };

    return { imageItem };
  },
});
</script>

<style>
.card_list {
  display: flex;
  justify-content: space-around;
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
</style>
