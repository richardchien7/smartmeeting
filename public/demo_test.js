
(function() {
    document.getElementById("see")
        .addEventListener("click", handleFileSelect, false);
        
    function handleFileSelect(event) {
        readFileInputEventAsArrayBuffer(event, function(arrayBuffer) {
            console.log("arrayBuffer1:");
            console.log(arrayBuffer);
            mammoth.convertToHtml({arrayBuffer: arrayBuffer})
                .then(displayResult)
                .done();
        });
    }
    
    function displayResult(result) {
        document.getElementById("output").innerHTML = result.value;
    }
    
    function readFileInputEventAsArrayBuffer(event, callback) {
        //event.target.files[0].name = "案三資料.docx";
        console.log("file:");
        console.log(file);
        console.log("event:");
        console.log(event);
        var test = event.target.value;
        var file = []
        file.push(test);
       
        var reader = new FileReader();
        console.log("callback:"+callback);
        reader.onload = function(loadEvent) {
            console.log("loadEvent:");
            console.log(loadEvent);
            var arrayBuffer = loadEvent.target.result;
            console.log("arrayBuffer");
            console.log(arrayBuffer);
            callback(arrayBuffer);
        };
        
        reader.readAsArrayBuffer(file);
        console.log("1");
    }
})();
