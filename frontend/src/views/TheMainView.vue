<script setup>
import TheHeadingNavbar from "@/components/layout/TheHeadingNavbar.vue";
import MainServiceInfo from "@/components/main/MainServiceInfo.vue";
import MainSidoCard from '@/components/main/MainSidoCard.vue';

import { onMounted } from 'vue';

onMounted(() => {
    scrollSection();
});

function scrollSection() {
    const sections = document.querySelectorAll('.section');
    const sectionCount = sections.length;
    console.log(sections)
    console.log(sections.length)
    sections.forEach(function (section, index) {
        section.addEventListener('wheel', function (event) {
            event.preventDefault();
            const delta = event.deltaY;

            // wheel down : move to next section
            if (delta > 0 && index < sections.length - 1) {
                if (index < sectionCount - 1) {
                    sections[index + 1].scrollIntoView({ behavior: 'smooth' });
                }
            }
            else if (index == sections.length - 1) {

            }
            else {
                if (index > 0) {
                    sections[index - 1].scrollIntoView({ behavior: 'smooth' });
                }
            }

        });
    });
}

</script>

<template>
    <div id="background" class="section">
        <div class="header">
            <div class="color-overlay d-flex justify-content-center align-items-center">
                <h1>Put It All Down For A While</h1>
            </div>
        </div>
    </div>
    <div class="sticky-top bg-white hidden-spacer"> </div>
    <TheHeadingNavbar :transparent="true" />

    <div class="section">
        <div class="space"></div>
        <MainServiceInfo></MainServiceInfo>
    </div>

    <div class="space"></div>
    <div class="section">
        <div class="space"></div>
        <MainSidoCard></MainSidoCard>
    </div>
</template>

<style scoped>
.header {
    height: 100vh;
    min-height: 400px;
    background-size: cover;
    background-image: linear-gradient(to bottom,
            rgba(255, 255, 255, 0) 10%,
            rgba(255, 255, 255, 0.0) 25%,
            rgba(255, 255, 255, 0.0) 50%,
            rgba(255, 255, 255, 0.3) 75%,
            rgba(255, 255, 255, 1) 100%),
        url('@/assets/img/banners/driving.png');
    opacity: 0.9;
    background-repeat: no-repeat, no-repeat;


    /* opacity: 0.7; */
    position: relative;
    color: white;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, .2);
}

#background {
    background-color: rgb(160, 159, 159);
}

.space {
    width: 100%;
    height: 200px;
}

h1 {
    color: white;
}

.color-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
}

.hidden-spacer {
    height: 100px
}
</style>