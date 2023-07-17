<template>
  <BaseModal :show="show" title="Edit Task" @close="$emit('close')">
    <form @submit="save">
      <BaseInput v-model="taskText" type="text" placeholder="Enter task" />
      <div class="mt-2 flex items-start">
        <div class="flex items-center mr-2">
          <input
            id="due-date-task-edit"
            v-model="isDueDateActive"
            type="checkbox"
            class="accent-teal-600 mr-2"
          />
          <label
            for="due-date-task-edit"
            class="text-sm text-slate-700 mr-1 cursor-pointer"
            >Set a due date
          </label>
        </div>
        <TaskDueDateInput
          :class="{ 'opacity-0': !isDueDateActive }"
          :value="taskDueDate"
          @due-date="(date) => (taskDueDate = date)"
        />
      </div>
    </form>
    <template #footer>
      <div class="flex justify-end items-center w-full">
        <BaseButton secondary class="mr-2" @click="$emit('close')">
          Cancel
        </BaseButton>
        <BaseButton @click="save">Save</BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
export default {
  name: "TaskEditModal",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    taskId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      taskText: "",
      taskDueDate: null,
      isDueDateActive: false,
    };
  },
  mounted() {
    this.setSelectedTask();
  },
  methods: {
    setSelectedTask() {
      const selectedTask = this.$store.state.tasks.find(
        (task) => task.id === this.taskId
      );
      if (selectedTask) {
        this.taskText = selectedTask.text;
        this.taskDueDate = selectedTask.dueDate;

        if (selectedTask.dueDate) {
          this.isDueDateActive = true;
        }
      }
    },
    save(e) {
      // form submittion is used to work with the enter key
      if (e) {
        e.preventDefault();
      }
      const selectedTask = this.$store.state.tasks.find(
        (task) => task.id === this.taskId
      );
      // update task
      this.$store.dispatch("updateTask", {
        ...selectedTask,
        text: this.taskText,
        dueDate: this.isDueDateActive ? this.taskDueDate : null,
      });
      // close modal
      this.$emit("close");
    },
  },
};
</script>
