import Mellowtel from "mellowtel";

let mellowtel;

(async () => {
  try {
    console.log("Initializing Mellowtel...");
    mellowtel = new Mellowtel("a4981498"); // Replace with your configuration key
    await mellowtel.initBackground();
    console.log("Mellowtel initialized successfully.");
  } catch (error) {
    console.error("Error during Mellowtel initialization:", error);
  }
})();

chrome.runtime.onInstalled.addListener(async function (details) {
  try {
    console.log("Extension Installed or Updated");
    if (details.reason === "install") {
      console.log("First-time install detected. Opening opt-in link...");
      await mellowtel.generateAndOpenOptInLink();
      console.log("Opt-in link opened successfully.");
    } else if (details.reason === "update") {
      console.log("Extension updated.");
    }
  } catch (error) {
    console.error("Error handling onInstalled event:", error);
  }
});

async function openSettings() {
  try {
    console.log("Attempting to generate settings link...");
    const settingsLink = await mellowtel.generateSettingsLink();
    console.log("Generated Settings Link:", settingsLink);
    // Example: Open the link in a new tab
    chrome.tabs.create({ url: settingsLink });
  } catch (error) {
    console.error("Error generating settings link:", error);
  }
}
