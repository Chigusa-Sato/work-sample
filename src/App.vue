<template>
  <div>
    <router-view></router-view>
    <OperateField />
  </div>
</template>

<script>
import OperateField from './components/organisms/OperateField.vue';
export default {
  name: 'App',
  components: { OperateField },
};
</script>
