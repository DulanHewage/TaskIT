<template>
  <BaseModal :show="show" title="Edit Task" @close="$emit('close')">
    <form @submit="save">
      <BaseInput v-model="taskText" type="text" placeholder="Enter task" />
      <TaskDueDateInput
        v-if="taskDueDate"
        :value="taskDueDate"
        @due-date="taskDueDate = $event"
      />
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
      }
    },
    save(e) {
      // form submittion is used to work with the enter key
      e.preventDefault();
      const selectedTask = this.$store.state.tasks.find(
        (task) => task.id === this.taskId
      );
      // update task
      this.$store.dispatch("updateTask", {
        ...selectedTask,
        text: this.taskText,
        dueDate: this.taskDueDate,
      });
      // close modal
      this.$emit("close");
    },
  },
};
</script>
