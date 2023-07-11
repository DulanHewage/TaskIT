<template>
  <div
    class="h-5 w-5 inline-flex justify-center items-center hover:ring-1 ring-teal-600 ring-opacity-50 rounded-full"
    :class="disabled ? 'opacity-50 cursor-not-allowed' : ''"
  >
    <input
      v-model="checked"
      type="checkbox"
      class="h-5 w-5 opacity-0 z-10 cursor-pointer"
      :disabled="disabled"
      @change="onChange"
    />
    <svg-icon
      type="mdi"
      :path="checked ? checkIconPath : circleIconPath"
      class="absolute text-teal-600"
    ></svg-icon>
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCheckCircleOutline, mdiCircleOutline } from "@mdi/js";

export default {
  name: "BaseCheckbox",
  components: {
    SvgIcon,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      checked: this.value,
      checkIconPath: mdiCheckCircleOutline,
      circleIconPath: mdiCircleOutline,
    };
  },
  methods: {
    onChange() {
      this.$emit("input", this.checked);
    },
  },
};
</script>
