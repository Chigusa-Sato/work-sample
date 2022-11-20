<template>
  <div
    class="card"
    :class="imageIndex === referenceImageIndex ? 'selected' : 'unselected'"
  >
    <img :src="imageItem.url" alt="" />
    <ButtonSolid class="button__edit" @clickEvent="onClickEvent" label="編集" />
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import ButtonSolid from '../atoms/ButtonSolid.vue';

export default defineComponent({
  components: { ButtonSolid },
  props: {
    imageItem: {
      type: Object,
      required: true,
    },
    imageIndex: {
      type: Number,
      required: true,
    },
    referenceImageIndex: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    props = reactive(props);

    const onClickEvent = () => {
      emit('clickEvent');
    };
    return { onClickEvent };
  },
});
</script>

<style scoped>
.card {
  width: 250px;
  height: 250px;
  border: 1px solid #a0a0a0;
  padding: 5px;
  flex-shrink: 0;
  position: relative;
}
.card img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.button__edit {
  position: absolute;
  top: 10px;
  right: 10px;
  /* MEMO:ここでcssの上書はＮＧかもしれないので確認 */
  width: 50px;
  background: black;
  color: white;
  border: 2px solid black;
  opacity: 60%;
}

.button__edit:hover {
  background: white;
  border: 2px solid black;
  color: black;
}
.selected {
  border: 4px solid rgb(180, 180, 180);
}
</style>
