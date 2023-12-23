export const isDesktopSafari = () => {
  var userAgent = navigator.userAgent.toLowerCase();

  // check if the browser is Safari and not on a mobile device
  var isSafari =
    userAgent.indexOf("safari") !== -1 && userAgent.indexOf("chrome") === -1;
  var isMobile =
    userAgent.indexOf("mobile") !== -1 || userAgent.indexOf("android") !== -1;

  return isSafari && !isMobile;
};
