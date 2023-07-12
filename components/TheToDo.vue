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
    <div class="pb-4">
      <TheTask
        v-for="task in $store.getters.allTasks"
        :key="task.id"
        :task="task"
      />
      <div class="px-4 mt-4 flex items-center">
        <BaseInput
          id="task-text"
          v-model="taskText"
          placeholder="Add a task"
          class="w-full"
        />
        <BaseButton class="ml-2" circle @click="addTask">
          <SvgIcon
            type="mdi"
            :path="mdiPlus"
            size="20"
            class="text-white"
          ></SvgIcon>
        </BaseButton>
      </div>
    </div>
  </div>
</template>
<script>
import { mdiPlus, mdiReceiptClockOutline } from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";
import { nanoid } from "nanoid";
import TheTask from "./TheTask.vue";
import BaseInput from "./Base/BaseInput.vue";
import BaseButton from "./Base/BaseButton.vue";
export default {
  name: "TheToDo",
  components: {
    TheTask,
    BaseInput,
    BaseButton,
    SvgIcon,
  },
  data() {
    return {
      taskText: "",
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
          dueDate: null,
          createdAt: new Date(),
        };
        this.$store.dispatch("addTask", task);
        this.taskText = "";
      }
    },
  },
};
</script>
