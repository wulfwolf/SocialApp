import Constants from "expo-constants";
import { Camera } from "expo-camera";

export default GetCammeraPermission = async () => {
  if (Constants.platform.android) {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status != "granted") {
      alert("We need permission to use your camera roll");
    }
  }
};
