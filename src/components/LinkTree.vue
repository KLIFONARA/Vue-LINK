<template>
  <div class="flex flex-col items-center py-12">
    <img class="w-32 h-32 mb-5" src="@/assets/klifonara-logo.png" alt="" />
    <div class="flex sm:justify-center w-4/5 space-x-2 overflow-x-auto mb-4">
      <category
        @click="selectCategory('All')"
        category="All"
        :selected="selectedCategory === 'All'"
      />
      <div v-for="category in categories" :key="category">
        <category
          @click="selectCategory(category)"
          :category="category"
          :selected="selectedCategory === category"
        />
      </div>
    </div>
    <div class="flex flex-col items-center w-full" v-if="isEmpty(links)">
      <div class="w-4/5 sm:w-3/4" v-for="index in 5" :key="index">
        <div class="link-card-placeholder">
          <div class="animate-pulse bg-gray-400 h-5 col-span-4"></div>
          <div class="animate-pulse bg-gray-400 h-5 col-span-2"></div>
          <div class="animate-pulse bg-gray-400 h-5 col-span-1"></div>
          <div class="animate-pulse bg-gray-400 h-5 col-span-3"></div>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center w-full" v-else>
      <div class="w-4/5 sm:w-3/4" v-for="link in filteredLinks" :key="link.id">
        <Link :link="link" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { computed, onMounted, ref } from "@vue/runtime-core";
import Link from "./Link.vue";
import Category from "./Category.vue";
import { isEmpty } from "lodash";

export default {
  components: {
    Link,
    Category,
  },
  methods: {
    isEmpty(data) {
      return isEmpty(data);
    },
  },
  setup() {
    onMounted(async () => {
      await fetchLinks();
    });

    const links = ref([]);
    const categories = ref([]);
    const selectedCategory = ref("All");

    const selectCategory = (category) => {
      selectedCategory.value = category;
    };

    const fetchLinks = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${process.env.VUE_APP_KLIFONARA_AUTHENTICATION_TOKEN}`,
        },
      };

      const fetchedData = await axios.get(
        `${process.env.VUE_APP_KLIFONARA_API_URL}/link-tree`,
        config
      );
      links.value = fetchedData.data.data;
      categories.value = await getCategoriesFromLinks(links.value);
    };

    const getCategoriesFromLinks = (links) => {
      const categories = [];
      links.forEach((link) => {
        if (!categories.includes(link.link.category.name)) {
          categories.push(link.link.category.name);
        }
      });
      return categories;
    };

    const filteredLinks = computed(() => {
      if (selectedCategory.value === "All") return links.value;
      else {
        return links.value.filter((link) => {
          return link.link.category.name === selectedCategory.value;
        });
      }
    });

    return {
      links,
      filteredLinks,
      categories,
      selectedCategory,
      selectCategory,
    };
  },
};
</script>
