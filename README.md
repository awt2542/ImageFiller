#ImageFiller for Sketch

This plugin makes it easy to automatically fill layers in Sketch with your own images. On each run, it will randomly fetch images from a folder you've populated and apply them to the layers in current your selection.

![example](http://cl.ly/image/0q200I0y081y/example.png)

**Nice features:**

* Designed to be modified! Example images included just to get you started
* Works great with both shapes/bitmap layers
* Never picks the same photo twice (unless there are no more available in the folder)
* No coding required to add/remove images
* Use your own custom menu structure in Sketch by placing the .sketchplugin files in nested subdirectories (shouldn't break the code)
* Works fine with hundreds of images on a single run

##Installation
1. Open Sketch and choose Plugins > Reveal Plugins Folder
1. [Download this project](https://github.com/awt2542/ImageFiller/archive/master.zip) and place the folder inside the Plugins directory.
1. Rename it to something prettier than "ImageFiller-master" (this will be the name of the menu item)
1. Select some layers in Sketch and run the plugin from the Plugins menu.

##How to add your own image catalogue
1. Create a subdirectory inside "/Photos" and add some images to it. Give it a name like "Product Photos"
1. Create a new .sketchplugin file with the following code:
```
	#import '_lib.js'
``` (or just duplicate one of the existing examples). Name it Product Photos.sketchplugin to match your folder in /Photos.
1. Open Sketch, select a few layers and go to Plugins > ImageFiller > Product Photos and voila!

##How to remove the example images
1. Delete the .sketchplugin file
1. Delete the corresponding folder under /Photos.

##Improve the code!
Feel free to post issues and send pull requests! Some parts are pretty ugly. Feel free to make those pretty.