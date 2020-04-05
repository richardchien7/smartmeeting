const testFolder = 'C:/Users/Admin/Desktop/wordmeeting';
const fs = require('fs');
var mammoth = require("mammoth");
var iconv = require('iconv-lite');
const admZip = require('adm-zip');
var filedata = new Array();
fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
   
    console.log("C:/Users/Admin/Desktop/wordmeeting/"+file);
    function test(){
    mammoth.extractRawText({ path: "C:/Users/Admin/Desktop/wordmeeting/"+file })
      .then(function (result) {
        var text = result.value; // The raw text 
       
        //console.log(text);
        filedata.push(text);
        console.log("file0:"+filedata[1]);
        // var messages = result.messages;
      }).done();
    }
    test();
      setTimeout(function() {console.log("file000:"+filedata[1])},10000);
    //console.log("file"+file);
    

  });
});
