import { localAxios } from "@/util/http-commons";

const axios = localAxios();

function dispatch(formData, success, fail) {
  console.log("dispatch api 호출")
  axios.post("/dispatch/", formData).then(success).catch(fail);
}

export { dispatch };