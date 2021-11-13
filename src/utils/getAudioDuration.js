export function getDuration(src) {
  return new Promise(function (resolve) {
    let audio = new Audio();
    audio.addEventListener("loadedmetadata", function () {
      resolve(audio.duration);
    });
    audio.src = src;
  });
}
