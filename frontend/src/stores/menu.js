import { ref } from "vue";
import { defineStore } from "pinia";

export const useMenuStore = defineStore("menuStore", () => {
  const menuList = ref([
    { name: "Travel", show: true, routeName: "attraction" },
    { name: "Hot", show: true, routeName: "board" },
    { name: "Login", show: true, routeName: "user-login" },
    { name: "Info", show: false, routeName: "mypage" },
    { name: "Logout", show: false, routeName: "user-logout" },
    { name: "invitation", show: false, routeName: "" },
  ]);

  const changeMenuState = () => {
    menuList.value[2].show = !menuList.value[2].show;
    menuList.value[3].show = !menuList.value[3].show;
    menuList.value[4].show = !menuList.value[4].show;
    menuList.value[5].show = !menuList.value[5].show;
  };
  return {
    menuList,
    changeMenuState,
  };
});
