export const navigateTo = (navigation, screenName, params={}, replace= false) => {
    if (replace) {
        navigation.replace(screenName, params);
    } else {
        navigation.navigate(screenName, params);
    }
};