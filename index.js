const {
   app,
   BrowserWindow,
   Menu,
   Tray,
   nativeImage,
   screen,
} = require('electron');
const fs = require('fs');
const path = require('path');

const modules = [];

function SavePosition(modules) {
   modules.forEach((module) => {
      moduleWindow = module['module']['window'];
      moduleJsonDir = module['module']['JsonFile'];

      const Xpos = moduleWindow.getPosition()[0];
      const Ypos = moduleWindow.getPosition()[1];
      // Read the JSON file
      const jsonData = fs.readFileSync(moduleJsonDir);
      const data = JSON.parse(jsonData);

      // Update Xpos and Ypos values
      data.Xpos = Xpos;
      data.Ypos = Ypos;
      fs.writeFileSync(moduleJsonDir, JSON.stringify(data, null, 2));
   });
}

// Function to load and add module from JSON configuration
function LoadModule(JsonModuleFile) {
   try {
      const moduleConfig = JSON.parse(fs.readFileSync(JsonModuleFile, 'utf8'));
      let {
         ModuleName,
         ModuleIndex,
         BWsettings,
         disableEditModeAtStartup,
         openMaximized,
         Xpos,
         Ypos,
         doLoad,
      } = moduleConfig;
      if (doLoad) {
         if (openMaximized) {
            // Adjust window settings based on openMaximized property
            // Set width and height to the screen's dimensions
            const { width, height } = screen.getPrimaryDisplay().workAreaSize;
            BWsettings.width = width;
            BWsettings.height = height;

            BWsettings.maximizable = false; // Disable resizing when maximized
            BWsettings.fullscreen = false; // Not fullscreen
         }

         // Create and manage windows
         const moduleWindow = new BrowserWindow(BWsettings);
         moduleWindow.setPosition(Xpos, Ypos);
         moduleWindow.loadFile(`./Modules/${ModuleName}/${ModuleIndex}`);

         const module = {
            window: moduleWindow,
            isEditModeEnabled: disableEditModeAtStartup, // Initialize edit mode state
            JsonFile: JsonModuleFile,
         };

         if (disableEditModeAtStartup === true) {
            module.window.setIgnoreMouseEvents(true);
         }

         const moduleVisibilityToggle = {
            label: 'Enabled',
            type: 'checkbox',
            checked: true,
            click: () => {
               if (module.window.isVisible()) {
                  module.window.hide();
               } else {
                  module.window.show();
               }
            },
         };

         const moduleEditModeToggle = {
            label: 'Edit Mode',
            type: 'checkbox',
            checked: false,
            click: () => {
               if (disableEditModeAtStartup === true) {
                  module.window.setIgnoreMouseEvents(!disableEditModeAtStartup);
                  disableEditModeAtStartup = !disableEditModeAtStartup;
               } else {
                  module.window.setIgnoreMouseEvents(!disableEditModeAtStartup);
                  disableEditModeAtStartup = !disableEditModeAtStartup;
               }
            },
         };

         const moduleTitle = {
            type: 'normal',
            label: ModuleName,
         };

         const separator = {
            type: 'separator',
         };

         modules.push({
            module,
            moduleTitle,
            moduleVisibilityToggle,
            moduleEditModeToggle,
            separator,
         });
      }
   } catch (error) {
      console.error('Error loading module:', error.message);
   }
}

// Create tray menu
async function createTrayMenu() {
   // Add the Edit Mode item to the template
   const exitBtn = {
      label: 'Exit',
      click: () => {
         SavePosition(modules);
         app.quit();
      },
   };

   const reloadBtn = {
      label: 'Reload',
      click: () => {
         console.error('W.I.P');
      },
   };

   const template = [
      ...modules.flatMap((module) => [
         module.moduleTitle,
         module.moduleVisibilityToggle,
         module.moduleEditModeToggle,
         module.separator,
      ]),
      { type: 'separator' },
      reloadBtn,
      exitBtn,
   ];

   const contextMenu = Menu.buildFromTemplate(template);

   const iconPath = './Default.ico';
   const icon = nativeImage.createFromPath(iconPath);

   const tray = new Tray(icon);
   tray.setContextMenu(contextMenu);
   tray.setToolTip('LightMeter');
}

// Function to recursively search for Data.json files
function findDataFiles(directory) {
   let dataFiles = [];
   const contents = fs.readdirSync(directory);
   contents.forEach((item) => {
      const itemPath = path.join(directory, item);
      const stat = fs.statSync(itemPath);
      if (stat.isDirectory()) {
         dataFiles = dataFiles.concat(findDataFiles(itemPath));
      } else if (item.endsWith('Data.json')) {
         dataFiles.push(itemPath);
      }
   });
   return dataFiles;
}

app.whenReady().then(async () => {
   // Find all Data.json files recursively in the Modules directory
   const dataFiles = findDataFiles('./Modules');

   // Load all modules and collect promises
   const loadModulePromises = dataFiles.map((file) => LoadModule(file));

   // Wait for all modules to be loaded
   Promise.all(loadModulePromises)
      .then(createTrayMenu)
      .catch((error) => {
         console.error('Error loading modules:', error);
      });
});

app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') {
      SavePosition();
      app.quit();
   }
});
