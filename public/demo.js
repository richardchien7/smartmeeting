
(function() {
    document.getElementById("document")
        .addEventListener("change", handleFileSelect, false);
        
    function handleFileSelect(event) {
        readFileInputEventAsArrayBuffer(event, function(arrayBuffer) {
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
        var file = event.target.files[0];
        console.log("file:");
        console.log(file);
        console.log("event:");
        console.log(event);
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
