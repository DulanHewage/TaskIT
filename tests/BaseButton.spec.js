import { shallowMount } from "@vue/test-utils";
import BaseButton from "@/components/Base/BaseButton.vue";

describe("BaseButton", () => {
  test("renders without errors", () => {
    const wrapper = shallowMount(BaseButton);
    expect(wrapper.exists()).toBe(true);
  });

  test("renders with default classes when secondary prop is false", () => {
    const wrapper = shallowMount(BaseButton);
    const button = wrapper.find("button");

    expect(button.classes()).toContain("text-white");
    expect(button.classes()).toContain("bg-teal-700");
    expect(button.classes()).toContain("hover:bg-teal-800");
    expect(button.classes()).toContain("focus:ring-teal-300");
  });

  test("renders with secondary classes when secondary prop is true", () => {
    const wrapper = shallowMount(BaseButton, {
      propsData: {
        secondary: true,
      },
    });
    const button = wrapper.find("button");

    expect(button.classes()).toContain("text-slate-600");
    expect(button.classes()).toContain("bg-slate-100");
    expect(button.classes()).toContain("hover:bg-slate-200");
    expect(button.classes()).toContain("focus:ring-slate-300");
  });

  test("emits a click event when button is clicked", async () => {
    const wrapper = shallowMount(BaseButton);
    const button = wrapper.find("button");
    // Trigger a click event
    await button.trigger("click");

    // Verify that the click event is emitted
    expect(wrapper.emitted("click")).toBeTruthy();
  });
});
