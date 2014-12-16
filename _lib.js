function addImages(scriptPath){
  if (selection.count() == 0){
    [doc showMessage:"Oops! You need to select a few layers before running the script"]
    return false;
  }
  // find a subdirectory to "/photos" with the same name as the script
  var scriptName = scriptPath.substring(scriptPath.lastIndexOf('/'),scriptPath.lastIndexOf('.sketchplugin'))
  var pluginsPath = scriptPath.substring(0, scriptPath.indexOf('Plugins'))+"Plugins/";
  var pluginName = scriptPath.replace(pluginsPath,""))
  pluginName = pluginName.substring(0,pluginName.indexOf('/'))
  var imagesPath = pluginsPath + pluginName + "/photos" + scriptName + "/";
  var fileManager = NSFileManager.defaultManager();
  var extensions = [NSArray arrayWithObjects:@"png", @"PNG", @"jpg", @"JPG", @"jpeg", @"JPEG", @"gif", @"GIF", nil];
  if (!fileManager.fileExistsAtPath(imagesPath)){
    [doc showMessage:"Oops! Couldn't find folder /photos"+scriptName]
    return false;
  }
  var dirContents = [[NSFileManager defaultManager] contentsOfDirectoryAtPath:imagesPath error:nil];
  var imagesFileNames = [dirContents filteredArrayUsingPredicate:[NSPredicate predicateWithFormat:@"pathExtension IN %@", extensions]];
  var imgLen = imagesFileNames.count();
  var usedImages = [];

  function randomImage(){
    if (usedImages.length == imgLen){ 
        usedImages = []; // if all images has been used, reset the counter
    }
    var r = Math.floor(Math.random() * imgLen);
    var fileName = imagesPath+imagesFileNames[r];
    // if the image hasn't been used already
    if (usedImages.indexOf(fileName) == -1 ){
      usedImages.push(fileName);
      return fileName;
    } else {
      return randomImage()
    }
  }

  for (var i=0; i < selection.count(); i++){
    // change the layer's fill properties to accept image fills
    var layer = selection[i]
    if (layer.style().fills().count() == 0) {
      layer.style().fills().addNewStylePart();
    }
    var firstFill = layer.style().fills().lastObject();
    firstFill.setFillType(4); // set fill to "pattern" instead of eg. "color"
    firstFill.setPatternFillType(1); // set pattern type to "fill" instead of "tile"
    // find a random photo and fill the layer
    fileName = randomImage();
    if (fileManager.fileExistsAtPath(fileName)) {
      image = [[NSImage alloc] initWithContentsOfFile:fileName];
      firstFill.setPatternImage(image);
    }
  }
}