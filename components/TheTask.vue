<template>
  <div
    class="w-full py-3 border-b-slate-200 border-b cursor-pointer hover:bg-slate-50"
  >
    <div class="flex justify-between items-center px-4">
      <div class="flex">
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
      <div
        class="flex items-center py-3 px-3 relative rounded-full hover:bg-slate-200"
        role="button"
        @click="showMenu = !showMenu"
      >
        <SvgIcon
          type="mdi"
          :path="mdiDotsVertical"
          size="22"
          class="text-slate-500"
        ></SvgIcon>
        <div
          v-if="showMenu"
          class="absolute right-0 top-0 mt-10 bg-white rounded-lg shadow-lg w-[180px] z-10"
        >
          <div
            class="py-2 px-4 w-full hover:bg-slate-100"
            @click="$emit('edit')"
          >
            Edit
          </div>
          <div
            class="py-2 px-4 hover:bg-slate-100"
            @click="$emit('delete', task.id)"
          >
            Delete
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCalendarBlank, mdiDotsVertical } from "@mdi/js";
export default {
  name: "TheTask",
  components: {
    SvgIcon,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showMenu: false,
    };
  },
  computed: {
    mdiCalendarBlank() {
      return mdiCalendarBlank;
    },
    mdiDotsVertical() {
      return mdiDotsVertical;
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
