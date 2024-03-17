<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { listArea, listAttractions, listContentType } from "@/api/attraction";
import { createTripPlanAttraction, ramoveTripPlanAttraction } from '@/api/plan.js'

import ASelect from '@/components/common/ASelect.vue';
import VKakaoMap from '@/components/common/VKakaoMap.vue';

const emit = defineEmits(['callGetAttractionList']);

const props = defineProps({
  mode: String,
  planId: Number,
  sidoCode: { type: Number, default: null },
});

const sidoList = ref();
const gugunList = ref([{ label: "구군선택", value: "" }]);
const contentTypeList = ref();
const attractionList = ref([]);
const selectAttraction = ref({});

const searchCondition = ref({
  sidoCode: 1,
  gugunCode: 1,
  contentTypeId: 12,
  word: ""
});

const planCondition = ref({
  planId: props.planId,
  contentId: 0,
});


onMounted(() => {
  getSidoList();
  getContentTypeList();

});

const mountedKakaoMap = () => {
  if (props.sidoCode !== null) {
    searchCondition.value.sidoCode = props.sidoCode;
    console.log("searchCondition", searchCondition.value)
    getAttractions();
  }
}

const onChangeSido = (val) => {
  searchCondition.value.sidoCode = val;
  listArea(
    val,
    ({ data }) => {
      let options = [];
      options.push({ label: "구군선택", value: "" });
      data.forEach((gugun) => {
        options.push({ label: gugun.gugunName, value: gugun.gugunCode });
      });
      gugunList.value = options;
    },
    (err) => {
      console.log(err);
    }
  );
  // console.log(sidoList.value)
  // console.log(gugunList.value)
};

const onChangeGugun = (val) => {
  searchCondition.value.gugunCode = val;
};

const onContentType = (val) => {
  searchCondition.value.contentTypeId = val;
};

const getAttractions = () => {
  listAttractions(
    searchCondition.value,
    ({ data }) => {
      attractionList.value = data;
      // console.log(attractionList.value);
    },
    (err) => {
      console.log(err);
    }
  );
};


const getSidoList = () => {
  listArea(
    0,
    ({ data }) => {
      // console.log(data)
      let options = [];
      options.push({ label: "시도선택", value: "" });
      data.forEach((sido) => {
        options.push({ label: sido.sidoName, value: sido.sidoCode });
      });
      sidoList.value = options;
    },
    (err) => {
      console.log(err);
    }
  );
};

const getContentTypeList = () => {
  listContentType(
    ({ data }) => {
      // console.log(data)
      let options = [];
      options.push({ label: "콘텐츠 타입 선택", value: "" });
      data.forEach((type) => {
        options.push({ label: type.contentTypeName, value: type.contentTypeId });
      });
      contentTypeList.value = options;
    },
    (err) => {
      console.log(err);
    }
  );
};


const viewAttraction = (attraction) => {
  selectAttraction.value = attraction;
};

const addPlanAttraction = (contentId) => {
  planCondition.value.planId = props.planId;
  planCondition.value.contentId = contentId;
  console.log(planCondition.value)
  createTripPlanAttraction(
    planCondition.value,
    () => {
      emit('callGetAttractionList', contentId);
      console.log("성공");
    },
    (err) => { console.log(err); }
  )

};

</script>

<template>
  <div id="search-map-container">
    <div class="overflow-auto" id="plan-list">
      <div class="justify-content-center">
        <a href="#"
          class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom justify-content-between search-menu">
          <div class="d-flex align-items-center">
            <div class="search-condition">
              <div class="d-flex align-items-center">
                <!-- <logo_icon width="20px" height="20px" /> -->
                <strong>SEARCH</strong>
              </div>
              <ASelect :key="props.sidoCode" :selectOption="sidoList" @onKeySelect="onChangeSido" />
              <ASelect :selectOption="gugunList" @onKeySelect="onChangeGugun" />
              <ASelect :selectOption="contentTypeList" @onKeySelect="onContentType" />
              <div>
                <a-input-search v-model:value="searchCondition.word" placeholder="input search text"
                  @search="getAttractions" />
              </div>
            </div>
          </div>
        </a>
        <div class="list-group list-group-flush border-bottom scrollarea" v-for="attraction in attractionList"
          :key="attraction.contentId">
          <a href="#" class="list-group-item list-group-item-action py-0 lh-tight" @click="viewAttraction(attraction)">
            <div class="d-flex align-items-center" id="attraction-card">
              <div v-if="attraction.firstImage === ''"> <!-- == 2개는 자바스크립트에서는 안돼요. === 3개로 써주세요. 아시겠어요???? -->
                <div class="d-flex justify-content-center align-items-center" style="width: 130px; height: 100px;">
                  <img src="@/assets/icon/image.png" :alt="`${attraction.title}`" height="70" width="70">
                </div>
              </div>
              <div v-else>
                <img :src="`${attraction.firstImage}`" :alt="`${attraction.title}`" width="130" height="100"
                  style="border-radius: 2%;">
              </div>

              <a href="#" class="list-group-item list-group-item-action py-3 lh-tight" style="border: none;">
                <div class="d-flex align-items-center justify-content-between">
                  <strong class="mb-1">{{ attraction.title }}</strong>
                  <div v-if="props.mode === 'attraction'">
                    <button type="button" class="btn btn-outline-primary btn-sm"
                      @click="addPlanAttraction(attraction.contentId)">Add</button>
                  </div>
                </div>
                <div class="col-10 mb-1 small">
                  <div>{{ attraction.addr1 }}</div>
                  <div v-if="!(attraction.tel === '')" class="d-flex align-items-center" style="margin-top: 15px;">
                    <img src="@/assets/icon/phone-call.png" alt="call" height="14" width="14" style="margin-right: 7px;">
                    {{ attraction.tel }}
                  </div>
                </div>
              </a>
            </div>
          </a>
        </div>
      </div>
    </div>

    <div id="map">
      <VKakaoMap @mountedKakaoMap="mountedKakaoMap" :attractions="attractionList" :selectAttraction="selectAttraction" />
    </div>

  </div>
</template>

<style scoped>
#search-map-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
}

#plan-list {
  min-width: 430px;
}

#map {
  width: 100%;
  height: 100%;
}

#attraction-card {
  margin: 0 0 0 5px;
}

.search-condition>* {
  margin: 0 0 5px 5px;
}
</style>
