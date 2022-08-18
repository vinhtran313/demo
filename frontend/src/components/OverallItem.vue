<template>
  <router-link
    :to="{ name: to }"
    class="w-100 d-flex align-items-center justify-content-between background-white mb-5-px"
  >
    <div class="category-icon flex-shink-0">
      <slot name="icon" />
    </div>
    <div class="flex-1">
      <template v-if="hasContent">
        <div class="ml-20-px">
          <div class="fw-4">{{ title }}</div>
          <div class="ml-15-px fs-20 fw-7 text-picton-blue mt-10-px">
            {{ content }}
          </div>
        </div>
      </template>
      <template v-else>
        <slot name="content" />
      </template>
    </div>
    <div v-if="hasRightIcon" class="arrow-icon flex-shink-0">
      <span class="arrow-right-icon">
        <a-icon type="right" class="fs-20 text-picton-blue" />
      </span>
    </div>
  </router-link>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    to: {
      type: String,
      default: "",
    },
    hasRightIcon: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    hasContent() {
      return this.content && this.title;
    },
  },
});
</script>

<style lang="scss" scoped>
.category-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  ::v-deep svg {
    width: 60px;
    height: 60px;
  }
}
</style>
