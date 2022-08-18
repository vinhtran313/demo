/**
 * @param {Error} error
 * @param {Vue} context
 */
export default function (error, context) {
  console.log(error);
  if (context) {
    context.$error({
      title: "An error has occurred",
    });
  }
}
