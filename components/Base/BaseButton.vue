<template>
  <button
    class="font-medium rounded-lg text-sm px-5 py-2.5 mr-1"
    :class="typeColorClasses"
    v-bind="$attrs"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    secondary: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    typeColorClasses() {
      if (this.secondary) {
        return " text-slate-600 bg-slate-100 hover:bg-slate-200 focus:ring-slate-300";
      }
      return "text-white bg-teal-700 hover:bg-teal-800 focus:ring-teal-300";
    },
  },
};
</script>
