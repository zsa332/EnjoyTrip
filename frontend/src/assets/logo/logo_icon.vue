<script setup>
const props = defineProps({
  width: { type: String, default: "30px" },
  height: { type: String, default: "30px" },
  color: { type: String, default: "black" },
})

const colorState = {
  black: "#000000",
  blue: "#68d2df",
}
</script>

<template>
  <svg xmlns:mydata="http://www.w3.org/2000/svg" mydata:contrastcolor="11111f" mydata:template="Contrast"
    mydata:presentation="2.5" mydata:layouttype="undefined" mydata:specialfontid="undefined" mydata:id1="063"
    mydata:id2="1054" mydata:companyname="Enjoy Trip" mydata:companytagline="" version="1.1"
    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="100 160 80 150" 
    :width="props.width" :height="props.height" style="margin: auto 10px;" >
    <g :fill="colorState[props.color]" fill-rule="none" stroke="none" stroke-width="1" stroke-linecap="butt"
      stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none"
      font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal" >
      <g
        data-paper-data="{&quot;isGlobalGroup&quot;:true,&quot;bounds&quot;:{&quot;x&quot;:83.67542756430626,&quot;y&quot;:175.7772646917177,&quot;width&quot;:382.64914487138753,&quot;height&quot;:118.44596018833684}}">
        <g data-paper-data="{&quot;selectedEffects&quot;:{&quot;container&quot;:&quot;&quot;,&quot;transformation&quot;:&quot;&quot;,&quot;pattern&quot;:&quot;&quot;},&quot;initialText&quot;:&quot;ET&quot;,&quot;fillRule&quot;:&quot;nonzero&quot;,&quot;bounds&quot;:{&quot;x&quot;:83.67542756430626,&quot;y&quot;:175.7772646917177,&quot;width&quot;:117.3435605588717,&quot;height&quot;:118.44596018833684},&quot;isIcon&quot;:&quot;true&quot;,&quot;iconType&quot;:&quot;initial&quot;,&quot;iconStyle&quot;:&quot;standalone&quot;,&quot;rawInitialId&quot;:1087,&quot;monogramSpecial&quot;:&quot;emblem&quot;,&quot;suitableAsStandaloneIcon&quot;:true}"
          fill-rule="evenodd" id="element-id-73019">
          <g data-paper-data="{&quot;isPathIcon&quot;:true}" id="element-id-50264">
            <path
              d="M140.98801,294.22322c-31.88399,-1.054 -57.31258,-27.14099 -57.31258,-59.15698c0,-32.14799 25.42859,-58.23498 57.31258,-59.28898v10.54c-26.08699,1.054 -46.77238,22.39799 -46.77238,48.74898c0,3.689 0.3953,7.378 1.1858,10.935l45.58658,-26.34999v12.253l-42.02929,24.24199c7.6413,15.81099 23.45229,26.87799 42.02929,27.53699z"
              id="element-id-49466"></path>
            <path
              d="M147.65801,186.55726c5.525,0.135 10.915,1.348 15.89999,3.234v104.43196c3.773,-1.213 7.412,-2.83 10.78,-4.582v-94.05497c5.929,4.177 10.915,9.702 14.553,16.03499h12.128c-9.163,-20.61699 -29.50999,-35.03499 -53.36098,-35.84399z"
              id="element-id-86262"></path>
          </g>
        </g>
      </g>
    </g>
    
    <rect data-element-id="element-id-49466" stroke-width="2" fill="transparent"
      class="invisible-element-box individual-element" x="84" y="176" width="57" height="118"></rect>
    <rect data-element-id="element-id-86262" stroke-width="2" fill="transparent"
      class="invisible-element-box individual-element" x="148" y="176" width="53" height="118"></rect>
    
  </svg>
</template>

<style scoped></style>