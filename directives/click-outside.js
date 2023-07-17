function bind(el, binding) {
  // given expression must evaluate to a function
  if (typeof binding.value !== "function") {
    console.error("Directive v-click-outside must accept a function!");
  }
  // define handler and cache it on the element
  const bubble = binding.modifiers.bubble;
  const handler = (e) => {
    if (bubble || (!el.contains(e.target) && el !== e.target)) {
      binding.value(e);
    }
  };
  el.vueClickOutside = handler;

  // add Event Listeners
  document.addEventListener("click", handler);
}
function unbind(el, binding) {
  // remove Event Listeners
  document.removeEventListener("click", el.vueClickOutside);
  el.vueClickOutside = null;
}

const clickOutside = {
  bind,
  unbind,
};

export default clickOutside;
