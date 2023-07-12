<template>
  <div>
    <h1 class="text-lg text-center">TaskIT</h1>
    <BaseButton>ADD NEW TASK</BaseButton>
    <BaseButton secondary @click="showModal = true">Show modal</BaseButton>
    <BaseCard class="w-[460px]">
      <h2 class="text-lg">Task 1</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit unde
        dicta, perspiciatis excepturi, rem saepe cum velit itaque dolorem
        laboriosam autem temporibus odit voluptatem neque nam aspernatur vitae
        fuga ullam.
      </p>
    </BaseCard>
    <BaseInput id="task" placeholder="Enter task name" error />
    <BaseModal :show="showModal" @close="showModal = false">
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam quos
        saepe illum vitae sit officia fugit, unde placeat vero, ipsa quisquam
        iure. Incidunt neque soluta unde distinctio hic dignissimos nihil.
      </p>
      <template #footer>
        <BaseButton>Save</BaseButton>
        <BaseButton>Cancel</BaseButton>
      </template>
    </BaseModal>
    <BaseCheckbox v-model="checked" />
    <h2>{{ $store.state }}</h2>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      showModal: false,
      checked: true,
    };
  },
};
</script>
