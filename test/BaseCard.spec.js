import { mount } from "@vue/test-utils";
import BaseCard from "@/components/Base/BaseCard.vue";

describe("BaseCard", () => {
  test("renders the card with the provided slot content", () => {
    const wrapper = mount(BaseCard, {
      slots: {
        default: "Card content",
      },
    });

    expect(wrapper.text()).toContain("Card content");
  });

  test("passes down attributes to the card", () => {
    const wrapper = mount(BaseCard, {
      attrs: {
        "data-testid": "card",
      },
    });

    expect(wrapper.attributes("data-testid")).toBe("card");
  });
});
