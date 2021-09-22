<template>
  <div
    :class="selected ? 'bg-white text-black' : 'text-white'"
    class="category-card"
  >
    <p>{{ category }}</p>
  </div>
</template>

<script>
export default {
  props: ["category", "selected"],
};
</script>
