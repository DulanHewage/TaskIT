<template>
  <div
    class="w-full py-3 border-b-slate-200 border-b cursor-pointer hover:bg-slate-50"
  >
    <div class="flex px-4">
      <div class="pr-2 mt-1">
        <BaseCheckbox />
      </div>
      <div>
        <div class="text-slate-900 text-base font-semibold">
          {{ task.text }}
        </div>
        <div class="flex mt-1 text-xs">
          <div class="flex items-center text-red-600">
            <svg-icon
              type="mdi"
              :path="mdiCalendarBlank"
              class="mr-1"
              size="18"
            ></svg-icon>
            <div>6 Apr 2023</div>
          </div>
          <div class="text-slate-500 ml-2">Created {{ createdDaysAgo }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCalendarBlank } from "@mdi/js";
import BaseCheckbox from "./Base/BaseCheckbox.vue";
export default {
  name: "TheTask",
  components: {
    BaseCheckbox,
    SvgIcon,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  computed: {
    mdiCalendarBlank() {
      return mdiCalendarBlank;
    },
    createdDaysAgo() {
      const numberOfDays = this.daysSince(new Date(this.task.createdAt));
      if (numberOfDays === 0) return "today";
      if (numberOfDays === 1) return "yesterday";
      return `${numberOfDays} days ago`;
    },
  },
  methods: {
    daysSince(date) {
      const currentDate = new Date();
      const timeDiff = currentDate.getTime() - date.getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      return daysDiff;
    },
  },
};
</script>
