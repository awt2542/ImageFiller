#ImageFiller for Sketch
This plugin makes it easy to automatically fill layers in Sketch with your own images. On each run, it will randomly fetch images from a folder you've populated and apply them to the layers in current your selection.

**Nice features:**

* Works great with both shapes/bitmaps
* Never picks the same photo twice (unless there are no more available in the folder)
* No coding required to add/remove images
* Use your own custom menu structure in Sketch by placing the .sketchplugin files in nested subdirectories (shouldn't break the code)
* Works fine with hundreds of images on a single run

##Installation
1. Open Sketch and choose Plugins > Reveal Plugins Folder
2. Download this project and place it inside the Plugins folder.
3. Select some layers in Sketch and run the plugin from the Plugins menu.

##How to add your own images
1. Create a subdirectory inside "/Photos" and add some images to it.
2. Duplicate one of the example .sketchplugin files and make sure it uses the exact same name as the subdirectory you just created.
3. Run it from the Plugins menu inside Sketch.

##How to remove the sample images
1. Delete the .sketchplugin file
2. Delete the corresponding folder under /Photos.

##Improve the code!
Feel free to post issues and send pull requests! Some parts are pretty ugly. Feel free to make those pretty.