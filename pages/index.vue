<template>
  <div class="px-2 sm:px-5 md:px-8 lg:px-0">
    <h1 class="text-center">TaskIT</h1>
    <div class="shadow-lg rounded-xl">
      <TheToDo />
    </div>
  </div>
</template>

<script>
import TheToDo from "~/components/TheToDo.vue";
export default {
  name: "IndexPage",
  components: {
    TheToDo,
  },
  data() {
    return {
      showModal: false,
      checked: true,
    };
  },
};
</script>
