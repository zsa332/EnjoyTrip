<script setup>
import { useMenuStore } from "@/stores/menu";
import { storeToRefs } from "pinia";
import logo from '@/assets/logo/logo.vue';
import invitationListModal from "@/components/invitation/invitationListModal.vue"


const scrolling = (e) => {

}

const { menuList } = storeToRefs(useMenuStore());
const props = defineProps({
    transparent: {
        type: Boolean,
        default: false
    },
    light: {
        type: Boolean,
        default: false
    },
    menus: {
        type: Boolean,
        default: true
    },
    flulid: {
        type: Boolean,
        default: false
    }
});

function getArrowColor() {
    if (props.transparent) {
        return DownArrWhite;
    } else {
        return ArrDark;
    }
}

const getTextColor = () => {
    let color;
    if (props.transparent) {
        color = "text-light";
    } else {
        color = "text-dark";
    }
    return "text-dark";

};

</script>

<template>
    <nav class="navbar navbar-expand-sm fixed-top navbar-light" :class="{
        'z-index-3 w-100 shadow-none navbar-transparent ': props.transparent,
        'z-index-3 w-100 navbar-light bg-white ': props.light,
    }" v-on:scroll="scrolling(e)">
        <div :class="props.flulid ? 'container-fluid' : 'container'">
            <router-link :to="{ name: 'main' }" class="navbar-brand fw-bold"
                :class="props.transparent ? 'text-white' : 'font-weight-bolder ms-sm-3'">
                <logo :width="'200px'" :height="'80px'" />
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="d-flex" id="collapsibleNavbar">
                <ul class="navbar-nav mb-2 me-lg-0" v-for="menu in menuList" :key="menu.name" v-if="props.menus">
                    <li class="nav-item" v-if="menu.show && menu.name!='invitation'">
                        <router-link :to="{ name: menu.routeName }" class="nav-link" :class="getTextColor()">
                            <h4>{{ menu.name }}</h4>
                        </router-link>
                    </li>

                    <li class="nav-item" v-if="menu.show && menu.name=='invitation'">
                       <img src="@/assets/icon/letter.png" alt="invitation" style="width: 25px; margin: 13px 20px;" data-bs-toggle="modal" data-bs-target="#myModal">
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- The Modal -->
    <div class="modal" id="myModal">
        <div class="modal-dialog">
            <invitationListModal/>
        </div>
    </div>
</template>

<style scoped>
.navbar-brand {
    font-size: 30px;
}

.nav-link {
    font-size: 24px;
}
</style>