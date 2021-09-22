<template>
  <p class="text-white">Redirecting...</p>
</template>

<script>
import axios from "axios";
import { onMounted } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    const fetchLink = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${process.env.VUE_APP_KLIFONARA_AUTHENTICATION_TOKEN}`,
        },
      };

      try {
        const link = await axios.get(
          `${process.env.VUE_APP_KLIFONARA_API_URL}/link/${route.params.slug}`,
          config
        );
        return link;
      } catch (error) {
        router.push("/404");
      }
    };

    onMounted(async () => {
      const link = await fetchLink();
      window.location.href = link.data.data.link;
    });
  },
};
</script>

<style>
</style>