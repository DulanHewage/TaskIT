<template>
  <button
    class="font-medium text-sm"
    :class="[typeColorClasses, borderRadiusClasses]"
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
    danger: {
      type: Boolean,
      default: false,
    },
    circle: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    typeColorClasses() {
      if (this.secondary) {
        return " text-slate-600 bg-slate-100 hover:bg-slate-200 focus:ring-slate-300";
      }
      if (this.danger) {
        return "text-white bg-red-700 hover:bg-red-800 focus:ring-red-300";
      }
      return "text-white bg-teal-700 hover:bg-teal-800 focus:ring-teal-300";
    },
    borderRadiusClasses() {
      if (this.circle) {
        return "rounded-full p-2";
      }
      return "rounded-lg px-5 py-2.5";
    },
  },
};
</script>
