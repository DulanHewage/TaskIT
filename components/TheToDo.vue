<template>
  <div>
    <div class="py-3 px-4 border-b border-b-slate-200 flex items-center">
      <h2 class="text-base font-medium mr-2 flex items-center">
        <svg-icon
          type="mdi"
          :path="mdiReceiptClockOutline"
          class="mr-1"
          size="18"
        ></svg-icon>
        Pending
      </h2>
      <div
        class="h-5 w-5 bg-slate-100 rounded-full text-xs flex justify-center items-center text-slate-500"
      >
        2
      </div>
    </div>
    <div class="pb-2">
      <TheTask
        v-for="task in $store.getters.allTasks"
        :key="task.id"
        :task="task"
        @delete="(taskId) => toggleTaskDeleteConfirmation(taskId, true)"
      />
      <div class="px-4 mt-5">
        <div class="flex items-center">
          <form class="w-full" @submit.prevent="addTask">
            <BaseInput
              id="task-text"
              v-model="taskText"
              placeholder="Add a task"
              class="w-full"
            />
          </form>
          <BaseButton class="ml-2" circle @click="addTask">
            <SvgIcon
              type="mdi"
              :path="mdiPlus"
              size="20"
              class="text-white"
            ></SvgIcon>
          </BaseButton>
        </div>
        <div class="flex items-center mt-2">
          <div class="flex items-center mr-2">
            <label for="due-date" class="text-sm text-slate-700 mr-1"
              >Set a due date
            </label>
            <input id="due-date" v-model="isDueDateActive" type="checkbox" />
          </div>
          <input
            v-model="dueDate"
            type="date"
            class="text-sm text-teal-600 disabled:text-slate-500"
            :disabled="!isDueDateActive"
            @change="setDueDate"
          />
        </div>

        <div
          class="text-xs text-red-600 italic font-light mt-1"
          :class="{ 'opacity-0': !showDueDateError }"
        >
          due date must be in today or the future
        </div>
      </div>
    </div>
    <BaseModal
      :show="showTaskDeleteModal"
      title="are you sure you want to delete this task?"
      @close="toggleTaskDeleteConfirmation(null, false)"
    >
      <template #footer>
        <div class="flex justify-end items-center w-full">
          <BaseButton
            secondary
            class="mr-2"
            @click="toggleTaskDeleteConfirmation(null, false)"
            >Cancel</BaseButton
          >
          <BaseButton danger @click="deleteTask(selectedTaskId)"
            >Delete</BaseButton
          >
        </div>
      </template>
    </BaseModal>
  </div>
</template>
<script>
import { mdiPlus, mdiReceiptClockOutline } from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";
import { nanoid } from "nanoid";
export default {
  name: "TheToDo",
  components: {
    SvgIcon,
  },
  data() {
    return {
      taskText: "",
      showTaskDeleteModal: false,
      selectedTaskId: null,
      isDueDateActive: false,
      dueDate: undefined,
      showDueDateError: false,
    };
  },
  computed: {
    mdiPlus() {
      return mdiPlus;
    },
    mdiReceiptClockOutline() {
      return mdiReceiptClockOutline;
    },
  },
  methods: {
    addTask() {
      if (this.taskText) {
        // create task object and add to store
        const task = {
          id: nanoid(6),
          text: this.taskText,
          completed: false,
          dueDate: this.dueDate && this.isDueDateActive ? this.dueDate : null,
          createdAt: new Date(),
        };
        this.$store.dispatch("addTask", task);
        this.taskText = "";
        this.dueDate = undefined;
        this.isDueDateActive = false;
      }
    },
    closeTaskModal() {
      this.selectedTaskId = null;
      this.showTaskModal = false;
    },
    deleteTask(taskId) {
      this.$store.dispatch("removeTask", taskId);
      this.toggleTaskDeleteConfirmation(null, false);
    },
    toggleTaskDeleteConfirmation(taskId, show) {
      if (show) {
        this.selectedTaskId = taskId;
        this.showTaskDeleteModal = true;
      } else {
        this.selectedTaskId = null;
        this.showTaskDeleteModal = false;
      }
    },
    setDueDate(e) {
      // if date is in the past, set to today
      const today = new Date();
      const dueDate = new Date(e.target.value);
      if (dueDate < today) {
        // prevent default behaviour
        e.preventDefault();
        // set due date to today
        this.dueDate = fromDateToString(today).split("T")[0];

        // show error message
        this.showDueDateError = true;
        setTimeout(() => {
          this.showDueDateError = false;
        }, 3000);
      } else {
        // set due date to selected date
        this.dueDate = e.target.value;
      }
      // get date in local time zone
      function fromDateToString(date) {
        date = new Date(+date);
        date.setTime(date.getTime() - date.getTimezoneOffset() * 60000);
        const dateAsString = date.toISOString().substr(0, 19);
        return dateAsString;
      }
    },
  },
};
</script>
