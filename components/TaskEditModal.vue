<template>
  <BaseModal :show="show" title="Edit Task" @close="$emit('close')">
    <!-- <BaseInput
      id="task-text"
      v-model="selectedTask"
      type="text"
      placeholder="Enter task"
    /> -->
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
      selectedTask: {},
    };
  },
  mounted() {
    console.log(this.taskId);
  },
  methods: {
    save() {
      console.log("save");
    },
  },
};
</script>
