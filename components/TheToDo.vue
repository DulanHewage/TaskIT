<template>
  <div>
    <TheTabs
      :tab="tab"
      :number-of-pending-tasks="pendingTasks.length"
      :number-of-completed-tasks="completedTasks.length"
      @change="changeTab"
    />
    <div class="pb-2 flex flex-col justify-between">
      <div>
        <TheTask
          v-for="task in taskList"
          :key="task.id"
          :task="task"
          @delete="(taskId) => toggleTaskDeleteConfirmation(taskId, true)"
          @edit="(taskId) => toggleTaskUpdateModal(taskId, true)"
        />
      </div>
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
          <BaseButton class="ml-3" circle @click="addTask">
            <SvgIcon
              type="mdi"
              :path="mdiPlus"
              size="20"
              class="text-white"
            ></SvgIcon>
          </BaseButton>
        </div>
        <TaskDueDateInput
          ref="taskDueDateInput"
          @due-date="(date) => (dueDate = date)"
        />
      </div>
    </div>
    <BaseModal
      :show="showTaskDeleteModal"
      title="Are you sure you want to delete this task?"
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
    <TaskEditModal
      v-if="selectedTaskId"
      :show="showEditModal"
      :task-id="selectedTaskId"
      @close="toggleTaskUpdateModal(null, false)"
    />
  </div>
</template>
<script>
import { mdiPlus, mdiReceiptClockOutline } from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";
import { nanoid } from "nanoid";
import { mapGetters } from "vuex";
export default {
  name: "TheToDo",
  components: {
    SvgIcon,
  },
  data() {
    return {
      mdiReceiptClockOutline,
      mdiPlus,
      taskText: "",
      showTaskDeleteModal: false,
      selectedTaskId: null,
      dueDate: null,
      tab: "pending",
      showEditModal: false,
    };
  },
  computed: {
    ...mapGetters(["completedTasks", "pendingTasks"]),
    taskList() {
      return this.tab === "pending" ? this.pendingTasks : this.completedTasks;
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
          dueDate: this.dueDate,
          createdAt: this.fromDateToString(new Date()),
        };
        this.$store.dispatch("addTask", task);
        this.taskText = "";
        this.dueDate = null;
        // call reset method on TaskDueDateInput component
        this.$refs.taskDueDateInput.reset();
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
    fromDateToString(date) {
      // get date in local time zone
      date = new Date(+date);
      date.setTime(date.getTime() - date.getTimezoneOffset() * 60000);
      const dateAsString = date.toISOString().substr(0, 19);
      return dateAsString.split("T")[0];
    },
    changeTab(tabId) {
      this.tab = tabId;
    },
    toggleTaskUpdateModal(taskId, show) {
      if (show) {
        this.selectedTaskId = taskId;
        this.showEditModal = true;
      } else {
        this.selectedTaskId = null;
        this.showEditModal = false;
      }
    },
  },
};
</script>
