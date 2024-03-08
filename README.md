# LightMeter
LightMeter is a desktop application inspired by RainMeter, designed to provide a similar user experience with minimal resource usage on low-end devices. It achieves this by leveraging Electron for rendering widgets built purely with HTML5, CSS, and JavaScript. The application itself is also built on Electron, ensuring a lightweight footprint due to its Node.js foundation.

**Getting Started**

1. **Install Node.js:** Download and install Node.js from the  [official Node.js website](https://nodejs.org/en/download) following the provided instructions.
2. **Download The latest release**: in the release section, download the latest release
3. **Install dipendencies:** Run the `npm install` to install the necessary dependencies to run LightMeter
4. **Run LightMeter:** Navigate to the project directory in your terminal and execute `npm start`. This will launch the Electron app and display the pre-installed widgets.

**Creating Custom Widgets**

LightMeter allows you to create custom widgets using familiar web technologies like HTML5, CSS, and JavaScript to suit your needs. In addition to pre-installed widgets, a sample widget is included to demonstrate the widget creation process:

* **Templates folder (optional):** This folder helps organize your widget's CSS and JavaScript files, promoting a cleaner project structure.
* **Data.json:** This file provides essential information for LightMeter to recognize your widget. All values within this file are mandatory. Refer to the "Data.json File Structure" section for details.
* **index.html:** This file serves as the primary building block for your widget's user interface.

**Making Widgets Movable**

To enable dragging and repositioning of your widget within LightMeter, incorporate the following CSS class:

```css
.draggable {
  -webkit-app-region: drag;
}
```

# Data.json File Structure and Guidelines

This document outlines the structure and guidelines for the `Data.json` file used in the LightMeter application. Adhering to these guidelines is crucial for the correct recognition and functionality of your module.

## File Structure

Upon opening the `Data.json` file, you will encounter a JSON format similar to the one below:

```json
{
   "ModuleName": "Time_extended",
   "ModuleIndex": "index.html",
   "BWsettings": {
      "width": 800,
      "height": 600,
      "webPreferences": {
         "nodeIntegration": true
      },
      "transparent": true,
      "frame": false,
      "titleBarStyle": "hidden",
      "skipTaskbar": true
   },
   "disableEditModeAtStartup": true,
   "openMaximized": false,
   "Xpos": 0,
   "Ypos": 0,
   "doLoad": true
}

```
# LightMeter Module Recognition Criteria

To ensure that LightMeter recognizes your module correctly, follow these criteria:

- __Module Folder__: The Widget __MUST__ be in the ```Modules``` folder. If you place it outside of this folder, it might not be recognized.
- __Module Name__: The Module name MUST be the same as the folder name in which you have placed the ```Data.json``` and ```index.html``` files.
- __Module Index__: The Module Index is used in case you want to change the file name from "index.html" to something else.

### Optional Settings

- ```width``` and ```height```: These settings do not necessarily need to be set to specific values. However, it is recommended to set them to somewhere around the size of your own widget to prevent problems with edit mode.
- ``` "transparent": true, "frame": false```: Use these settings to make the browser window transparent and display only the widget you created.

- _Other settings_: Other settings such as "titleBarStyle": "hidden", "skipTaskbar": true" are used to configure the widget itself so that the system does not display the windows in ALT+TAB or in the taskbar. It is generally recommended not to change these values since it might lead to graphic glitches.

- ```"disableEditModeAtStartup": true```: Use this setting if you want the widget in question to be executed as an interactive window as soon as the application runs. __Be careful! If any widget is in edit mode, you will not be able to click through them!__

- ```"openMaximized"```: This setting is used to maximize the window. It does not affect the functionality of the widgets themselves, but if you used other logic to move the widget around the window you might need the window to be maximized.
- ```Xpos``` and ```Ypos``` settings should __not__ be touched. These define where the window opens up on the screen. These values automatically update when you quit the application trought the "exit" button located on the tray icon; after moving the widgets, if you Alt+F4 the application or kill it's process, you will lose the position you just gave them and will have to reposition them again.
- ```"doLoad": true```: Use this setting in case you might want your widget not to be loaded from the application.
