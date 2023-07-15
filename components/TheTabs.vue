<template>
  <div
    class="pt-4 px-4 border-b border-b-slate-200 flex items-center justify-center"
  >
    <div
      class="flex items-center mr-4 border-b-2 border-teal-700 pb-1 cursor-pointer"
      :class="tab === 'pending' ? 'border-teal-700' : 'border-transparent'"
      role="button"
      @click="$emit('change', 'pending')"
    >
      <h2 class="text-sm mr-2 flex items-center">
        <svg-icon
          type="mdi"
          :path="mdiReceiptClockOutline"
          class="mr-1"
          size="14"
        ></svg-icon>
        Pending
      </h2>
      <div
        class="h-5 w-5 bg-slate-100 rounded-full text-xs flex justify-center items-center text-slate-500"
      >
        {{ numberOfPendingTasks }}
      </div>
    </div>
    <div
      class="flex items-center border-b-2 pb-1 cursor-pointer"
      :class="tab === 'completed' ? 'border-teal-700' : 'border-transparent'"
      role="button"
      @click="$emit('change', 'completed')"
    >
      <h2 class="text-sm mr-2 flex items-center">
        <svg-icon
          type="mdi"
          :path="mdiCheckAll"
          class="mr-1"
          size="14"
        ></svg-icon>
        Completed
      </h2>
      <div
        class="h-5 w-5 bg-slate-100 rounded-full text-xs flex justify-center items-center text-slate-500"
      >
        {{ numberOfCompletedTasks }}
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiReceiptClockOutline, mdiCheckAll } from "@mdi/js";

export default {
  name: "TheTabs",
  components: {
    SvgIcon,
  },
  props: {
    tab: {
      type: String,
      default: "pending",
    },
    numberOfPendingTasks: {
      type: Number,
      default: 0,
    },
    numberOfCompletedTasks: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      mdiReceiptClockOutline,
      mdiCheckAll,
    };
  },
};
</script>
