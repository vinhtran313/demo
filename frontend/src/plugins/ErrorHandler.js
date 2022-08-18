import { STATUS_UNAUTHORIZED } from "../constants/common";
/**
 * @param {Error} error
 * @param {Vue} context
 */
function handleError(error, context) {
  console.error(error);
  const message = error?.response?.data?.errorMessage
    ? error.response.data.errorMessage
    : error?.response?.data?.error || error?.message || "An error has occurred";
  if (context) {
    context.$error({
      title: message,
    });
    if (error?.response?.status === STATUS_UNAUTHORIZED) {
      context.$router.push({ name: "terms" });
    }
  }
}

export default {
  install(Vue) {
    Vue.prototype.$handleError = handleError;
  },
};
