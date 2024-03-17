import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

import { userConfirm, findById, tokenRegeneration, logout, emailDuplicateCheck, nameDuplicateCheck,regist, modify } from "@/api/user";
import { httpStatusCode } from "@/util/http-status";

export const useMemberStore = defineStore("memberStore", () => {
  const router = useRouter();

  const isLogin = ref(false);
  const isLoginError = ref(false);
  const userInfo = ref(null);
  const isValidToken = ref(false);
  const isEmailDuplicate = ref(false);
  const isNameDuplicate = ref(false);

  const userLogin = async (loginUser) => {
    await userConfirm(
      loginUser,
      (response) => {
        if (response.status === httpStatusCode.CREATE) {
          let { data } = response;
          // console.log("data", data);
          let accessToken = data["access-token"];
          let refreshToken = data["refresh-token"];
          // console.log("accessToken", accessToken);
          // console.log("refreshToken", refreshToken);
          isLogin.value = true;
          isLoginError.value = false;
          isValidToken.value = true;
          sessionStorage.setItem("accessToken", accessToken);
          sessionStorage.setItem("refreshToken", refreshToken);
          // console.log("sessiontStorage에 담았다", isLogin.value);
          console.log(JSON.stringify(userInfo.value));
        } else {
          isLogin.value = false;
          isLoginError.value = true;
          isValidToken.value = false;
        }
      },
      (error) => {
        isLogin.value = false;
        isLoginError.value = true;
        isValidToken.value = false;
      }
    );
  };

  const getUserInfo = (token) => {
    let decodeToken = jwtDecode(token);
    console.log("2. decodeToken", decodeToken);
    findById(
      decodeToken.userEmail,
      (response) => {
        if (response.status === httpStatusCode.OK) {
          userInfo.value = response.data.userInfo;
          console.log("3. getUserInfo data >> ", response.data);
        } else {
          console.log("유저 정보 없음!!!!");
        }
      },
      async (error) => {
        console.error(
          "getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ",
          error.response.status
        );
        isValidToken.value = false;

        await tokenRegenerate();
      }
    );
  };

  const userEmailDuplicateCheck = async (userEmail) => { 
    emailDuplicateCheck(
      userEmail,
      (response) => {
        if (response.status === httpStatusCode.OK) {
          if (response.data) isEmailDuplicate.value = false;
          else isEmailDuplicate.value = true;
        } else {
          console.log("유저 정보 없음!!!!");
          isEmailDuplicate.value = true;
        }
      },
      async (error) => {
        console.log(error);
        isEmailDuplicate.value = false;
      }
    );
  }

  const userNameDuplicateCheck = async (userName) => { 
    nameDuplicateCheck(
      userName,
      (response) => {
        if (response.status === httpStatusCode.OK) {
          if (response.data) isNameDuplicate.value = false;
          else isNameDuplicate.value = true;
        } else {
          console.log("유저 정보 없음!!!!");
          isNameDuplicate.value = true;
        }
      },
      async (error) => {
        console.log(error);
        isNameDuplicate.value = false;
      }
    );
  }


  const tokenRegenerate = async () => {
    console.log("토큰 재발급 >> 기존 토큰 정보 : {}", sessionStorage.getItem("accessToken"));
    await tokenRegeneration(
      JSON.stringify(userInfo.value),
      (response) => {
        if (response.status === httpStatusCode.CREATE) {
          let accessToken = response.data["access-token"];
          console.log("재발급 완료 >> 새로운 토큰 : {}", accessToken);
          sessionStorage.setItem("accessToken", accessToken);
          isValidToken.value = true;
        }
      },
      async (error) => {
        // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
        if (error.response.status === httpStatusCode.UNAUTHORIZED) {
          console.log("갱신 실패");
          // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
          await logout(
            userInfo.value.userEmail,
            (response) => {
              if (response.status === httpStatusCode.OK) {
                console.log("리프레시 토큰 제거 성공");
              } else {
                console.log("리프레시 토큰 제거 실패");
              }
              alert("RefreshToken 기간 만료!!! 다시 로그인해 주세요.");
              isLogin.value = false;
              userInfo.value = null;
              isValidToken.value = false;
              router.push({ name: "user-login" });
            },
            (error) => {
              console.error(error);
              isLogin.value = false;
              userInfo.value = null;
            }
          );
        }
      }
    );
  };

  const userRegist = async (user) => {
    const registUser = JSON.stringify(user.value);
    await regist(
      registUser,
      (response) => {
        if (response.status === httpStatusCode.CREATE) {
          console.log(response.data["msg"]);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const userLogout = async (userEmail) => {
    await logout(
      userEmail,
      (response) => {
        if (response.status === httpStatusCode.OK) {
          isLogin.value = false;
          userInfo.value = null;
          isValidToken.value = false;
        } else {
          console.error("유저 정보 없음!!!!");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const userInfoModify = async (user) => { 
    const modifyUser = JSON.stringify(user.value);
    await modify(
      modifyUser,
      (response) => {
        if (response.status === httpStatusCode.CREATE) {
          console.log(response.data["msg"]);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  return {
    isLogin,
    isLoginError,
    userInfo,
    isValidToken,
    isEmailDuplicate,
    isNameDuplicate,
    userLogin,
    getUserInfo,
    tokenRegenerate,
    userLogout,
    userRegist,
    userEmailDuplicateCheck,
    userNameDuplicateCheck,
    userInfoModify,
  };
});
