<template>
  <div
    class="w-full py-3 border-b-slate-200 border-b cursor-pointer hover:bg-slate-50"
  >
    <div class="flex justify-between items-center px-4">
      <div class="flex">
        <div class="pr-2 mt-1">
          <BaseCheckbox :value="task.completed" @input="changeStatus" />
        </div>
        <div>
          <div
            class="text-base font-semibold"
            :class="isDueDatePassed ? 'text-red-600' : 'text-slate-900'"
          >
            {{ task.text }}
          </div>
          <div class="mt-1 text-xs flex items-center">
            <div
              class="flex items-center"
              :class="isDueDatePassed ? 'text-red-600' : 'text-slate-500'"
            >
              <svg-icon
                type="mdi"
                :path="mdiCalendarBlank"
                class="mr-1"
                size="18"
              ></svg-icon>
              <div>{{ formattedDueDate }}</div>
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
      mdiCalendarBlank,
      mdiDotsVertical,
    };
  },
  computed: {
    createdDaysAgo() {
      const numberOfDays = this.daysSince(new Date(this.task.createdAt));
      if (numberOfDays === 0) return "today";
      if (numberOfDays === 1) return "yesterday";
      return `${numberOfDays} days ago`;
    },
    formattedDueDate() {
      if (this.task.dueDate === null) return "No due date";
      return new Date(this.task.dueDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    },
    isDueDatePassed() {
      if (this.task.dueDate === null) return false;
      const dueDate = new Date(this.task.dueDate);
      const currentDate = new Date();
      return currentDate > dueDate;
    },
  },
  methods: {
    daysSince(date) {
      const currentDate = new Date();
      const timeDiff = currentDate.getTime() - date.getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      return daysDiff;
    },
    changeStatus(isComplete) {
      if (isComplete) {
        this.$store.dispatch("setTaskComplete", this.task.id);
      } else {
        this.$store.dispatch("setTaskPending", this.task.id);
      }
    },
  },
};
</script>
