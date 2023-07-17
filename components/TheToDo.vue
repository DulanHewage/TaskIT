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
          @duplicate="duplicateTask"
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
        <div class="mt-2 flex items-start">
          <div class="flex items-center mr-2">
            <input
              id="due-date"
              v-model="isDueDateActive"
              type="checkbox"
              class="accent-teal-600 mr-2"
            />
            <label
              for="due-date"
              class="text-sm text-slate-700 mr-1 cursor-pointer"
              >Set a due date
            </label>
          </div>
          <TaskDueDateInput
            ref="taskDueDateInput"
            :class="{ 'opacity-0': !isDueDateActive }"
            @due-date="(date) => (dueDate = date)"
          />
        </div>
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
import { fromDateToString } from "@/helpers";
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
      isDueDateActive: false,
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
          dueDate: this.isDueDateActive ? this.dueDate : null,
          createdAt: fromDateToString(new Date()),
        };
        this.$store.dispatch("addTask", task);
        this.taskText = "";
        this.dueDate = null;
        this.isDueDateActive = false;
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
    duplicateTask(taskId) {
      const task = this.$store.state.tasks.find((task) => task.id === taskId);
      const newTask = {
        ...task,
        id: nanoid(6),
        createdAt: fromDateToString(new Date()),
      };
      this.$store.dispatch("addTask", newTask);
    },
  },
};
</script>
