import { shallowMount } from "@vue/test-utils";
import BaseModal from "@/components/Base/BaseModal.vue";

describe("BaseModal", () => {
  test("renders the modal with the provided title", () => {
    const wrapper = shallowMount(BaseModal, {
      propsData: {
        title: "New Modal Title",
      },
    });

    const modalTitle = wrapper.find("h3");
    expect(modalTitle.exists()).toBe(true);
    expect(modalTitle.text()).toBe("New Modal Title");
  });

  test("hides the modal when the show prop is false", () => {
    const wrapper = shallowMount(BaseModal, {
      propsData: {
        show: false,
      },
    });

    const modal = wrapper.find('[data-test="defaultModal"]');
    expect(modal.classes()).toContain("hidden");
    expect(modal.attributes("aria-hidden")).toBe("true");
  });

  test("shows the modal when the show prop is true", () => {
    const wrapper = shallowMount(BaseModal, {
      propsData: {
        show: true,
      },
    });

    const modal = wrapper.find('[data-test="defaultModal"]');
    expect(modal.classes()).not.toContain("hidden");
    expect(modal.attributes("aria-hidden")).toBeUndefined();
  });

  test("emits a close event when the close button is clicked", () => {
    const wrapper = shallowMount(BaseModal);
    const closeButton = wrapper.find('[data-test="close-button"');

    closeButton.trigger("click");
    expect(wrapper.emitted("close")).toBeTruthy();
  });
});
