<template>
  <div
    class="card"
    :class="imageIndex === referenceImageIndex ? 'selected' : 'unselected'"
  >
    <img :src="imageItem.url" alt="" />
    <ButtonSolid
      v-show="imageIndex !== referenceImageIndex"
      class="button__edit button__absolute"
      @clickEvent="editImage"
      label="編集"
    />
    <ButtonSolid
      v-show="imageIndex === referenceImageIndex"
      class="button__delete button__absolute"
      @clickEvent="deleteImage"
      label="削除"
    />
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

    const editImage = () => {
      emit('editImage');
    };
    const deleteImage = () => {
      emit('deleteImage');
    };
    return { editImage, deleteImage };
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
  width: 50px;
}
.button__delete {
  width: 50px;
  background: rgb(208, 0, 0);
  color: white;
  border: 2px solid rgb(208, 0, 0);
  opacity: 60%;
}
.button__delete:hover {
  background: white;
  border: 2px solid rgb(208, 0, 0);
  color: rgb(208, 0, 0);
}
.button__absolute {
  position: absolute;
  top: 10px;
  right: 10px;
}
.selected {
  border: 10px solid rgb(180, 180, 180);
}
</style>
