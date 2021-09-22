<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import LinkTree from "./components/LinkTree.vue";

export default {
  components: {
    LinkTree,
  },
};
</script>
