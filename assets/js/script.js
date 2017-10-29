



// todo: ukryj sekcje z contentem, pokaz po uploadzie (upload ukryj)

/* Dropzone */

$(function() {
Dropzone.options.dropzoneElement = {
    maxFilesize: 500,
    autoProcessQueue: false,
    init: function() {

        var submitButton = document.querySelector("#btnUpload")
        myDropzone = this;

        submitButton.addEventListener("click", function() {

            /* Check if file is selected for upload */
            if (myDropzone.getUploadingFiles().length === 0 && myDropzone.getQueuedFiles().length === 0) {
                alert('No file selected for upload');
                return false;
            }
            else {
                /* Remove event listener and start processing */
                myDropzone.removeEventListeners();
                myDropzone.processQueue();

            }
        });


        /* On Success, do whatever you want */
        this.on("success", function(file, responseText) {
            alert('Success');
        });
    }
};
});

