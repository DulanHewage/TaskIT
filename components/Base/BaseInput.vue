<template>
  <div class="base-input">
    <label
      v-if="label"
      :for="id"
      class="block mb-2 text-sm font-medium text-slate-900"
      :class="[error ? 'text-red-500' : 'text-slate-900']"
      >{{ label }}</label
    >
    <input
      :id="id"
      :value="value"
      :type="type"
      class="outline-none border text-slate-900 text-sm rounded-lg block w-full p-2.5"
      :class="inputlasses"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    id: {
      type: String,
      required: true,
      default: "input" + Math.floor(Math.random() * 100000),
    },
    label: {
      type: String,
      required: false,
      default: undefined,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    error: {
      type: Boolean,
      default: false,
    },
    value: undefined,
  },
  computed: {
    inputlasses() {
      const baseClasses = this.error
        ? [
            "bg-red-200",
            "placeholder:text-red-500",
            "border-red-500",
            "focus:border-red-500",
          ]
        : ["bg-slate-50", "border-slate-300", "focus:border-slate-200"];

      return baseClasses.join(" ");
    },
  },
};
</script>
