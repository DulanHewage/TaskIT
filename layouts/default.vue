<template>
  <div>
    <TheHeader />
    <div
      class="flex-auto max-w-4xl min-w-0 pt-6 lg:px-8 lg:pt-8 pb:12 xl:pb-24 lg:pb-16 m-auto"
    >
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
  mounted() {
    this.$store.dispatch("initTasks");
  },
};
</script>
