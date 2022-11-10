<template>
  <div>
    <TopNavBar />
    <router-view></router-view>
  </div>
</template>

<script>
import TopNavBar from './components/organisms/TopNavBar.vue';
export default {
  name: 'App',
  components: { TopNavBar },
};
</script>
