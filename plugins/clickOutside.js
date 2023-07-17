import Vue from "vue";
import clickOutside from "~/directives/click-outside";
export default function () {
  Vue.directive("click-outside", clickOutside);
}
