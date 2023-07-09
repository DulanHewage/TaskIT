import { mount } from "@vue/test-utils";
import BaseInput from "@/components/Base/BaseInput.vue";

describe("BaseInput", () => {
  test("renders the input label when the label prop is provided", () => {
    const wrapper = mount(BaseInput, {
      propsData: {
        id: "input-id",
        label: "Input Label",
      },
    });

    const label = wrapper.find("label");
    expect(label.exists()).toBe(true);
    expect(label.attributes("for")).toBe("input-id");
    expect(label.text()).toBe("Input Label");
  });

  test("does not render the input label when the label prop is not provided", () => {
    const wrapper = mount(BaseInput, {
      propsData: {
        id: "input-id",
      },
    });

    const label = wrapper.find("label");
    expect(label.exists()).toBe(false);
  });

  test("renders the input with the provided attributes and classes", () => {
    const wrapper = mount(BaseInput, {
      propsData: {
        id: "input-id",
        type: "email",
        placeholder: "Enter your email",
      },
    });

    const input = wrapper.find("input");
    expect(input.exists()).toBe(true);
    expect(input.attributes("id")).toBe("input-id");
    expect(input.attributes("type")).toBe("email");
    expect(input.attributes("placeholder")).toBe("Enter your email");
  });

  test("applies error classes when the error prop is true", () => {
    const wrapper = mount(BaseInput, {
      propsData: {
        id: "input-id",
        label: "Input Label",
        error: true,
      },
    });

    const input = wrapper.find("input");
    expect(input.classes()).toContain("bg-red-200");
    expect(input.classes()).toContain("placeholder:text-red-500");
    expect(input.classes()).toContain("border-red-500");
    expect(input.classes()).toContain("focus:border-red-500");
  });

  test("applies default classes when the error prop is false", () => {
    const wrapper = mount(BaseInput, {
      propsData: {
        id: "input-id",
        label: "Input Label",
        error: false,
      },
    });

    const input = wrapper.find("input");
    expect(input.classes()).toContain("bg-slate-50");
    expect(input.classes()).toContain("border-slate-300");
    expect(input.classes()).toContain("focus:border-slate-200");
  });
});
