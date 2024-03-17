<script setup>
import { ref, watch, onMounted } from 'vue'
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member.js"
import { findTripPlan } from "@/api/plan.js"
import { findByRealId } from "@/api/user.js"
import { deleteInvitation, updateTripMemberStatus } from "@/api/invitation.js"
import { useInvitationStore } from "@/stores/invitationStore";

const { VITE_VUE_API_URL } = import.meta.env;
const { userInfo } = storeToRefs(useMemberStore());

const invitationStore = useInvitationStore();
const { invitationList } = storeToRefs(invitationStore);

var eventSource = null;

watch(invitationList, () => {
    for (let planId of invitationList.value) {
        addInvitation(planId)
    };
})

watch(userInfo, async () => {
    if (userInfo.value !== null) {
        eventSource = new EventSource(VITE_VUE_API_URL + "/subscribe?userId=" + userInfo.value.userId);

        eventSource.addEventListener('init', function (event) {
            console.log(event.data)
        })

        eventSource.addEventListener('invitation', function (event) {
            const obj = JSON.parse(event.data)
            console.log(obj)
            addInvitation(obj.planId)
        })

    } else {
        eventSource = null;
    }
})



function addInvitation(planId) {
    findTripPlan(
        planId,
        ({ data }) => {
            findByRealId(
                data.userId,
                (result) => {
                    // console.log("## getPlanTitle->findTripMember")
                    // console.log(data)
                    // console.log(result.data.userInfo.userName)
                    var newCard = document.createElement('div');
                    newCard.classList.add('card');
                    newCard.classList.add('mb-2');
                    newCard.classList.add(`${ planId }-container`);
                    
                    newCard.innerHTML =
                    `
                    <div class="card-body d-flex justify-content-between">
                        <div>
                            <h3 class="card-title fw-bold">${data.title}</h3>
                            <p class="card-text"><span class="fw-bold">${result.data.userInfo.userName}</span> 님이 초대하셨습니다.</p>
                        </div>
                        <div class="invitation-option d-flex align-items-center">
                            <button type="button" id=${planId} class="btn btn-outline-primary btn-sm mx-2" @click="acceptInvitation(this.id)">accept</button>
                            <button type="button" id=${planId} class="btn btn-outline-danger btn-sm" @click="rejectInvitation(this.id)">reject</button>
                        </div>
                    </div>
                    `
                    newCard.querySelector('.btn-outline-primary').onclick = function() {
                        acceptInvitation(planId);
                    };
        
                    newCard.querySelector('.btn-outline-danger').onclick = function() {
                        rejectInvitation(planId);
                    };
        
                    // 새로운 div를 원하는 부모 요소에 추가합니다.
                    var container = document.querySelector(".invitation-container");
                    container.appendChild(newCard);
                },
                (e) => {
                    console.log(e)
                }
            )
        },
        (error) => {
            console.log(error)
        }
    )
    

}

function acceptInvitation(planId) {
    console.log("acceptInvitation is call")
    console.log("planId is " + planId)
    updateTripMemberStatus(
        {
            planId: planId,
            userId: userInfo.value.userId,
            status: 1
        },
        () => {
            var element = document.getElementsByClassName(`${planId}-container`)[0];
            element.parentNode.removeChild(element);
            console.log("acceptInvitation done")

        },
        (error) => {
            console.log(error)
        }
    )
}

function rejectInvitation(planId) {
    console.log("rejectInvitation is call")
    console.log("planId is " + planId)
    deleteInvitation(
        planId, userInfo.value.userId,
        () => {
            var element = document.getElementsByClassName(`${planId}-container`)[0];
            element.parentNode.removeChild(element);
            console.log("rejectInvitation done")
        },
        (error) => {
            console.log(error)
        }
    )
}

</script>

<template>
    <div class="modal-dialog">
        <div class="modal-content">

        <!-- Modal Header -->
        <div class="modal-header">
            <h4 class="modal-title">Join Plan</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
            <div class="invitation-container">
                 <!--  <div class="card mb-1">
                    <div class="card-body d-flex justify-content-between ">
                        <div>
                            <h4 class="card-title fw-bold">##test plan title</h4>
                            <p class="card-text">"<span class="fw-bold">a</span>" 님이 </p>
                        </div>
                        <div class="invitation-option d-flex align-items-center">
                            <button type="button" id='5' class="btn btn-outline-primary btn-sm mx-2" @click="acceptInvitation(this.id)">accept</button>
                            <button type="button" id='5' class="btn btn-outline-danger btn-sm" @click="rejectInvitation(this.id)">reject</button>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>

        <!-- Modal footer -->
        <div class="modal-footer">
            <!-- <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button> -->
        </div>

        </div>
    </div>
</template>

<style scoped>
</style>