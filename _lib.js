#import '_sandbox.js'
var pluginPath = sketch.scriptPath.match( /(?:.*)(?:\/Plugins\/)(?:[^\/]*)(?:)/gm ); // ImageFiller's folder

function showError(msg){
  doc.showMessage(msg);
  return false;
}

function getImagesFromPath(imagesPath){

  if (imagesPath.slice(-1) != "/") imagesPath = imagesPath+"/"; // ugly fix for path concatenations
  new AppSandbox().authorize(imagesPath, run);
  
  function run(){
    var methodStart = [NSDate date];

    var usedImages = [];
    var selections = selection.count();
    if (selections == 0) showError("Oh! You need to select a few layers before running the plugin.");
    
    // Get all images from the folder and its subdirectories
    var fileManager = NSFileManager.defaultManager();
    fileManager.changeCurrentDirectoryPath(imagesPath);
    var enumerator = fileManager.enumeratorAtPath(imagesPath);
    var dirsNFiles = [[NSMutableArray alloc] init];
    while ((entry = [enumerator nextObject]) != null){
       if (fileManager.fileExistsAtPath(entry)) {
         dirsNFiles.addObject(entry);
       }
    }
    var extensions = [NSArray arrayWithObjects:@"png", @"PNG", @"jpg", @"JPG", @"jpeg", @"JPEG", @"gif", @"GIF", nil];
    var imagesFileNames = [dirsNFiles filteredArrayUsingPredicate:[NSPredicate predicateWithFormat:@"pathExtension IN %@", extensions]];
    var imgLen = imagesFileNames.count();
    if (imgLen == 0) showError("Hm. Couldn't find any images inside "+imagesPath+". You should add a few.");
   
    // apply images to selection
    var theimages = [[NSMutableArray alloc] init];
    theimages.addObjectsFromArray(imagesFileNames);

    for (var i=0; i < selections; i++){
      if (theimages.count() == 0) theimages.addObjectsFromArray(imagesFileNames);
      var layer = selection[i]
      var fills = layer.style().fills()
      var firstFill = fills.lastObject();
      if (fills.count() == 0) fills.addNewStylePart();
      firstFill.setFillType(4); 
      firstFill.setPatternFillType(1);
      var r = Math.floor(Math.random() * theimages.count());
      var fileName = imagesPath+theimages[r];
      if (fileManager.fileExistsAtPath(fileName)) {
        image = [[NSImage alloc] initWithContentsOfFile:fileName];
        firstFill.setPatternImage(image);
      }
      theimages.removeObjectAtIndex(r)
    }
   
    methodFinish = [NSDate date];
    log([methodFinish timeIntervalSinceDate:methodStart]); 
  }
}