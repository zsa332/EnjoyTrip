<script setup>
import { ref, watch } from "vue" 
import { findByName } from "@/api/user.js"
import { dispatch } from "@/api/sse.js"
import { registTripMember } from "@/api/invitation.js"


const props = defineProps({
    planId: Number
})

const userName = ref("")

// watch(props.planId, async () => {
//     userName.value=""
// })

const invite = () => {
    console.log("### invite call")
    
    findByName(
        userName.value,
        ({ data }) => {
            registTripMember(
                {
                    planId: props.planId,
                    userId: data.userId,
                    status: 0
                },
                () => {
                    alert("성공. 초대를 완료했습니다.")
                    // have to send sse
                    dispatch(
                        {
                            planId: props.planId,
                            userId: data.userId,
                            status: 0
                        },
                        () => {
                            console.log("see send done")
                        },
                        (error) => {
                            console.log(error)
                        }
                    )
                },
                (e) => {
                    console.log(e)
                    
                    alert("실패. 입력을 확인해주세요.")
                }
            )
        },
        (e) => {
            console.log(e)
            alert("실패. 입력을 확인해주세요.")
        }
    )

    console.log("### done")

    userName.value=""
}


</script>

<template>
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- Modal body -->
            <div class="modal-body">
                <div class="d-flex flex-row-reverse">
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                
                <div class="d-flex justify-content-around" style="margin: 10px 0 0 0;">
                    <input type="text" class="form-control" v-model="userName" placeholder="UserName" name="userName" style="width: 400px;">
                    <button class="btn btn-primary btn-sm" @click="invite">Invite</button>
                </div>  
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>