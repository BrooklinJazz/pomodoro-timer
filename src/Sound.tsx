import { Audio } from "expo-av";
export class Sound {
  constructor(public sound = new Audio.Sound()) { }


  async play() {
    await Audio.setIsEnabledAsync(true);
    await this.sound.loadAsync(require("../assets/sounds/tada.mp3"));
    await this.sound.playAsync();
  }
}
