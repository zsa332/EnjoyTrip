import { ref } from "vue";
import { defineStore } from "pinia";

import { getInvitationByUserId, createInvitation } from "@/api/invitation.js"

export const useInvitationStore = defineStore("invitationStore", () => {
    let invitationList = ref(new Set());


    const getInvitation = async (userId) => {
        // 로그인시 한 번 호출
        console.log("### call getInvitaion: " + userId)
        await getInvitationByUserId(
            userId,
            ({data}) => {
                invitationList.value = new Set(data)
                // console.log("## init invtivation list : " + Array.from(invitationList.value))
                // console.log(data)
            },
                (error) => {
                console.log(error)
            }
        );
    };

    const addInvitation = async (planId, userId) => {
        console.log("### call addInvitation: " + planId, ", " + userId)
        await createInvitation(
            {
                planId: planId,
                userId: userId,
                status: 0
            },
            () => {
                console.log("## addInvitation done");
                invitationList.value.add(planId);
            },
                (error) => {
                console.log(error)
            }
        );
    };
    
    const acceptInvitation = async (planId, userId) => {
        await getInvitationByUserId(
            {
                planId: planId,
                userId: userId,
                status: 1
            },
          ({data}) => {
              console.log(data)
              invitationList.value.delete(planId);
          },
            (error) => {
              console.log(error)
          }
        );
      };

      const rejectInvitation = async (planId, userId) => {
        await deleteInvitation(
            planId, userId,
          ({data}) => {
              console.log(data)
              invitationList.value.delete(planId);
              
          },
            (error) => {
              console.log(error)
          }
        );
      };

    return {
        invitationList,
        getInvitation,
        addInvitation,
        acceptInvitation,
        rejectInvitation,
  };
});
