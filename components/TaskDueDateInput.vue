<template>
  <div>
    <div class="flex items-center">
      <input
        v-model="dueDate"
        type="date"
        class="text-sm text-teal-600 disabled:text-slate-500"
        :disabled="disabled"
        @change="setDueDate"
      />
    </div>

    <div
      class="text-xs text-orange-600 italic font-light mt-1"
      :class="{ 'opacity-0': !showDueDateWarning }"
    >
      You're setting a due date in the past.
    </div>
  </div>
</template>
<script>
export default {
  name: "TaskDueDateInput",
  props: {
    value: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dueDate: null,
      showDueDateWarning: false,
    };
  },
  watch: {
    value() {
      this.dueDate = this.value;
    },
  },
  mounted() {
    if (this.value) {
      this.dueDate = this.value;
    }
  },
  methods: {
    setDueDate(e) {
      // if date is in the past, set to today
      const today = new Date();
      const dueDate = new Date(e.target.value);
      if (dueDate < today) {
        // show error message
        this.showDueDateWarning = true;
      } else {
        this.showDueDateWarning = false;
      }
      this.dueDate = e.target.value;
      this.$emit("due-date", this.dueDate);
    },
    deactivateDueDate(e) {
      this.dueDate = null;
      this.$emit("due-date", this.dueDate);
      // hide error message, if deactivated
      if (!e.target.checked) {
        this.showDueDateWarning = false;
      }
    },
    reset() {
      this.dueDate = null;
      this.showDueDateWarning = false;
    },
  },
};
</script>
