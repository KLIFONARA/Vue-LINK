<template>
  <a @click="linkClicked(link.link.id)" :href="link.link.link">
    <div class="link-card">
      <p class="raleway text-center">{{ link.link.name }}</p>
    </div>
  </a>
</template>

<script>
import axios from "axios";

export default {
  props: ["link"],
  setup() {
    const linkClicked = (id) => {
      const config = {
        headers: {
          Authorization: `Bearer ${process.env.VUE_APP_KLIFONARA_AUTHENTICATION_TOKEN}`,
        },
      };

      axios.patch(
        `${process.env.VUE_APP_KLIFONARA_API_URL}/link-tree/${id}`,
        {},
        config
      );
    };

    return { linkClicked };
  },
};
</script>
