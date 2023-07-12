export const state = () => ({
  tasks: [],
});

export const getters = {
  allTasks(state) {
    return state.tasks;
  },
};

export const mutations = {
  setTasks(state, tasks) {
    state.tasks = tasks;
  },
};

export const actions = {
  initTasks({ commit }) {
    // fetch from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    commit("setTasks", tasks);
  },
  addTask({ commit, state, dispatch }, task) {
    // add task to state and local storage
    commit("setTasks", [...state.tasks, task]);
    dispatch("syncTasksWithLocalStorage");
  },
  removeTask({ commit, state, dispatch }, task) {
    // remove task from state and local storage
    commit(
      "setTasks",
      state.tasks.filter((item) => item.id !== task.id)
    );
    dispatch("syncTasksWithLocalStorage");
  },
  updateTask({ commit, state, dispatch }, task) {
    // update task in state and local storage
    commit(
      "setTasks",
      state.tasks.map((item) => (item.id === task.id ? task : item))
    );
    dispatch("syncTasksWithLocalStorage");
  },
  syncTasksWithLocalStorage({ state }) {
    // sync state with local storage
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  },
};
