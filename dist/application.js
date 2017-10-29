// "use strict";
//
// var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
//
// function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
//
// function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//
// function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
//
// /*
//  *
//  * More info at [www.dropzonejs.com](http://www.dropzonejs.com)
//  *
//  * Copyright (c) 2012, Matias Meno
//  *
//  * Permission is hereby granted, free of charge, to any person obtaining a copy
//  * of this software and associated documentation files (the "Software"), to deal
//  * in the Software without restriction, including without limitation the rights
//  * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  * copies of the Software, and to permit persons to whom the Software is
//  * furnished to do so, subject to the following conditions:
//  *
//  * The above copyright notice and this permission notice shall be included in
//  * all copies or substantial portions of the Software.
//  *
//  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//  * THE SOFTWARE.
//  *
//  */
//
// // The Emitter class provides the ability to call `.on()` on Dropzone to listen
// // to events.
// // It is strongly based on component's emitter class, and I removed the
// // functionality because of the dependency hell with different frameworks.
// var Emitter = function () {
//   function Emitter() {
//     _classCallCheck(this, Emitter);
//   }
//
//   _createClass(Emitter, [{
//     key: "on",
//
//     // Add an event listener for given event
//     value: function on(event, fn) {
//       this._callbacks = this._callbacks || {};
//       // Create namespace for this event
//       if (!this._callbacks[event]) {
//         this._callbacks[event] = [];
//       }
//       this._callbacks[event].push(fn);
//       return this;
//     }
//   }, {
//     key: "emit",
//     value: function emit(event) {
//       this._callbacks = this._callbacks || {};
//       var callbacks = this._callbacks[event];
//
//       if (callbacks) {
//         for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
//           args[_key - 1] = arguments[_key];
//         }
//
//         for (var _iterator = callbacks, _isArray = true, _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
//           var _ref;
//
//           if (_isArray) {
//             if (_i >= _iterator.length) break;
//             _ref = _iterator[_i++];
//           } else {
//             _i = _iterator.next();
//             if (_i.done) break;
//             _ref = _i.value;
//           }
//
//           var callback = _ref;
//
//           callback.apply(this, args);
//         }
//       }
//
//       return this;
//     }
//
//     // Remove event listener for given event. If fn is not provided, all event
//     // listeners for that event will be removed. If neither is provided, all
//     // event listeners will be removed.
//
//   }, {
//     key: "off",
//     value: function off(event, fn) {
//       if (!this._callbacks || arguments.length === 0) {
//         this._callbacks = {};
//         return this;
//       }
//
//       // specific event
//       var callbacks = this._callbacks[event];
//       if (!callbacks) {
//         return this;
//       }
//
//       // remove all handlers
//       if (arguments.length === 1) {
//         delete this._callbacks[event];
//         return this;
//       }
//
//       // remove specific handler
//       for (var i = 0; i < callbacks.length; i++) {
//         var callback = callbacks[i];
//         if (callback === fn) {
//           callbacks.splice(i, 1);
//           break;
//         }
//       }
//
//       return this;
//     }
//   }]);
//
//   return Emitter;
// }();
//
// var Dropzone = function (_Emitter) {
//   _inherits(Dropzone, _Emitter);
//
//   _createClass(Dropzone, null, [{
//     key: "initClass",
//     value: function initClass() {
//
//       // Exposing the emitter class, mainly for tests
//       this.prototype.Emitter = Emitter;
//
//       /*
//        This is a list of all available events you can register on a dropzone object.
//         You can register an event handler like this:
//         dropzone.on("dragEnter", function() { });
//         */
//       this.prototype.events = ["drop", "dragstart", "dragend", "dragenter", "dragover", "dragleave", "addedfile", "addedfiles", "removedfile", "thumbnail", "error", "errormultiple", "processing", "processingmultiple", "uploadprogress", "totaluploadprogress", "sending", "sendingmultiple", "success", "successmultiple", "canceled", "canceledmultiple", "complete", "completemultiple", "reset", "maxfilesexceeded", "maxfilesreached", "queuecomplete"];
//
//       this.prototype.defaultOptions = {
//         /**
//          * Has to be specified on elements other than form (or when the form
//          * doesn't have an `action` attribute). You can also
//          * provide a function that will be called with `files` and
//          * must return the url (since `v3.12.0`)
//          */
//         url: null,
//
//         /**
//          * Can be changed to `"put"` if necessary. You can also provide a function
//          * that will be called with `files` and must return the method (since `v3.12.0`).
//          */
//         method: "post",
//
//         /**
//          * Will be set on the XHRequest.
//          */
//         withCredentials: false,
//
//         /**
//          * The timeout for the XHR requests in milliseconds (since `v4.4.0`).
//          */
//         timeout: 30000,
//
//         /**
//          * How many file uploads to process in parallel (See the
//          * Enqueuing file uploads* documentation section for more info)
//          */
//         parallelUploads: 2,
//
//         /**
//          * Whether to send multiple files in one request. If
//          * this it set to true, then the fallback file input element will
//          * have the `multiple` attribute as well. This option will
//          * also trigger additional events (like `processingmultiple`). See the events
//          * documentation section for more information.
//          */
//         uploadMultiple: false,
//
//         /**
//          * Whether you want files to be uploaded in chunks to your server. This can't be
//          * used in combination with `uploadMultiple`.
//          *
//          * See [chunksUploaded](#config-chunksUploaded) for the callback to finalise an upload.
//          */
//         chunking: false,
//
//         /**
//          * If `chunking` is enabled, this defines whether **every** file should be chunked,
//          * even if the file size is below chunkSize. This means, that the additional chunk
//          * form data will be submitted and the `chunksUploaded` callback will be invoked.
//          */
//         forceChunking: false,
//
//         /**
//          * If `chunking` is `true`, then this defines the chunk size in bytes.
//          */
//         chunkSize: 2000000,
//
//         /**
//          * If `true`, the individual chunks of a file are being uploaded simultaneously.
//          */
//         parallelChunkUploads: false,
//
//         /**
//          * Whether a chunk should be retried if it fails.
//          */
//         retryChunks: false,
//
//         /**
//          * If `retryChunks` is true, how many times should it be retried.
//          */
//         retryChunksLimit: 3,
//
//         /**
//          * If not `null` defines how many files this Dropzone handles. If it exceeds,
//          * the event `maxfilesexceeded` will be called. The dropzone element gets the
//          * class `dz-max-files-reached` accordingly so you can provide visual feedback.
//          */
//         maxFilesize: 256,
//
//         /**
//          * The name of the file param that gets transferred.
//          * **NOTE**: If you have the option  `uploadMultiple` set to `true`, then
//          * Dropzone will append `[]` to the name.
//          */
//         paramName: "file",
//
//         /**
//          * Whether thumbnails for images should be generated
//          */
//         createImageThumbnails: true,
//
//         /**
//          * In MB. When the filename exceeds this limit, the thumbnail will not be generated.
//          */
//         maxThumbnailFilesize: 10,
//
//         /**
//          * If `null`, the ratio of the image will be used to calculate it.
//          */
//         thumbnailWidth: 120,
//
//         /**
//          * The same as `thumbnailWidth`. If both are null, images will not be resized.
//          */
//         thumbnailHeight: 120,
//
//         /**
//          * How the images should be scaled down in case both, `thumbnailWidth` and `thumbnailHeight` are provided.
//          * Can be either `contain` or `crop`.
//          */
//         thumbnailMethod: 'crop',
//
//         /**
//          * If set, images will be resized to these dimensions before being **uploaded**.
//          * If only one, `resizeWidth` **or** `resizeHeight` is provided, the original aspect
//          * ratio of the file will be preserved.
//          *
//          * The `options.transformFile` function uses these options, so if the `transformFile` function
//          * is overridden, these options don't do anything.
//          */
//         resizeWidth: null,
//
//         /**
//          * See `resizeWidth`.
//          */
//         resizeHeight: null,
//
//         /**
//          * The mime type of the resized image (before it gets uploaded to the server).
//          * If `null` the original mime type will be used. To force jpeg, for example, use `image/jpeg`.
//          * See `resizeWidth` for more information.
//          */
//         resizeMimeType: null,
//
//         /**
//          * The quality of the resized images. See `resizeWidth`.
//          */
//         resizeQuality: 0.8,
//
//         /**
//          * How the images should be scaled down in case both, `resizeWidth` and `resizeHeight` are provided.
//          * Can be either `contain` or `crop`.
//          */
//         resizeMethod: 'contain',
//
//         /**
//          * The base that is used to calculate the filesize. You can change this to
//          * 1024 if you would rather display kibibytes, mebibytes, etc...
//          * 1024 is technically incorrect, because `1024 bytes` are `1 kibibyte` not `1 kilobyte`.
//          * You can change this to `1024` if you don't care about validity.
//          */
//         filesizeBase: 1000,
//
//         /**
//          * Can be used to limit the maximum number of files that will be handled by this Dropzone
//          */
//         maxFiles: null,
//
//         /**
//          * An optional object to send additional headers to the server. Eg:
//          * `{ "My-Awesome-Header": "header value" }`
//          */
//         headers: null,
//
//         /**
//          * If `true`, the dropzone element itself will be clickable, if `false`
//          * nothing will be clickable.
//          *
//          * You can also pass an HTML element, a CSS selector (for multiple elements)
//          * or an array of those. In that case, all of those elements will trigger an
//          * upload when clicked.
//          */
//         clickable: true,
//
//         /**
//          * Whether hidden files in directories should be ignored.
//          */
//         ignoreHiddenFiles: true,
//
//         /**
//          * The default implementation of `accept` checks the file's mime type or
//          * extension against this list. This is a comma separated list of mime
//          * types or file extensions.
//          *
//          * Eg.: `image/*,application/pdf,.psd`
//          *
//          * If the Dropzone is `clickable` this option will also be used as
//          * [`accept`](https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-accept)
//          * parameter on the hidden file input as well.
//          */
//         acceptedFiles: null,
//
//         /**
//          * **Deprecated!**
//          * Use acceptedFiles instead.
//          */
//         acceptedMimeTypes: null,
//
//         /**
//          * If false, files will be added to the queue but the queue will not be
//          * processed automatically.
//          * This can be useful if you need some additional user input before sending
//          * files (or if you want want all files sent at once).
//          * If you're ready to send the file simply call `myDropzone.processQueue()`.
//          *
//          * See the [enqueuing file uploads](#enqueuing-file-uploads) documentation
//          * section for more information.
//          */
//         autoProcessQueue: true,
//
//         /**
//          * If false, files added to the dropzone will not be queued by default.
//          * You'll have to call `enqueueFile(file)` manually.
//          */
//         autoQueue: true,
//
//         /**
//          * If `true`, this will add a link to every file preview to remove or cancel (if
//          * already uploading) the file. The `dictCancelUpload`, `dictCancelUploadConfirmation`
//          * and `dictRemoveFile` options are used for the wording.
//          */
//         addRemoveLinks: false,
//
//         /**
//          * Defines where to display the file previews – if `null` the
//          * Dropzone element itself is used. Can be a plain `HTMLElement` or a CSS
//          * selector. The element should have the `dropzone-previews` class so
//          * the previews are displayed properly.
//          */
//         previewsContainer: null,
//
//         /**
//          * This is the element the hidden input field (which is used when clicking on the
//          * dropzone to trigger file selection) will be appended to. This might
//          * be important in case you use frameworks to switch the content of your page.
//          */
//         hiddenInputContainer: "body",
//
//         /**
//          * If null, no capture type will be specified
//          * If camera, mobile devices will skip the file selection and choose camera
//          * If microphone, mobile devices will skip the file selection and choose the microphone
//          * If camcorder, mobile devices will skip the file selection and choose the camera in video mode
//          * On apple devices multiple must be set to false.  AcceptedFiles may need to
//          * be set to an appropriate mime type (e.g. "image/*", "audio/*", or "video/*").
//          */
//         capture: null,
//
//         /**
//          * **Deprecated**. Use `renameFile` instead.
//          */
//         renameFilename: null,
//
//         /**
//          * A function that is invoked before the file is uploaded to the server and renames the file.
//          * This function gets the `File` as argument and can use the `file.name`. The actual name of the
//          * file that gets used during the upload can be accessed through `file.upload.filename`.
//          */
//         renameFile: null,
//
//         /**
//          * If `true` the fallback will be forced. This is very useful to test your server
//          * implementations first and make sure that everything works as
//          * expected without dropzone if you experience problems, and to test
//          * how your fallbacks will look.
//          */
//         forceFallback: false,
//
//         /**
//          * The text used before any files are dropped.
//          */
//         dictDefaultMessage: "Drop files here to upload",
//
//         /**
//          * The text that replaces the default message text it the browser is not supported.
//          */
//         dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",
//
//         /**
//          * The text that will be added before the fallback form.
//          * If you provide a  fallback element yourself, or if this option is `null` this will
//          * be ignored.
//          */
//         dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
//
//         /**
//          * If the filesize is too big.
//          * `{{filesize}}` and `{{maxFilesize}}` will be replaced with the respective configuration values.
//          */
//         dictFileTooBig: "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",
//
//         /**
//          * If the file doesn't match the file type.
//          */
//         dictInvalidFileType: "You can't upload files of this type.",
//
//         /**
//          * If the server response was invalid.
//          * `{{statusCode}}` will be replaced with the servers status code.
//          */
//         dictResponseError: "Server responded with {{statusCode}} code.",
//
//         /**
//          * If `addRemoveLinks` is true, the text to be used for the cancel upload link.
//          */
//         dictCancelUpload: "Cancel upload",
//
//         /**
//          * If `addRemoveLinks` is true, the text to be used for confirmation when cancelling upload.
//          */
//         dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?",
//
//         /**
//          * If `addRemoveLinks` is true, the text to be used to remove a file.
//          */
//         dictRemoveFile: "Remove file",
//
//         /**
//          * If this is not null, then the user will be prompted before removing a file.
//          */
//         dictRemoveFileConfirmation: null,
//
//         /**
//          * Displayed if `maxFiles` is st and exceeded.
//          * The string `{{maxFiles}}` will be replaced by the configuration value.
//          */
//         dictMaxFilesExceeded: "You can not upload any more files.",
//
//         /**
//          * Allows you to translate the different units. Starting with `tb` for terabytes and going down to
//          * `b` for bytes.
//          */
//         dictFileSizeUnits: { tb: "TB", gb: "GB", mb: "MB", kb: "KB", b: "b" },
//
//         /**
//          * Called when dropzone initialized
//          * You can add event listeners here
//          */
//         init: function init() {},
//
//
//         /**
//          * Can be an **object** of additional parameters to transfer to the server, **or** a `Function`
//          * that gets invoked with the `files`, `xhr` and, if it's a chunked upload, `chunk` arguments. In case
//          * of a function, this needs to return a map.
//          *
//          * The default implementation does nothing for normal uploads, but adds relevant information for
//          * chunked uploads.
//          *
//          * This is the same as adding hidden input fields in the form element.
//          */
//         params: function params(files, xhr, chunk) {
//           if (chunk) {
//             return {
//               dzuuid: chunk.file.upload.uuid,
//               dzchunkindex: chunk.index,
//               dztotalfilesize: chunk.file.size,
//               dzchunksize: this.options.chunkSize,
//               dztotalchunkcount: chunk.file.upload.totalChunkCount,
//               dzchunkbyteoffset: chunk.index * this.options.chunkSize
//             };
//           }
//         },
//
//
//         /**
//          * A function that gets a [file](https://developer.mozilla.org/en-US/docs/DOM/File)
//          * and a `done` function as parameters.
//          *
//          * If the done function is invoked without arguments, the file is "accepted" and will
//          * be processed. If you pass an error message, the file is rejected, and the error
//          * message will be displayed.
//          * This function will not be called if the file is too big or doesn't match the mime types.
//          */
//         accept: function accept(file, done) {
//           return done();
//         },
//
//
//         /**
//          * The callback that will be invoked when all chunks have been uploaded for a file.
//          * It gets the file for which the chunks have been uploaded as the first parameter,
//          * and the `done` function as second. `done()` needs to be invoked when everything
//          * needed to finish the upload process is done.
//          */
//         chunksUploaded: function chunksUploaded(file, done) {
//           done();
//         },
//
//         /**
//          * Gets called when the browser is not supported.
//          * The default implementation shows the fallback input field and adds
//          * a text.
//          */
//         fallback: function fallback() {
//           // This code should pass in IE7... :(
//           var messageElement = void 0;
//           this.element.className = this.element.className + " dz-browser-not-supported";
//
//           for (var _iterator2 = this.element.getElementsByTagName("div"), _isArray2 = true, _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
//             var _ref2;
//
//             if (_isArray2) {
//               if (_i2 >= _iterator2.length) break;
//               _ref2 = _iterator2[_i2++];
//             } else {
//               _i2 = _iterator2.next();
//               if (_i2.done) break;
//               _ref2 = _i2.value;
//             }
//
//             var child = _ref2;
//
//             if (/(^| )dz-message($| )/.test(child.className)) {
//               messageElement = child;
//               child.className = "dz-message"; // Removes the 'dz-default' class
//               break;
//             }
//           }
//           if (!messageElement) {
//             messageElement = Dropzone.createElement("<div class=\"dz-message\"><span></span></div>");
//             this.element.appendChild(messageElement);
//           }
//
//           var span = messageElement.getElementsByTagName("span")[0];
//           if (span) {
//             if (span.textContent != null) {
//               span.textContent = this.options.dictFallbackMessage;
//             } else if (span.innerText != null) {
//               span.innerText = this.options.dictFallbackMessage;
//             }
//           }
//
//           return this.element.appendChild(this.getFallbackForm());
//         },
//
//
//         /**
//          * Gets called to calculate the thumbnail dimensions.
//          *
//          * It gets `file`, `width` and `height` (both may be `null`) as parameters and must return an object containing:
//          *
//          *  - `srcWidth` & `srcHeight` (required)
//          *  - `trgWidth` & `trgHeight` (required)
//          *  - `srcX` & `srcY` (optional, default `0`)
//          *  - `trgX` & `trgY` (optional, default `0`)
//          *
//          * Those values are going to be used by `ctx.drawImage()`.
//          */
//         resize: function resize(file, width, height, resizeMethod) {
//           var info = {
//             srcX: 0,
//             srcY: 0,
//             srcWidth: file.width,
//             srcHeight: file.height
//           };
//
//           var srcRatio = file.width / file.height;
//
//           // Automatically calculate dimensions if not specified
//           if (width == null && height == null) {
//             width = info.srcWidth;
//             height = info.srcHeight;
//           } else if (width == null) {
//             width = height * srcRatio;
//           } else if (height == null) {
//             height = width / srcRatio;
//           }
//
//           // Make sure images aren't upscaled
//           width = Math.min(width, info.srcWidth);
//           height = Math.min(height, info.srcHeight);
//
//           var trgRatio = width / height;
//
//           if (info.srcWidth > width || info.srcHeight > height) {
//             // Image is bigger and needs rescaling
//             if (resizeMethod === 'crop') {
//               if (srcRatio > trgRatio) {
//                 info.srcHeight = file.height;
//                 info.srcWidth = info.srcHeight * trgRatio;
//               } else {
//                 info.srcWidth = file.width;
//                 info.srcHeight = info.srcWidth / trgRatio;
//               }
//             } else if (resizeMethod === 'contain') {
//               // Method 'contain'
//               if (srcRatio > trgRatio) {
//                 height = width / srcRatio;
//               } else {
//                 width = height * srcRatio;
//               }
//             } else {
//               throw new Error("Unknown resizeMethod '" + resizeMethod + "'");
//             }
//           }
//
//           info.srcX = (file.width - info.srcWidth) / 2;
//           info.srcY = (file.height - info.srcHeight) / 2;
//
//           info.trgWidth = width;
//           info.trgHeight = height;
//
//           return info;
//         },
//
//
//         /**
//          * Can be used to transform the file (for example, resize an image if necessary).
//          *
//          * The default implementation uses `resizeWidth` and `resizeHeight` (if provided) and resizes
//          * images according to those dimensions.
//          *
//          * Gets the `file` as the first parameter, and a `done()` function as the second, that needs
//          * to be invoked with the file when the transformation is done.
//          */
//         transformFile: function transformFile(file, done) {
//           if ((this.options.resizeWidth || this.options.resizeHeight) && file.type.match(/image.*/)) {
//             return this.resizeImage(file, this.options.resizeWidth, this.options.resizeHeight, this.options.resizeMethod, done);
//           } else {
//             return done(file);
//           }
//         },
//
//
//         /**
//          * A string that contains the template used for each dropped
//          * file. Change it to fulfill your needs but make sure to properly
//          * provide all elements.
//          *
//          * If you want to use an actual HTML element instead of providing a String
//          * as a config option, you could create a div with the id `tpl`,
//          * put the template inside it and provide the element like this:
//          *
//          *     document
//          *       .querySelector('#tpl')
//          *       .innerHTML
//          *
//          */
//         previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-image\"><img data-dz-thumbnail /></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size></span></div>\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n      <title>Check</title>\n      <defs></defs>\n      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n      </g>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n      <title>Error</title>\n      <defs></defs>\n      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <g id=\"Check-+-Oval-2\" sketch:type=\"MSLayerGroup\" stroke=\"#747474\" stroke-opacity=\"0.198794158\" fill=\"#FFFFFF\" fill-opacity=\"0.816519475\">\n          <path d=\"M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" sketch:type=\"MSShapeGroup\"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>",
//
//         // END OPTIONS
//         // (Required by the dropzone documentation parser)
//
//
//         /*
//          Those functions register themselves to the events on init and handle all
//          the user interface specific stuff. Overwriting them won't break the upload
//          but can break the way it's displayed.
//          You can overwrite them if you don't like the default behavior. If you just
//          want to add an additional event handler, register it on the dropzone object
//          and don't overwrite those options.
//          */
//
//         // Those are self explanatory and simply concern the DragnDrop.
//         drop: function drop(e) {
//           return this.element.classList.remove("dz-drag-hover");
//         },
//         dragstart: function dragstart(e) {},
//         dragend: function dragend(e) {
//           return this.element.classList.remove("dz-drag-hover");
//         },
//         dragenter: function dragenter(e) {
//           return this.element.classList.add("dz-drag-hover");
//         },
//         dragover: function dragover(e) {
//           return this.element.classList.add("dz-drag-hover");
//         },
//         dragleave: function dragleave(e) {
//           return this.element.classList.remove("dz-drag-hover");
//         },
//         paste: function paste(e) {},
//
//
//         // Called whenever there are no files left in the dropzone anymore, and the
//         // dropzone should be displayed as if in the initial state.
//         reset: function reset() {
//           return this.element.classList.remove("dz-started");
//         },
//
//
//         // Called when a file is added to the queue
//         // Receives `file`
//         addedfile: function addedfile(file) {
//           var _this2 = this;
//
//           if (this.element === this.previewsContainer) {
//             this.element.classList.add("dz-started");
//           }
//
//           if (this.previewsContainer) {
//             file.previewElement = Dropzone.createElement(this.options.previewTemplate.trim());
//             file.previewTemplate = file.previewElement; // Backwards compatibility
//
//             this.previewsContainer.appendChild(file.previewElement);
//             for (var _iterator3 = file.previewElement.querySelectorAll("[data-dz-name]"), _isArray3 = true, _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
//               var _ref3;
//
//               if (_isArray3) {
//                 if (_i3 >= _iterator3.length) break;
//                 _ref3 = _iterator3[_i3++];
//               } else {
//                 _i3 = _iterator3.next();
//                 if (_i3.done) break;
//                 _ref3 = _i3.value;
//               }
//
//               var node = _ref3;
//
//               node.textContent = file.name;
//             }
//             for (var _iterator4 = file.previewElement.querySelectorAll("[data-dz-size]"), _isArray4 = true, _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
//               if (_isArray4) {
//                 if (_i4 >= _iterator4.length) break;
//                 node = _iterator4[_i4++];
//               } else {
//                 _i4 = _iterator4.next();
//                 if (_i4.done) break;
//                 node = _i4.value;
//               }
//
//               node.innerHTML = this.filesize(file.size);
//             }
//
//             if (this.options.addRemoveLinks) {
//               file._removeLink = Dropzone.createElement("<a class=\"dz-remove\" href=\"javascript:undefined;\" data-dz-remove>" + this.options.dictRemoveFile + "</a>");
//               file.previewElement.appendChild(file._removeLink);
//             }
//
//             var removeFileEvent = function removeFileEvent(e) {
//               e.preventDefault();
//               e.stopPropagation();
//               if (file.status === Dropzone.UPLOADING) {
//                 return Dropzone.confirm(_this2.options.dictCancelUploadConfirmation, function () {
//                   return _this2.removeFile(file);
//                 });
//               } else {
//                 if (_this2.options.dictRemoveFileConfirmation) {
//                   return Dropzone.confirm(_this2.options.dictRemoveFileConfirmation, function () {
//                     return _this2.removeFile(file);
//                   });
//                 } else {
//                   return _this2.removeFile(file);
//                 }
//               }
//             };
//
//             for (var _iterator5 = file.previewElement.querySelectorAll("[data-dz-remove]"), _isArray5 = true, _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
//               var _ref4;
//
//               if (_isArray5) {
//                 if (_i5 >= _iterator5.length) break;
//                 _ref4 = _iterator5[_i5++];
//               } else {
//                 _i5 = _iterator5.next();
//                 if (_i5.done) break;
//                 _ref4 = _i5.value;
//               }
//
//               var removeLink = _ref4;
//
//               removeLink.addEventListener("click", removeFileEvent);
//             }
//           }
//         },
//
//
//         // Called whenever a file is removed.
//         removedfile: function removedfile(file) {
//           if (file.previewElement != null && file.previewElement.parentNode != null) {
//             file.previewElement.parentNode.removeChild(file.previewElement);
//           }
//           return this._updateMaxFilesReachedClass();
//         },
//
//
//         // Called when a thumbnail has been generated
//         // Receives `file` and `dataUrl`
//         thumbnail: function thumbnail(file, dataUrl) {
//           if (file.previewElement) {
//             file.previewElement.classList.remove("dz-file-preview");
//             for (var _iterator6 = file.previewElement.querySelectorAll("[data-dz-thumbnail]"), _isArray6 = true, _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
//               var _ref5;
//
//               if (_isArray6) {
//                 if (_i6 >= _iterator6.length) break;
//                 _ref5 = _iterator6[_i6++];
//               } else {
//                 _i6 = _iterator6.next();
//                 if (_i6.done) break;
//                 _ref5 = _i6.value;
//               }
//
//               var thumbnailElement = _ref5;
//
//               thumbnailElement.alt = file.name;
//               thumbnailElement.src = dataUrl;
//             }
//
//             return setTimeout(function () {
//               return file.previewElement.classList.add("dz-image-preview");
//             }, 1);
//           }
//         },
//
//
//         // Called whenever an error occurs
//         // Receives `file` and `message`
//         error: function error(file, message) {
//           if (file.previewElement) {
//             file.previewElement.classList.add("dz-error");
//             if (typeof message !== "String" && message.error) {
//               message = message.error;
//             }
//             for (var _iterator7 = file.previewElement.querySelectorAll("[data-dz-errormessage]"), _isArray7 = true, _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
//               var _ref6;
//
//               if (_isArray7) {
//                 if (_i7 >= _iterator7.length) break;
//                 _ref6 = _iterator7[_i7++];
//               } else {
//                 _i7 = _iterator7.next();
//                 if (_i7.done) break;
//                 _ref6 = _i7.value;
//               }
//
//               var node = _ref6;
//
//               node.textContent = message;
//             }
//           }
//         },
//         errormultiple: function errormultiple() {},
//
//
//         // Called when a file gets processed. Since there is a cue, not all added
//         // files are processed immediately.
//         // Receives `file`
//         processing: function processing(file) {
//           if (file.previewElement) {
//             file.previewElement.classList.add("dz-processing");
//             if (file._removeLink) {
//               return file._removeLink.textContent = this.options.dictCancelUpload;
//             }
//           }
//         },
//         processingmultiple: function processingmultiple() {},
//
//
//         // Called whenever the upload progress gets updated.
//         // Receives `file`, `progress` (percentage 0-100) and `bytesSent`.
//         // To get the total number of bytes of the file, use `file.size`
//         uploadprogress: function uploadprogress(file, progress, bytesSent) {
//           if (file.previewElement) {
//             for (var _iterator8 = file.previewElement.querySelectorAll("[data-dz-uploadprogress]"), _isArray8 = true, _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
//               var _ref7;
//
//               if (_isArray8) {
//                 if (_i8 >= _iterator8.length) break;
//                 _ref7 = _iterator8[_i8++];
//               } else {
//                 _i8 = _iterator8.next();
//                 if (_i8.done) break;
//                 _ref7 = _i8.value;
//               }
//
//               var node = _ref7;
//
//               node.nodeName === 'PROGRESS' ? node.value = progress : node.style.width = progress + "%";
//             }
//           }
//         },
//
//
//         // Called whenever the total upload progress gets updated.
//         // Called with totalUploadProgress (0-100), totalBytes and totalBytesSent
//         totaluploadprogress: function totaluploadprogress() {},
//
//
//         // Called just before the file is sent. Gets the `xhr` object as second
//         // parameter, so you can modify it (for example to add a CSRF token) and a
//         // `formData` object to add additional information.
//         sending: function sending() {},
//         sendingmultiple: function sendingmultiple() {},
//
//
//         // When the complete upload is finished and successful
//         // Receives `file`
//         success: function success(file) {
//           if (file.previewElement) {
//             return file.previewElement.classList.add("dz-success");
//           }
//         },
//         successmultiple: function successmultiple() {},
//
//
//         // When the upload is canceled.
//         canceled: function canceled(file) {
//           return this.emit("error", file, "Upload canceled.");
//         },
//         canceledmultiple: function canceledmultiple() {},
//
//
//         // When the upload is finished, either with success or an error.
//         // Receives `file`
//         complete: function complete(file) {
//           if (file._removeLink) {
//             file._removeLink.textContent = this.options.dictRemoveFile;
//           }
//           if (file.previewElement) {
//             return file.previewElement.classList.add("dz-complete");
//           }
//         },
//         completemultiple: function completemultiple() {},
//         maxfilesexceeded: function maxfilesexceeded() {},
//         maxfilesreached: function maxfilesreached() {},
//         queuecomplete: function queuecomplete() {},
//         addedfiles: function addedfiles() {}
//       };
//
//       this.prototype._thumbnailQueue = [];
//       this.prototype._processingThumbnail = false;
//     }
//
//     // global utility
//
//   }, {
//     key: "extend",
//     value: function extend(target) {
//       for (var _len2 = arguments.length, objects = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
//         objects[_key2 - 1] = arguments[_key2];
//       }
//
//       for (var _iterator9 = objects, _isArray9 = true, _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
//         var _ref8;
//
//         if (_isArray9) {
//           if (_i9 >= _iterator9.length) break;
//           _ref8 = _iterator9[_i9++];
//         } else {
//           _i9 = _iterator9.next();
//           if (_i9.done) break;
//           _ref8 = _i9.value;
//         }
//
//         var object = _ref8;
//
//         for (var key in object) {
//           var val = object[key];
//           target[key] = val;
//         }
//       }
//       return target;
//     }
//   }]);
//
//   function Dropzone(el, options) {
//     _classCallCheck(this, Dropzone);
//
//     var _this = _possibleConstructorReturn(this, (Dropzone.__proto__ || Object.getPrototypeOf(Dropzone)).call(this));
//
//     var fallback = void 0,
//         left = void 0;
//     _this.element = el;
//     // For backwards compatibility since the version was in the prototype previously
//     _this.version = Dropzone.version;
//
//     _this.defaultOptions.previewTemplate = _this.defaultOptions.previewTemplate.replace(/\n*/g, "");
//
//     _this.clickableElements = [];
//     _this.listeners = [];
//     _this.files = []; // All files
//
//     if (typeof _this.element === "string") {
//       _this.element = document.querySelector(_this.element);
//     }
//
//     // Not checking if instance of HTMLElement or Element since IE9 is extremely weird.
//     if (!_this.element || _this.element.nodeType == null) {
//       throw new Error("Invalid dropzone element.");
//     }
//
//     if (_this.element.dropzone) {
//       throw new Error("Dropzone already attached.");
//     }
//
//     // Now add this dropzone to the instances.
//     Dropzone.instances.push(_this);
//
//     // Put the dropzone inside the element itself.
//     _this.element.dropzone = _this;
//
//     var elementOptions = (left = Dropzone.optionsForElement(_this.element)) != null ? left : {};
//
//     _this.options = Dropzone.extend({}, _this.defaultOptions, elementOptions, options != null ? options : {});
//
//     // If the browser failed, just call the fallback and leave
//     if (_this.options.forceFallback || !Dropzone.isBrowserSupported()) {
//       var _ret;
//
//       return _ret = _this.options.fallback.call(_this), _possibleConstructorReturn(_this, _ret);
//     }
//
//     // @options.url = @element.getAttribute "action" unless @options.url?
//     if (_this.options.url == null) {
//       _this.options.url = _this.element.getAttribute("action");
//     }
//
//     if (!_this.options.url) {
//       throw new Error("No URL provided.");
//     }
//
//     if (_this.options.acceptedFiles && _this.options.acceptedMimeTypes) {
//       throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");
//     }
//
//     if (_this.options.uploadMultiple && _this.options.chunking) {
//       throw new Error('You cannot set both: uploadMultiple and chunking.');
//     }
//
//     // Backwards compatibility
//     if (_this.options.acceptedMimeTypes) {
//       _this.options.acceptedFiles = _this.options.acceptedMimeTypes;
//       delete _this.options.acceptedMimeTypes;
//     }
//
//     // Backwards compatibility
//     if (_this.options.renameFilename != null) {
//       _this.options.renameFile = function (file) {
//         return _this.options.renameFilename.call(_this, file.name, file);
//       };
//     }
//
//     _this.options.method = _this.options.method.toUpperCase();
//
//     if ((fallback = _this.getExistingFallback()) && fallback.parentNode) {
//       // Remove the fallback
//       fallback.parentNode.removeChild(fallback);
//     }
//
//     // Display previews in the previewsContainer element or the Dropzone element unless explicitly set to false
//     if (_this.options.previewsContainer !== false) {
//       if (_this.options.previewsContainer) {
//         _this.previewsContainer = Dropzone.getElement(_this.options.previewsContainer, "previewsContainer");
//       } else {
//         _this.previewsContainer = _this.element;
//       }
//     }
//
//     if (_this.options.clickable) {
//       if (_this.options.clickable === true) {
//         _this.clickableElements = [_this.element];
//       } else {
//         _this.clickableElements = Dropzone.getElements(_this.options.clickable, "clickable");
//       }
//     }
//
//     _this.init();
//     return _this;
//   }
//
//   // Returns all files that have been accepted
//
//
//   _createClass(Dropzone, [{
//     key: "getAcceptedFiles",
//     value: function getAcceptedFiles() {
//       return this.files.filter(function (file) {
//         return file.accepted;
//       }).map(function (file) {
//         return file;
//       });
//     }
//
//     // Returns all files that have been rejected
//     // Not sure when that's going to be useful, but added for completeness.
//
//   }, {
//     key: "getRejectedFiles",
//     value: function getRejectedFiles() {
//       return this.files.filter(function (file) {
//         return !file.accepted;
//       }).map(function (file) {
//         return file;
//       });
//     }
//   }, {
//     key: "getFilesWithStatus",
//     value: function getFilesWithStatus(status) {
//       return this.files.filter(function (file) {
//         return file.status === status;
//       }).map(function (file) {
//         return file;
//       });
//     }
//
//     // Returns all files that are in the queue
//
//   }, {
//     key: "getQueuedFiles",
//     value: function getQueuedFiles() {
//       return this.getFilesWithStatus(Dropzone.QUEUED);
//     }
//   }, {
//     key: "getUploadingFiles",
//     value: function getUploadingFiles() {
//       return this.getFilesWithStatus(Dropzone.UPLOADING);
//     }
//   }, {
//     key: "getAddedFiles",
//     value: function getAddedFiles() {
//       return this.getFilesWithStatus(Dropzone.ADDED);
//     }
//
//     // Files that are either queued or uploading
//
//   }, {
//     key: "getActiveFiles",
//     value: function getActiveFiles() {
//       return this.files.filter(function (file) {
//         return file.status === Dropzone.UPLOADING || file.status === Dropzone.QUEUED;
//       }).map(function (file) {
//         return file;
//       });
//     }
//
//     // The function that gets called when Dropzone is initialized. You
//     // can (and should) setup event listeners inside this function.
//
//   }, {
//     key: "init",
//     value: function init() {
//       var _this3 = this;
//
//       // In case it isn't set already
//       if (this.element.tagName === "form") {
//         this.element.setAttribute("enctype", "multipart/form-data");
//       }
//
//       if (this.element.classList.contains("dropzone") && !this.element.querySelector(".dz-message")) {
//         this.element.appendChild(Dropzone.createElement("<div class=\"dz-default dz-message\"><span>" + this.options.dictDefaultMessage + "</span></div>"));
//       }
//
//       if (this.clickableElements.length) {
//         var setupHiddenFileInput = function setupHiddenFileInput() {
//           if (_this3.hiddenFileInput) {
//             _this3.hiddenFileInput.parentNode.removeChild(_this3.hiddenFileInput);
//           }
//           _this3.hiddenFileInput = document.createElement("input");
//           _this3.hiddenFileInput.setAttribute("type", "file");
//           if (_this3.options.maxFiles === null || _this3.options.maxFiles > 1) {
//             _this3.hiddenFileInput.setAttribute("multiple", "multiple");
//           }
//           _this3.hiddenFileInput.className = "dz-hidden-input";
//
//           if (_this3.options.acceptedFiles !== null) {
//             _this3.hiddenFileInput.setAttribute("accept", _this3.options.acceptedFiles);
//           }
//           if (_this3.options.capture !== null) {
//             _this3.hiddenFileInput.setAttribute("capture", _this3.options.capture);
//           }
//
//           // Not setting `display="none"` because some browsers don't accept clicks
//           // on elements that aren't displayed.
//           _this3.hiddenFileInput.style.visibility = "hidden";
//           _this3.hiddenFileInput.style.position = "absolute";
//           _this3.hiddenFileInput.style.top = "0";
//           _this3.hiddenFileInput.style.left = "0";
//           _this3.hiddenFileInput.style.height = "0";
//           _this3.hiddenFileInput.style.width = "0";
//           document.querySelector(_this3.options.hiddenInputContainer).appendChild(_this3.hiddenFileInput);
//           return _this3.hiddenFileInput.addEventListener("change", function () {
//             var files = _this3.hiddenFileInput.files;
//
//             if (files.length) {
//               for (var _iterator10 = files, _isArray10 = true, _i10 = 0, _iterator10 = _isArray10 ? _iterator10 : _iterator10[Symbol.iterator]();;) {
//                 var _ref9;
//
//                 if (_isArray10) {
//                   if (_i10 >= _iterator10.length) break;
//                   _ref9 = _iterator10[_i10++];
//                 } else {
//                   _i10 = _iterator10.next();
//                   if (_i10.done) break;
//                   _ref9 = _i10.value;
//                 }
//
//                 var file = _ref9;
//
//                 _this3.addFile(file);
//               }
//             }
//             _this3.emit("addedfiles", files);
//             return setupHiddenFileInput();
//           });
//         };
//         setupHiddenFileInput();
//       }
//
//       this.URL = window.URL !== null ? window.URL : window.webkitURL;
//
//       // Setup all event listeners on the Dropzone object itself.
//       // They're not in @setupEventListeners() because they shouldn't be removed
//       // again when the dropzone gets disabled.
//       for (var _iterator11 = this.events, _isArray11 = true, _i11 = 0, _iterator11 = _isArray11 ? _iterator11 : _iterator11[Symbol.iterator]();;) {
//         var _ref10;
//
//         if (_isArray11) {
//           if (_i11 >= _iterator11.length) break;
//           _ref10 = _iterator11[_i11++];
//         } else {
//           _i11 = _iterator11.next();
//           if (_i11.done) break;
//           _ref10 = _i11.value;
//         }
//
//         var eventName = _ref10;
//
//         this.on(eventName, this.options[eventName]);
//       }
//
//       this.on("uploadprogress", function () {
//         return _this3.updateTotalUploadProgress();
//       });
//
//       this.on("removedfile", function () {
//         return _this3.updateTotalUploadProgress();
//       });
//
//       this.on("canceled", function (file) {
//         return _this3.emit("complete", file);
//       });
//
//       // Emit a `queuecomplete` event if all files finished uploading.
//       this.on("complete", function (file) {
//         if (_this3.getAddedFiles().length === 0 && _this3.getUploadingFiles().length === 0 && _this3.getQueuedFiles().length === 0) {
//           // This needs to be deferred so that `queuecomplete` really triggers after `complete`
//           return setTimeout(function () {
//             return _this3.emit("queuecomplete");
//           }, 0);
//         }
//       });
//
//       var noPropagation = function noPropagation(e) {
//         e.stopPropagation();
//         if (e.preventDefault) {
//           return e.preventDefault();
//         } else {
//           return e.returnValue = false;
//         }
//       };
//
//       // Create the listeners
//       this.listeners = [{
//         element: this.element,
//         events: {
//           "dragstart": function dragstart(e) {
//             return _this3.emit("dragstart", e);
//           },
//           "dragenter": function dragenter(e) {
//             noPropagation(e);
//             return _this3.emit("dragenter", e);
//           },
//           "dragover": function dragover(e) {
//             // Makes it possible to drag files from chrome's download bar
//             // http://stackoverflow.com/questions/19526430/drag-and-drop-file-uploads-from-chrome-downloads-bar
//             // Try is required to prevent bug in Internet Explorer 11 (SCRIPT65535 exception)
//             var efct = void 0;
//             try {
//               efct = e.dataTransfer.effectAllowed;
//             } catch (error) {}
//             e.dataTransfer.dropEffect = 'move' === efct || 'linkMove' === efct ? 'move' : 'copy';
//
//             noPropagation(e);
//             return _this3.emit("dragover", e);
//           },
//           "dragleave": function dragleave(e) {
//             return _this3.emit("dragleave", e);
//           },
//           "drop": function drop(e) {
//             noPropagation(e);
//             return _this3.drop(e);
//           },
//           "dragend": function dragend(e) {
//             return _this3.emit("dragend", e);
//           }
//
//           // This is disabled right now, because the browsers don't implement it properly.
//           // "paste": (e) =>
//           //   noPropagation e
//           //   @paste e
//         } }];
//
//       this.clickableElements.forEach(function (clickableElement) {
//         return _this3.listeners.push({
//           element: clickableElement,
//           events: {
//             "click": function click(evt) {
//               // Only the actual dropzone or the message element should trigger file selection
//               if (clickableElement !== _this3.element || evt.target === _this3.element || Dropzone.elementInside(evt.target, _this3.element.querySelector(".dz-message"))) {
//                 _this3.hiddenFileInput.click(); // Forward the click
//               }
//               return true;
//             }
//           }
//         });
//       });
//
//       this.enable();
//
//       return this.options.init.call(this);
//     }
//
//     // Not fully tested yet
//
//   }, {
//     key: "destroy",
//     value: function destroy() {
//       this.disable();
//       this.removeAllFiles(true);
//       if (this.hiddenFileInput != null ? this.hiddenFileInput.parentNode : undefined) {
//         this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput);
//         this.hiddenFileInput = null;
//       }
//       delete this.element.dropzone;
//       return Dropzone.instances.splice(Dropzone.instances.indexOf(this), 1);
//     }
//   }, {
//     key: "updateTotalUploadProgress",
//     value: function updateTotalUploadProgress() {
//       var totalUploadProgress = void 0;
//       var totalBytesSent = 0;
//       var totalBytes = 0;
//
//       var activeFiles = this.getActiveFiles();
//
//       if (activeFiles.length) {
//         for (var _iterator12 = this.getActiveFiles(), _isArray12 = true, _i12 = 0, _iterator12 = _isArray12 ? _iterator12 : _iterator12[Symbol.iterator]();;) {
//           var _ref11;
//
//           if (_isArray12) {
//             if (_i12 >= _iterator12.length) break;
//             _ref11 = _iterator12[_i12++];
//           } else {
//             _i12 = _iterator12.next();
//             if (_i12.done) break;
//             _ref11 = _i12.value;
//           }
//
//           var file = _ref11;
//
//           totalBytesSent += file.upload.bytesSent;
//           totalBytes += file.upload.total;
//         }
//         totalUploadProgress = 100 * totalBytesSent / totalBytes;
//       } else {
//         totalUploadProgress = 100;
//       }
//
//       return this.emit("totaluploadprogress", totalUploadProgress, totalBytes, totalBytesSent);
//     }
//
//     // @options.paramName can be a function taking one parameter rather than a string.
//     // A parameter name for a file is obtained simply by calling this with an index number.
//
//   }, {
//     key: "_getParamName",
//     value: function _getParamName(n) {
//       if (typeof this.options.paramName === "function") {
//         return this.options.paramName(n);
//       } else {
//         return "" + this.options.paramName + (this.options.uploadMultiple ? "[" + n + "]" : "");
//       }
//     }
//
//     // If @options.renameFile is a function,
//     // the function will be used to rename the file.name before appending it to the formData
//
//   }, {
//     key: "_renameFile",
//     value: function _renameFile(file) {
//       if (typeof this.options.renameFile !== "function") {
//         return file.name;
//       }
//       return this.options.renameFile(file);
//     }
//
//     // Returns a form that can be used as fallback if the browser does not support DragnDrop
//     //
//     // If the dropzone is already a form, only the input field and button are returned. Otherwise a complete form element is provided.
//     // This code has to pass in IE7 :(
//
//   }, {
//     key: "getFallbackForm",
//     value: function getFallbackForm() {
//       var existingFallback = void 0,
//           form = void 0;
//       if (existingFallback = this.getExistingFallback()) {
//         return existingFallback;
//       }
//
//       var fieldsString = "<div class=\"dz-fallback\">";
//       if (this.options.dictFallbackText) {
//         fieldsString += "<p>" + this.options.dictFallbackText + "</p>";
//       }
//       fieldsString += "<input type=\"file\" name=\"" + this._getParamName(0) + "\" " + (this.options.uploadMultiple ? 'multiple="multiple"' : undefined) + " /><input type=\"submit\" value=\"Upload!\"></div>";
//
//       var fields = Dropzone.createElement(fieldsString);
//       if (this.element.tagName !== "FORM") {
//         form = Dropzone.createElement("<form action=\"" + this.options.url + "\" enctype=\"multipart/form-data\" method=\"" + this.options.method + "\"></form>");
//         form.appendChild(fields);
//       } else {
//         // Make sure that the enctype and method attributes are set properly
//         this.element.setAttribute("enctype", "multipart/form-data");
//         this.element.setAttribute("method", this.options.method);
//       }
//       return form != null ? form : fields;
//     }
//
//     // Returns the fallback elements if they exist already
//     //
//     // This code has to pass in IE7 :(
//
//   }, {
//     key: "getExistingFallback",
//     value: function getExistingFallback() {
//       var getFallback = function getFallback(elements) {
//         for (var _iterator13 = elements, _isArray13 = true, _i13 = 0, _iterator13 = _isArray13 ? _iterator13 : _iterator13[Symbol.iterator]();;) {
//           var _ref12;
//
//           if (_isArray13) {
//             if (_i13 >= _iterator13.length) break;
//             _ref12 = _iterator13[_i13++];
//           } else {
//             _i13 = _iterator13.next();
//             if (_i13.done) break;
//             _ref12 = _i13.value;
//           }
//
//           var el = _ref12;
//
//           if (/(^| )fallback($| )/.test(el.className)) {
//             return el;
//           }
//         }
//       };
//
//       var _arr = ["div", "form"];
//       for (var _i14 = 0; _i14 < _arr.length; _i14++) {
//         var tagName = _arr[_i14];
//         var fallback;
//         if (fallback = getFallback(this.element.getElementsByTagName(tagName))) {
//           return fallback;
//         }
//       }
//     }
//
//     // Activates all listeners stored in @listeners
//
//   }, {
//     key: "setupEventListeners",
//     value: function setupEventListeners() {
//       return this.listeners.map(function (elementListeners) {
//         return function () {
//           var result = [];
//           for (var event in elementListeners.events) {
//             var listener = elementListeners.events[event];
//             result.push(elementListeners.element.addEventListener(event, listener, false));
//           }
//           return result;
//         }();
//       });
//     }
//
//     // Deactivates all listeners stored in @listeners
//
//   }, {
//     key: "removeEventListeners",
//     value: function removeEventListeners() {
//       return this.listeners.map(function (elementListeners) {
//         return function () {
//           var result = [];
//           for (var event in elementListeners.events) {
//             var listener = elementListeners.events[event];
//             result.push(elementListeners.element.removeEventListener(event, listener, false));
//           }
//           return result;
//         }();
//       });
//     }
//
//     // Removes all event listeners and cancels all files in the queue or being processed.
//
//   }, {
//     key: "disable",
//     value: function disable() {
//       var _this4 = this;
//
//       this.clickableElements.forEach(function (element) {
//         return element.classList.remove("dz-clickable");
//       });
//       this.removeEventListeners();
//
//       return this.files.map(function (file) {
//         return _this4.cancelUpload(file);
//       });
//     }
//   }, {
//     key: "enable",
//     value: function enable() {
//       this.clickableElements.forEach(function (element) {
//         return element.classList.add("dz-clickable");
//       });
//       return this.setupEventListeners();
//     }
//
//     // Returns a nicely formatted filesize
//
//   }, {
//     key: "filesize",
//     value: function filesize(size) {
//       var selectedSize = 0;
//       var selectedUnit = "b";
//
//       if (size > 0) {
//         var units = ['tb', 'gb', 'mb', 'kb', 'b'];
//
//         for (var i = 0; i < units.length; i++) {
//           var unit = units[i];
//           var cutoff = Math.pow(this.options.filesizeBase, 4 - i) / 10;
//
//           if (size >= cutoff) {
//             selectedSize = size / Math.pow(this.options.filesizeBase, 4 - i);
//             selectedUnit = unit;
//             break;
//           }
//         }
//
//         selectedSize = Math.round(10 * selectedSize) / 10; // Cutting of digits
//       }
//
//       return "<strong>" + selectedSize + "</strong> " + this.options.dictFileSizeUnits[selectedUnit];
//     }
//
//     // Adds or removes the `dz-max-files-reached` class from the form.
//
//   }, {
//     key: "_updateMaxFilesReachedClass",
//     value: function _updateMaxFilesReachedClass() {
//       if (this.options.maxFiles != null && this.getAcceptedFiles().length >= this.options.maxFiles) {
//         if (this.getAcceptedFiles().length === this.options.maxFiles) {
//           this.emit('maxfilesreached', this.files);
//         }
//         return this.element.classList.add("dz-max-files-reached");
//       } else {
//         return this.element.classList.remove("dz-max-files-reached");
//       }
//     }
//   }, {
//     key: "drop",
//     value: function drop(e) {
//       if (!e.dataTransfer) {
//         return;
//       }
//       this.emit("drop", e);
//
//       var files = e.dataTransfer.files;
//
//       this.emit("addedfiles", files);
//
//       // Even if it's a folder, files.length will contain the folders.
//       if (files.length) {
//         var items = e.dataTransfer.items;
//
//         if (items && items.length && items[0].webkitGetAsEntry != null) {
//           // The browser supports dropping of folders, so handle items instead of files
//           this._addFilesFromItems(items);
//         } else {
//           this.handleFiles(files);
//         }
//       }
//     }
//   }, {
//     key: "paste",
//     value: function paste(e) {
//       if (__guard__(e != null ? e.clipboardData : undefined, function (x) {
//         return x.items;
//       }) == null) {
//         return;
//       }
//
//       this.emit("paste", e);
//       var items = e.clipboardData.items;
//
//
//       if (items.length) {
//         return this._addFilesFromItems(items);
//       }
//     }
//   }, {
//     key: "handleFiles",
//     value: function handleFiles(files) {
//       var _this5 = this;
//
//       return files.map(function (file) {
//         return _this5.addFile(file);
//       });
//     }
//
//     // When a folder is dropped (or files are pasted), items must be handled
//     // instead of files.
//
//   }, {
//     key: "_addFilesFromItems",
//     value: function _addFilesFromItems(items) {
//       var _this6 = this;
//
//       return function () {
//         var result = [];
//         for (var _iterator14 = items, _isArray14 = true, _i15 = 0, _iterator14 = _isArray14 ? _iterator14 : _iterator14[Symbol.iterator]();;) {
//           var _ref13;
//
//           if (_isArray14) {
//             if (_i15 >= _iterator14.length) break;
//             _ref13 = _iterator14[_i15++];
//           } else {
//             _i15 = _iterator14.next();
//             if (_i15.done) break;
//             _ref13 = _i15.value;
//           }
//
//           var item = _ref13;
//
//           var entry;
//           if (item.webkitGetAsEntry != null && (entry = item.webkitGetAsEntry())) {
//             if (entry.isFile) {
//               result.push(_this6.addFile(item.getAsFile()));
//             } else if (entry.isDirectory) {
//               // Append all files from that directory to files
//               result.push(_this6._addFilesFromDirectory(entry, entry.name));
//             } else {
//               result.push(undefined);
//             }
//           } else if (item.getAsFile != null) {
//             if (item.kind == null || item.kind === "file") {
//               result.push(_this6.addFile(item.getAsFile()));
//             } else {
//               result.push(undefined);
//             }
//           } else {
//             result.push(undefined);
//           }
//         }
//         return result;
//       }();
//     }
//
//     // Goes through the directory, and adds each file it finds recursively
//
//   }, {
//     key: "_addFilesFromDirectory",
//     value: function _addFilesFromDirectory(directory, path) {
//       var _this7 = this;
//
//       var dirReader = directory.createReader();
//
//       var errorHandler = function errorHandler(error) {
//         return __guardMethod__(console, 'log', function (o) {
//           return o.log(error);
//         });
//       };
//
//       var readEntries = function readEntries() {
//         return dirReader.readEntries(function (entries) {
//           if (entries.length > 0) {
//             for (var _iterator15 = entries, _isArray15 = true, _i16 = 0, _iterator15 = _isArray15 ? _iterator15 : _iterator15[Symbol.iterator]();;) {
//               var _ref14;
//
//               if (_isArray15) {
//                 if (_i16 >= _iterator15.length) break;
//                 _ref14 = _iterator15[_i16++];
//               } else {
//                 _i16 = _iterator15.next();
//                 if (_i16.done) break;
//                 _ref14 = _i16.value;
//               }
//
//               var entry = _ref14;
//
//               if (entry.isFile) {
//                 entry.file(function (file) {
//                   if (_this7.options.ignoreHiddenFiles && file.name.substring(0, 1) === '.') {
//                     return;
//                   }
//                   file.fullPath = path + "/" + file.name;
//                   return _this7.addFile(file);
//                 });
//               } else if (entry.isDirectory) {
//                 _this7._addFilesFromDirectory(entry, path + "/" + entry.name);
//               }
//             }
//
//             // Recursively call readEntries() again, since browser only handle
//             // the first 100 entries.
//             // See: https://developer.mozilla.org/en-US/docs/Web/API/DirectoryReader#readEntries
//             readEntries();
//           }
//           return null;
//         }, errorHandler);
//       };
//
//       return readEntries();
//     }
//
//     // If `done()` is called without argument the file is accepted
//     // If you call it with an error message, the file is rejected
//     // (This allows for asynchronous validation)
//     //
//     // This function checks the filesize, and if the file.type passes the
//     // `acceptedFiles` check.
//
//   }, {
//     key: "accept",
//     value: function accept(file, done) {
//       if (file.size > this.options.maxFilesize * 1024 * 1024) {
//         return done(this.options.dictFileTooBig.replace("{{filesize}}", Math.round(file.size / 1024 / 10.24) / 100).replace("{{maxFilesize}}", this.options.maxFilesize));
//       } else if (!Dropzone.isValidFile(file, this.options.acceptedFiles)) {
//         return done(this.options.dictInvalidFileType);
//       } else if (this.options.maxFiles != null && this.getAcceptedFiles().length >= this.options.maxFiles) {
//         done(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}", this.options.maxFiles));
//         return this.emit("maxfilesexceeded", file);
//       } else {
//         return this.options.accept.call(this, file, done);
//       }
//     }
//   }, {
//     key: "addFile",
//     value: function addFile(file) {
//       var _this8 = this;
//
//       file.upload = {
//         uuid: Dropzone.uuidv4(),
//         progress: 0,
//         // Setting the total upload size to file.size for the beginning
//         // It's actual different than the size to be transmitted.
//         total: file.size,
//         bytesSent: 0,
//         filename: this._renameFile(file),
//         chunked: this.options.chunking && (this.options.forceChunking || file.size > this.options.chunkSize),
//         totalChunkCount: Math.ceil(file.size / this.options.chunkSize)
//       };
//       this.files.push(file);
//
//       file.status = Dropzone.ADDED;
//
//       this.emit("addedfile", file);
//
//       this._enqueueThumbnail(file);
//
//       return this.accept(file, function (error) {
//         if (error) {
//           file.accepted = false;
//           _this8._errorProcessing([file], error); // Will set the file.status
//         } else {
//           file.accepted = true;
//           if (_this8.options.autoQueue) {
//             _this8.enqueueFile(file);
//           } // Will set .accepted = true
//         }
//         return _this8._updateMaxFilesReachedClass();
//       });
//     }
//
//     // Wrapper for enqueueFile
//
//   }, {
//     key: "enqueueFiles",
//     value: function enqueueFiles(files) {
//       for (var _iterator16 = files, _isArray16 = true, _i17 = 0, _iterator16 = _isArray16 ? _iterator16 : _iterator16[Symbol.iterator]();;) {
//         var _ref15;
//
//         if (_isArray16) {
//           if (_i17 >= _iterator16.length) break;
//           _ref15 = _iterator16[_i17++];
//         } else {
//           _i17 = _iterator16.next();
//           if (_i17.done) break;
//           _ref15 = _i17.value;
//         }
//
//         var file = _ref15;
//
//         this.enqueueFile(file);
//       }
//       return null;
//     }
//   }, {
//     key: "enqueueFile",
//     value: function enqueueFile(file) {
//       var _this9 = this;
//
//       if (file.status === Dropzone.ADDED && file.accepted === true) {
//         file.status = Dropzone.QUEUED;
//         if (this.options.autoProcessQueue) {
//           return setTimeout(function () {
//             return _this9.processQueue();
//           }, 0); // Deferring the call
//         }
//       } else {
//         throw new Error("This file can't be queued because it has already been processed or was rejected.");
//       }
//     }
//   }, {
//     key: "_enqueueThumbnail",
//     value: function _enqueueThumbnail(file) {
//       var _this10 = this;
//
//       if (this.options.createImageThumbnails && file.type.match(/image.*/) && file.size <= this.options.maxThumbnailFilesize * 1024 * 1024) {
//         this._thumbnailQueue.push(file);
//         return setTimeout(function () {
//           return _this10._processThumbnailQueue();
//         }, 0); // Deferring the call
//       }
//     }
//   }, {
//     key: "_processThumbnailQueue",
//     value: function _processThumbnailQueue() {
//       var _this11 = this;
//
//       if (this._processingThumbnail || this._thumbnailQueue.length === 0) {
//         return;
//       }
//
//       this._processingThumbnail = true;
//       var file = this._thumbnailQueue.shift();
//       return this.createThumbnail(file, this.options.thumbnailWidth, this.options.thumbnailHeight, this.options.thumbnailMethod, true, function (dataUrl) {
//         _this11.emit("thumbnail", file, dataUrl);
//         _this11._processingThumbnail = false;
//         return _this11._processThumbnailQueue();
//       });
//     }
//
//     // Can be called by the user to remove a file
//
//   }, {
//     key: "removeFile",
//     value: function removeFile(file) {
//       if (file.status === Dropzone.UPLOADING) {
//         this.cancelUpload(file);
//       }
//       this.files = without(this.files, file);
//
//       this.emit("removedfile", file);
//       if (this.files.length === 0) {
//         return this.emit("reset");
//       }
//     }
//
//     // Removes all files that aren't currently processed from the list
//
//   }, {
//     key: "removeAllFiles",
//     value: function removeAllFiles(cancelIfNecessary) {
//       // Create a copy of files since removeFile() changes the @files array.
//       if (cancelIfNecessary == null) {
//         cancelIfNecessary = false;
//       }
//       for (var _iterator17 = this.files.slice(), _isArray17 = true, _i18 = 0, _iterator17 = _isArray17 ? _iterator17 : _iterator17[Symbol.iterator]();;) {
//         var _ref16;
//
//         if (_isArray17) {
//           if (_i18 >= _iterator17.length) break;
//           _ref16 = _iterator17[_i18++];
//         } else {
//           _i18 = _iterator17.next();
//           if (_i18.done) break;
//           _ref16 = _i18.value;
//         }
//
//         var file = _ref16;
//
//         if (file.status !== Dropzone.UPLOADING || cancelIfNecessary) {
//           this.removeFile(file);
//         }
//       }
//       return null;
//     }
//
//     // Resizes an image before it gets sent to the server. This function is the default behavior of
//     // `options.transformFile` if `resizeWidth` or `resizeHeight` are set. The callback is invoked with
//     // the resized blob.
//
//   }, {
//     key: "resizeImage",
//     value: function resizeImage(file, width, height, resizeMethod, callback) {
//       var _this12 = this;
//
//       return this.createThumbnail(file, width, height, resizeMethod, false, function (dataUrl, canvas) {
//         if (canvas === null) {
//           // The image has not been resized
//           return callback(file);
//         } else {
//           var resizeMimeType = _this12.options.resizeMimeType;
//
//           if (resizeMimeType == null) {
//             resizeMimeType = file.type;
//           }
//           var resizedDataURL = canvas.toDataURL(resizeMimeType, _this12.options.resizeQuality);
//           if (resizeMimeType === 'image/jpeg' || resizeMimeType === 'image/jpg') {
//             // Now add the original EXIF information
//             resizedDataURL = ExifRestore.restore(file.dataURL, resizedDataURL);
//           }
//           return callback(Dropzone.dataURItoBlob(resizedDataURL));
//         }
//       });
//     }
//   }, {
//     key: "createThumbnail",
//     value: function createThumbnail(file, width, height, resizeMethod, fixOrientation, callback) {
//       var _this13 = this;
//
//       var fileReader = new FileReader();
//
//       fileReader.onload = function () {
//
//         file.dataURL = fileReader.result;
//
//         // Don't bother creating a thumbnail for SVG images since they're vector
//         if (file.type === "image/svg+xml") {
//           if (callback != null) {
//             callback(fileReader.result);
//           }
//           return;
//         }
//
//         return _this13.createThumbnailFromUrl(file, width, height, resizeMethod, fixOrientation, callback);
//       };
//
//       return fileReader.readAsDataURL(file);
//     }
//   }, {
//     key: "createThumbnailFromUrl",
//     value: function createThumbnailFromUrl(file, width, height, resizeMethod, fixOrientation, callback, crossOrigin) {
//       var _this14 = this;
//
//       // Not using `new Image` here because of a bug in latest Chrome versions.
//       // See https://github.com/enyo/dropzone/pull/226
//       var img = document.createElement("img");
//
//       if (crossOrigin) {
//         img.crossOrigin = crossOrigin;
//       }
//
//       img.onload = function () {
//         var loadExif = function loadExif(callback) {
//           return callback(1);
//         };
//         if (typeof EXIF !== 'undefined' && EXIF !== null && fixOrientation) {
//           loadExif = function loadExif(callback) {
//             return EXIF.getData(img, function () {
//               return callback(EXIF.getTag(this, 'Orientation'));
//             });
//           };
//         }
//
//         return loadExif(function (orientation) {
//           file.width = img.width;
//           file.height = img.height;
//
//           var resizeInfo = _this14.options.resize.call(_this14, file, width, height, resizeMethod);
//
//           var canvas = document.createElement("canvas");
//           var ctx = canvas.getContext("2d");
//
//           canvas.width = resizeInfo.trgWidth;
//           canvas.height = resizeInfo.trgHeight;
//
//           if (orientation > 4) {
//             canvas.width = resizeInfo.trgHeight;
//             canvas.height = resizeInfo.trgWidth;
//           }
//
//           switch (orientation) {
//             case 2:
//               // horizontal flip
//               ctx.translate(canvas.width, 0);
//               ctx.scale(-1, 1);
//               break;
//             case 3:
//               // 180° rotate left
//               ctx.translate(canvas.width, canvas.height);
//               ctx.rotate(Math.PI);
//               break;
//             case 4:
//               // vertical flip
//               ctx.translate(0, canvas.height);
//               ctx.scale(1, -1);
//               break;
//             case 5:
//               // vertical flip + 90 rotate right
//               ctx.rotate(0.5 * Math.PI);
//               ctx.scale(1, -1);
//               break;
//             case 6:
//               // 90° rotate right
//               ctx.rotate(0.5 * Math.PI);
//               ctx.translate(0, -canvas.height);
//               break;
//             case 7:
//               // horizontal flip + 90 rotate right
//               ctx.rotate(0.5 * Math.PI);
//               ctx.translate(canvas.width, -canvas.height);
//               ctx.scale(-1, 1);
//               break;
//             case 8:
//               // 90° rotate left
//               ctx.rotate(-0.5 * Math.PI);
//               ctx.translate(-canvas.width, 0);
//               break;
//           }
//
//           // This is a bugfix for iOS' scaling bug.
//           drawImageIOSFix(ctx, img, resizeInfo.srcX != null ? resizeInfo.srcX : 0, resizeInfo.srcY != null ? resizeInfo.srcY : 0, resizeInfo.srcWidth, resizeInfo.srcHeight, resizeInfo.trgX != null ? resizeInfo.trgX : 0, resizeInfo.trgY != null ? resizeInfo.trgY : 0, resizeInfo.trgWidth, resizeInfo.trgHeight);
//
//           var thumbnail = canvas.toDataURL("image/png");
//
//           if (callback != null) {
//             return callback(thumbnail, canvas);
//           }
//         });
//       };
//
//       if (callback != null) {
//         img.onerror = callback;
//       }
//
//       return img.src = file.dataURL;
//     }
//
//     // Goes through the queue and processes files if there aren't too many already.
//
//   }, {
//     key: "processQueue",
//     value: function processQueue() {
//       var parallelUploads = this.options.parallelUploads;
//
//       var processingLength = this.getUploadingFiles().length;
//       var i = processingLength;
//
//       // There are already at least as many files uploading than should be
//       if (processingLength >= parallelUploads) {
//         return;
//       }
//
//       var queuedFiles = this.getQueuedFiles();
//
//       if (!(queuedFiles.length > 0)) {
//         return;
//       }
//
//       if (this.options.uploadMultiple) {
//         // The files should be uploaded in one request
//         return this.processFiles(queuedFiles.slice(0, parallelUploads - processingLength));
//       } else {
//         while (i < parallelUploads) {
//           if (!queuedFiles.length) {
//             return;
//           } // Nothing left to process
//           this.processFile(queuedFiles.shift());
//           i++;
//         }
//       }
//     }
//
//     // Wrapper for `processFiles`
//
//   }, {
//     key: "processFile",
//     value: function processFile(file) {
//       return this.processFiles([file]);
//     }
//
//     // Loads the file, then calls finishedLoading()
//
//   }, {
//     key: "processFiles",
//     value: function processFiles(files) {
//       for (var _iterator18 = files, _isArray18 = true, _i19 = 0, _iterator18 = _isArray18 ? _iterator18 : _iterator18[Symbol.iterator]();;) {
//         var _ref17;
//
//         if (_isArray18) {
//           if (_i19 >= _iterator18.length) break;
//           _ref17 = _iterator18[_i19++];
//         } else {
//           _i19 = _iterator18.next();
//           if (_i19.done) break;
//           _ref17 = _i19.value;
//         }
//
//         var file = _ref17;
//
//         file.processing = true; // Backwards compatibility
//         file.status = Dropzone.UPLOADING;
//
//         this.emit("processing", file);
//       }
//
//       if (this.options.uploadMultiple) {
//         this.emit("processingmultiple", files);
//       }
//
//       return this.uploadFiles(files);
//     }
//   }, {
//     key: "_getFilesWithXhr",
//     value: function _getFilesWithXhr(xhr) {
//       var files = void 0;
//       return files = this.files.filter(function (file) {
//         return file.xhr === xhr;
//       }).map(function (file) {
//         return file;
//       });
//     }
//
//     // Cancels the file upload and sets the status to CANCELED
//     // **if** the file is actually being uploaded.
//     // If it's still in the queue, the file is being removed from it and the status
//     // set to CANCELED.
//
//   }, {
//     key: "cancelUpload",
//     value: function cancelUpload(file) {
//       if (file.status === Dropzone.UPLOADING) {
//         var groupedFiles = this._getFilesWithXhr(file.xhr);
//         for (var _iterator19 = groupedFiles, _isArray19 = true, _i20 = 0, _iterator19 = _isArray19 ? _iterator19 : _iterator19[Symbol.iterator]();;) {
//           var _ref18;
//
//           if (_isArray19) {
//             if (_i20 >= _iterator19.length) break;
//             _ref18 = _iterator19[_i20++];
//           } else {
//             _i20 = _iterator19.next();
//             if (_i20.done) break;
//             _ref18 = _i20.value;
//           }
//
//           var groupedFile = _ref18;
//
//           groupedFile.status = Dropzone.CANCELED;
//         }
//         if (typeof file.xhr !== 'undefined') {
//           file.xhr.abort();
//         }
//         for (var _iterator20 = groupedFiles, _isArray20 = true, _i21 = 0, _iterator20 = _isArray20 ? _iterator20 : _iterator20[Symbol.iterator]();;) {
//           var _ref19;
//
//           if (_isArray20) {
//             if (_i21 >= _iterator20.length) break;
//             _ref19 = _iterator20[_i21++];
//           } else {
//             _i21 = _iterator20.next();
//             if (_i21.done) break;
//             _ref19 = _i21.value;
//           }
//
//           var _groupedFile = _ref19;
//
//           this.emit("canceled", _groupedFile);
//         }
//         if (this.options.uploadMultiple) {
//           this.emit("canceledmultiple", groupedFiles);
//         }
//       } else if (file.status === Dropzone.ADDED || file.status === Dropzone.QUEUED) {
//         file.status = Dropzone.CANCELED;
//         this.emit("canceled", file);
//         if (this.options.uploadMultiple) {
//           this.emit("canceledmultiple", [file]);
//         }
//       }
//
//       if (this.options.autoProcessQueue) {
//         return this.processQueue();
//       }
//     }
//   }, {
//     key: "resolveOption",
//     value: function resolveOption(option) {
//       if (typeof option === 'function') {
//         for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
//           args[_key3 - 1] = arguments[_key3];
//         }
//
//         return option.apply(this, args);
//       }
//       return option;
//     }
//   }, {
//     key: "uploadFile",
//     value: function uploadFile(file) {
//       return this.uploadFiles([file]);
//     }
//   }, {
//     key: "uploadFiles",
//     value: function uploadFiles(files) {
//       var _this15 = this;
//
//       this._transformFiles(files, function (transformedFiles) {
//         if (files[0].upload.chunked) {
//           // This file should be sent in chunks!
//
//           // If the chunking option is set, we **know** that there can only be **one** file, since
//           // uploadMultiple is not allowed with this option.
//           var file = files[0];
//           var transformedFile = transformedFiles[0];
//           var startedChunkCount = 0;
//
//           file.upload.chunks = [];
//
//           var handleNextChunk = function handleNextChunk() {
//             var chunkIndex = 0;
//
//             // Find the next item in file.upload.chunks that is not defined yet.
//             while (file.upload.chunks[chunkIndex] !== undefined) {
//               chunkIndex++;
//             }
//
//             // This means, that all chunks have already been started.
//             if (chunkIndex >= file.upload.totalChunkCount) return;
//
//             startedChunkCount++;
//
//             var start = chunkIndex * _this15.options.chunkSize;
//             var end = Math.min(start + _this15.options.chunkSize, file.size);
//
//             var dataBlock = {
//               name: _this15._getParamName(0),
//               data: transformedFile.webkitSlice ? transformedFile.webkitSlice(start, end) : transformedFile.slice(start, end),
//               filename: file.upload.filename,
//               chunkIndex: chunkIndex
//             };
//
//             file.upload.chunks[chunkIndex] = {
//               file: file,
//               index: chunkIndex,
//               dataBlock: dataBlock, // In case we want to retry.
//               status: Dropzone.UPLOADING,
//               progress: 0,
//               retries: 0 // The number of times this block has been retried.
//             };
//
//             _this15._uploadData(files, [dataBlock]);
//           };
//
//           file.upload.finishedChunkUpload = function (chunk) {
//             var allFinished = true;
//             chunk.status = Dropzone.SUCCESS;
//
//             // Clear the data from the chunk
//             chunk.dataBlock = null;
//
//             for (var i = 0; i < file.upload.totalChunkCount; i++) {
//               if (file.upload.chunks[i] === undefined) {
//                 return handleNextChunk();
//               }
//               if (file.upload.chunks[i].status !== Dropzone.SUCCESS) {
//                 allFinished = false;
//               }
//             }
//
//             if (allFinished) {
//               _this15.options.chunksUploaded(file, function () {
//                 _this15._finished(files, '', null);
//               });
//             }
//           };
//
//           if (_this15.options.parallelChunkUploads) {
//             for (var i = 0; i < file.upload.totalChunkCount; i++) {
//               handleNextChunk();
//             }
//           } else {
//             handleNextChunk();
//           }
//         } else {
//           var dataBlocks = [];
//           for (var _i22 = 0; _i22 < files.length; _i22++) {
//             dataBlocks[_i22] = {
//               name: _this15._getParamName(_i22),
//               data: transformedFiles[_i22],
//               filename: files[_i22].upload.filename
//             };
//           }
//           _this15._uploadData(files, dataBlocks);
//         }
//       });
//     }
//
//     /// Returns the right chunk for given file and xhr
//
//   }, {
//     key: "_getChunk",
//     value: function _getChunk(file, xhr) {
//       for (var i = 0; i < file.upload.totalChunkCount; i++) {
//         if (file.upload.chunks[i] !== undefined && file.upload.chunks[i].xhr === xhr) {
//           return file.upload.chunks[i];
//         }
//       }
//     }
//
//     // This function actually uploads the file(s) to the server.
//     // If dataBlocks contains the actual data to upload (meaning, that this could either be transformed
//     // files, or individual chunks for chunked upload).
//
//   }, {
//     key: "_uploadData",
//     value: function _uploadData(files, dataBlocks) {
//       var _this16 = this;
//
//       var xhr = new XMLHttpRequest();
//
//       // Put the xhr object in the file objects to be able to reference it later.
//       for (var _iterator21 = files, _isArray21 = true, _i23 = 0, _iterator21 = _isArray21 ? _iterator21 : _iterator21[Symbol.iterator]();;) {
//         var _ref20;
//
//         if (_isArray21) {
//           if (_i23 >= _iterator21.length) break;
//           _ref20 = _iterator21[_i23++];
//         } else {
//           _i23 = _iterator21.next();
//           if (_i23.done) break;
//           _ref20 = _i23.value;
//         }
//
//         var file = _ref20;
//
//         file.xhr = xhr;
//       }
//       if (files[0].upload.chunked) {
//         // Put the xhr object in the right chunk object, so it can be associated later, and found with _getChunk
//         files[0].upload.chunks[dataBlocks[0].chunkIndex].xhr = xhr;
//       }
//
//       var method = this.resolveOption(this.options.method, files);
//       var url = this.resolveOption(this.options.url, files);
//       xhr.open(method, url, true);
//
//       // Setting the timeout after open because of IE11 issue: https://gitlab.com/meno/dropzone/issues/8
//       xhr.timeout = this.resolveOption(this.options.timeout, files);
//
//       // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
//       xhr.withCredentials = !!this.options.withCredentials;
//
//       xhr.onload = function (e) {
//         _this16._finishedUploading(files, xhr, e);
//       };
//
//       xhr.onerror = function () {
//         _this16._handleUploadError(files, xhr);
//       };
//
//       // Some browsers do not have the .upload property
//       var progressObj = xhr.upload != null ? xhr.upload : xhr;
//       progressObj.onprogress = function (e) {
//         return _this16._updateFilesUploadProgress(files, xhr, e);
//       };
//
//       var headers = {
//         "Accept": "application/json",
//         "Cache-Control": "no-cache",
//         "X-Requested-With": "XMLHttpRequest"
//       };
//
//       if (this.options.headers) {
//         Dropzone.extend(headers, this.options.headers);
//       }
//
//       for (var headerName in headers) {
//         var headerValue = headers[headerName];
//         if (headerValue) {
//           xhr.setRequestHeader(headerName, headerValue);
//         }
//       }
//
//       var formData = new FormData();
//
//       // Adding all @options parameters
//       if (this.options.params) {
//         var additionalParams = this.options.params;
//         if (typeof additionalParams === 'function') {
//           additionalParams = additionalParams.call(this, files, xhr, files[0].upload.chunked ? this._getChunk(files[0], xhr) : null);
//         }
//
//         for (var key in additionalParams) {
//           var value = additionalParams[key];
//           formData.append(key, value);
//         }
//       }
//
//       // Let the user add additional data if necessary
//       for (var _iterator22 = files, _isArray22 = true, _i24 = 0, _iterator22 = _isArray22 ? _iterator22 : _iterator22[Symbol.iterator]();;) {
//         var _ref21;
//
//         if (_isArray22) {
//           if (_i24 >= _iterator22.length) break;
//           _ref21 = _iterator22[_i24++];
//         } else {
//           _i24 = _iterator22.next();
//           if (_i24.done) break;
//           _ref21 = _i24.value;
//         }
//
//         var _file = _ref21;
//
//         this.emit("sending", _file, xhr, formData);
//       }
//       if (this.options.uploadMultiple) {
//         this.emit("sendingmultiple", files, xhr, formData);
//       }
//
//       this._addFormElementData(formData);
//
//       // Finally add the files
//       // Has to be last because some servers (eg: S3) expect the file to be the last parameter
//       for (var i = 0; i < dataBlocks.length; i++) {
//         var dataBlock = dataBlocks[i];
//         formData.append(dataBlock.name, dataBlock.data, dataBlock.filename);
//       }
//
//       this.submitRequest(xhr, formData, files);
//     }
//
//     // Transforms all files with this.options.transformFile and invokes done with the transformed files when done.
//
//   }, {
//     key: "_transformFiles",
//     value: function _transformFiles(files, done) {
//       var _this17 = this;
//
//       var transformedFiles = [];
//       // Clumsy way of handling asynchronous calls, until I get to add a proper Future library.
//       var doneCounter = 0;
//
//       var _loop = function _loop(i) {
//         _this17.options.transformFile.call(_this17, files[i], function (transformedFile) {
//           transformedFiles[i] = transformedFile;
//           if (++doneCounter === files.length) {
//             done(transformedFiles);
//           }
//         });
//       };
//
//       for (var i = 0; i < files.length; i++) {
//         _loop(i);
//       }
//     }
//
//     // Takes care of adding other input elements of the form to the AJAX request
//
//   }, {
//     key: "_addFormElementData",
//     value: function _addFormElementData(formData) {
//       // Take care of other input elements
//       if (this.element.tagName === "FORM") {
//         for (var _iterator23 = this.element.querySelectorAll("input, textarea, select, button"), _isArray23 = true, _i25 = 0, _iterator23 = _isArray23 ? _iterator23 : _iterator23[Symbol.iterator]();;) {
//           var _ref22;
//
//           if (_isArray23) {
//             if (_i25 >= _iterator23.length) break;
//             _ref22 = _iterator23[_i25++];
//           } else {
//             _i25 = _iterator23.next();
//             if (_i25.done) break;
//             _ref22 = _i25.value;
//           }
//
//           var input = _ref22;
//
//           var inputName = input.getAttribute("name");
//           var inputType = input.getAttribute("type");
//           if (inputType) inputType = inputType.toLowerCase();
//
//           // If the input doesn't have a name, we can't use it.
//           if (typeof inputName === 'undefined' || inputName === null) continue;
//
//           if (input.tagName === "SELECT" && input.hasAttribute("multiple")) {
//             // Possibly multiple values
//             for (var _iterator24 = input.options, _isArray24 = true, _i26 = 0, _iterator24 = _isArray24 ? _iterator24 : _iterator24[Symbol.iterator]();;) {
//               var _ref23;
//
//               if (_isArray24) {
//                 if (_i26 >= _iterator24.length) break;
//                 _ref23 = _iterator24[_i26++];
//               } else {
//                 _i26 = _iterator24.next();
//                 if (_i26.done) break;
//                 _ref23 = _i26.value;
//               }
//
//               var option = _ref23;
//
//               if (option.selected) {
//                 formData.append(inputName, option.value);
//               }
//             }
//           } else if (!inputType || inputType !== "checkbox" && inputType !== "radio" || input.checked) {
//             formData.append(inputName, input.value);
//           }
//         }
//       }
//     }
//
//     // Invoked when there is new progress information about given files.
//     // If e is not provided, it is assumed that the upload is finished.
//
//   }, {
//     key: "_updateFilesUploadProgress",
//     value: function _updateFilesUploadProgress(files, xhr, e) {
//       var progress = void 0;
//       if (typeof e !== 'undefined') {
//         progress = 100 * e.loaded / e.total;
//
//         if (files[0].upload.chunked) {
//           var file = files[0];
//           // Since this is a chunked upload, we need to update the appropriate chunk progress.
//           var chunk = this._getChunk(file, xhr);
//           chunk.progress = progress;
//           chunk.total = e.total;
//           chunk.bytesSent = e.loaded;
//           var fileProgress = 0,
//               fileTotal = void 0,
//               fileBytesSent = void 0;
//           file.upload.progress = 0;
//           file.upload.total = 0;
//           file.upload.bytesSent = 0;
//           for (var i = 0; i < file.upload.totalChunkCount; i++) {
//             if (file.upload.chunks[i] !== undefined && file.upload.chunks[i].progress !== undefined) {
//               file.upload.progress += file.upload.chunks[i].progress;
//               file.upload.total += file.upload.chunks[i].total;
//               file.upload.bytesSent += file.upload.chunks[i].bytesSent;
//             }
//           }
//           file.upload.progress = file.upload.progress / file.upload.totalChunkCount;
//         } else {
//           for (var _iterator25 = files, _isArray25 = true, _i27 = 0, _iterator25 = _isArray25 ? _iterator25 : _iterator25[Symbol.iterator]();;) {
//             var _ref24;
//
//             if (_isArray25) {
//               if (_i27 >= _iterator25.length) break;
//               _ref24 = _iterator25[_i27++];
//             } else {
//               _i27 = _iterator25.next();
//               if (_i27.done) break;
//               _ref24 = _i27.value;
//             }
//
//             var _file2 = _ref24;
//
//             _file2.upload.progress = progress;
//             _file2.upload.total = e.total;
//             _file2.upload.bytesSent = e.loaded;
//           }
//         }
//         for (var _iterator26 = files, _isArray26 = true, _i28 = 0, _iterator26 = _isArray26 ? _iterator26 : _iterator26[Symbol.iterator]();;) {
//           var _ref25;
//
//           if (_isArray26) {
//             if (_i28 >= _iterator26.length) break;
//             _ref25 = _iterator26[_i28++];
//           } else {
//             _i28 = _iterator26.next();
//             if (_i28.done) break;
//             _ref25 = _i28.value;
//           }
//
//           var _file3 = _ref25;
//
//           this.emit("uploadprogress", _file3, _file3.upload.progress, _file3.upload.bytesSent);
//         }
//       } else {
//         // Called when the file finished uploading
//
//         var allFilesFinished = true;
//
//         progress = 100;
//
//         for (var _iterator27 = files, _isArray27 = true, _i29 = 0, _iterator27 = _isArray27 ? _iterator27 : _iterator27[Symbol.iterator]();;) {
//           var _ref26;
//
//           if (_isArray27) {
//             if (_i29 >= _iterator27.length) break;
//             _ref26 = _iterator27[_i29++];
//           } else {
//             _i29 = _iterator27.next();
//             if (_i29.done) break;
//             _ref26 = _i29.value;
//           }
//
//           var _file4 = _ref26;
//
//           if (_file4.upload.progress !== 100 || _file4.upload.bytesSent !== _file4.upload.total) {
//             allFilesFinished = false;
//           }
//           _file4.upload.progress = progress;
//           _file4.upload.bytesSent = _file4.upload.total;
//         }
//
//         // Nothing to do, all files already at 100%
//         if (allFilesFinished) {
//           return;
//         }
//
//         for (var _iterator28 = files, _isArray28 = true, _i30 = 0, _iterator28 = _isArray28 ? _iterator28 : _iterator28[Symbol.iterator]();;) {
//           var _ref27;
//
//           if (_isArray28) {
//             if (_i30 >= _iterator28.length) break;
//             _ref27 = _iterator28[_i30++];
//           } else {
//             _i30 = _iterator28.next();
//             if (_i30.done) break;
//             _ref27 = _i30.value;
//           }
//
//           var _file5 = _ref27;
//
//           this.emit("uploadprogress", _file5, progress, _file5.upload.bytesSent);
//         }
//       }
//     }
//   }, {
//     key: "_finishedUploading",
//     value: function _finishedUploading(files, xhr, e) {
//       var response = void 0;
//
//       if (files[0].status === Dropzone.CANCELED) {
//         return;
//       }
//
//       if (xhr.readyState !== 4) {
//         return;
//       }
//
//       if (xhr.responseType !== 'arraybuffer' && xhr.responseType !== 'blob') {
//         response = xhr.responseText;
//
//         if (xhr.getResponseHeader("content-type") && ~xhr.getResponseHeader("content-type").indexOf("application/json")) {
//           try {
//             response = JSON.parse(response);
//           } catch (error) {
//             e = error;
//             response = "Invalid JSON response from server.";
//           }
//         }
//       }
//
//       this._updateFilesUploadProgress(files);
//
//       if (!(200 <= xhr.status && xhr.status < 300)) {
//         this._handleUploadError(files, xhr, response);
//       } else {
//         if (files[0].upload.chunked) {
//           files[0].upload.finishedChunkUpload(this._getChunk(files[0], xhr));
//         } else {
//           this._finished(files, response, e);
//         }
//       }
//     }
//   }, {
//     key: "_handleUploadError",
//     value: function _handleUploadError(files, xhr, response) {
//       if (files[0].status === Dropzone.CANCELED) {
//         return;
//       }
//
//       if (files[0].upload.chunked && this.options.retryChunks) {
//         var chunk = this._getChunk(files[0], xhr);
//         if (chunk.retries++ < this.options.retryChunksLimit) {
//           this._uploadData(files, [chunk.dataBlock]);
//           return;
//         } else {
//           console.warn('Retried this chunk too often. Giving up.');
//         }
//       }
//
//       for (var _iterator29 = files, _isArray29 = true, _i31 = 0, _iterator29 = _isArray29 ? _iterator29 : _iterator29[Symbol.iterator]();;) {
//         var _ref28;
//
//         if (_isArray29) {
//           if (_i31 >= _iterator29.length) break;
//           _ref28 = _iterator29[_i31++];
//         } else {
//           _i31 = _iterator29.next();
//           if (_i31.done) break;
//           _ref28 = _i31.value;
//         }
//
//         var file = _ref28;
//
//         this._errorProcessing(files, response || this.options.dictResponseError.replace("{{statusCode}}", xhr.status), xhr);
//       }
//     }
//   }, {
//     key: "submitRequest",
//     value: function submitRequest(xhr, formData, files) {
//       xhr.send(formData);
//     }
//
//     // Called internally when processing is finished.
//     // Individual callbacks have to be called in the appropriate sections.
//
//   }, {
//     key: "_finished",
//     value: function _finished(files, responseText, e) {
//       for (var _iterator30 = files, _isArray30 = true, _i32 = 0, _iterator30 = _isArray30 ? _iterator30 : _iterator30[Symbol.iterator]();;) {
//         var _ref29;
//
//         if (_isArray30) {
//           if (_i32 >= _iterator30.length) break;
//           _ref29 = _iterator30[_i32++];
//         } else {
//           _i32 = _iterator30.next();
//           if (_i32.done) break;
//           _ref29 = _i32.value;
//         }
//
//         var file = _ref29;
//
//         file.status = Dropzone.SUCCESS;
//         this.emit("success", file, responseText, e);
//         this.emit("complete", file);
//       }
//       if (this.options.uploadMultiple) {
//         this.emit("successmultiple", files, responseText, e);
//         this.emit("completemultiple", files);
//       }
//
//       if (this.options.autoProcessQueue) {
//         return this.processQueue();
//       }
//     }
//
//     // Called internally when processing is finished.
//     // Individual callbacks have to be called in the appropriate sections.
//
//   }, {
//     key: "_errorProcessing",
//     value: function _errorProcessing(files, message, xhr) {
//       for (var _iterator31 = files, _isArray31 = true, _i33 = 0, _iterator31 = _isArray31 ? _iterator31 : _iterator31[Symbol.iterator]();;) {
//         var _ref30;
//
//         if (_isArray31) {
//           if (_i33 >= _iterator31.length) break;
//           _ref30 = _iterator31[_i33++];
//         } else {
//           _i33 = _iterator31.next();
//           if (_i33.done) break;
//           _ref30 = _i33.value;
//         }
//
//         var file = _ref30;
//
//         file.status = Dropzone.ERROR;
//         this.emit("error", file, message, xhr);
//         this.emit("complete", file);
//       }
//       if (this.options.uploadMultiple) {
//         this.emit("errormultiple", files, message, xhr);
//         this.emit("completemultiple", files);
//       }
//
//       if (this.options.autoProcessQueue) {
//         return this.processQueue();
//       }
//     }
//   }], [{
//     key: "uuidv4",
//     value: function uuidv4() {
//       return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//         var r = Math.random() * 16 | 0,
//             v = c === 'x' ? r : r & 0x3 | 0x8;
//         return v.toString(16);
//       });
//     }
//   }]);
//
//   return Dropzone;
// }(Emitter);
//
// Dropzone.initClass();
//
// Dropzone.version = "5.2.0";
//
// // This is a map of options for your different dropzones. Add configurations
// // to this object for your different dropzone elemens.
// //
// // Example:
// //
// //     Dropzone.options.myDropzoneElementId = { maxFilesize: 1 };
// //
// // To disable autoDiscover for a specific element, you can set `false` as an option:
// //
// //     Dropzone.options.myDisabledElementId = false;
// //
// // And in html:
// //
// //     <form action="/upload" id="my-dropzone-element-id" class="dropzone"></form>
// Dropzone.options = {};
//
// // Returns the options for an element or undefined if none available.
// Dropzone.optionsForElement = function (element) {
//   // Get the `Dropzone.options.elementId` for this element if it exists
//   if (element.getAttribute("id")) {
//     return Dropzone.options[camelize(element.getAttribute("id"))];
//   } else {
//     return undefined;
//   }
// };
//
// // Holds a list of all dropzone instances
// Dropzone.instances = [];
//
// // Returns the dropzone for given element if any
// Dropzone.forElement = function (element) {
//   if (typeof element === "string") {
//     element = document.querySelector(element);
//   }
//   if ((element != null ? element.dropzone : undefined) == null) {
//     throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");
//   }
//   return element.dropzone;
// };
//
// // Set to false if you don't want Dropzone to automatically find and attach to .dropzone elements.
// Dropzone.autoDiscover = true;
//
// // Looks for all .dropzone elements and creates a dropzone for them
// Dropzone.discover = function () {
//   var dropzones = void 0;
//   if (document.querySelectorAll) {
//     dropzones = document.querySelectorAll(".dropzone");
//   } else {
//     dropzones = [];
//     // IE :(
//     var checkElements = function checkElements(elements) {
//       return function () {
//         var result = [];
//         for (var _iterator32 = elements, _isArray32 = true, _i34 = 0, _iterator32 = _isArray32 ? _iterator32 : _iterator32[Symbol.iterator]();;) {
//           var _ref31;
//
//           if (_isArray32) {
//             if (_i34 >= _iterator32.length) break;
//             _ref31 = _iterator32[_i34++];
//           } else {
//             _i34 = _iterator32.next();
//             if (_i34.done) break;
//             _ref31 = _i34.value;
//           }
//
//           var el = _ref31;
//
//           if (/(^| )dropzone($| )/.test(el.className)) {
//             result.push(dropzones.push(el));
//           } else {
//             result.push(undefined);
//           }
//         }
//         return result;
//       }();
//     };
//     checkElements(document.getElementsByTagName("div"));
//     checkElements(document.getElementsByTagName("form"));
//   }
//
//   return function () {
//     var result = [];
//     for (var _iterator33 = dropzones, _isArray33 = true, _i35 = 0, _iterator33 = _isArray33 ? _iterator33 : _iterator33[Symbol.iterator]();;) {
//       var _ref32;
//
//       if (_isArray33) {
//         if (_i35 >= _iterator33.length) break;
//         _ref32 = _iterator33[_i35++];
//       } else {
//         _i35 = _iterator33.next();
//         if (_i35.done) break;
//         _ref32 = _i35.value;
//       }
//
//       var dropzone = _ref32;
//
//       // Create a dropzone unless auto discover has been disabled for specific element
//       if (Dropzone.optionsForElement(dropzone) !== false) {
//         result.push(new Dropzone(dropzone));
//       } else {
//         result.push(undefined);
//       }
//     }
//     return result;
//   }();
// };
//
// // Since the whole Drag'n'Drop API is pretty new, some browsers implement it,
// // but not correctly.
// // So I created a blacklist of userAgents. Yes, yes. Browser sniffing, I know.
// // But what to do when browsers *theoretically* support an API, but crash
// // when using it.
// //
// // This is a list of regular expressions tested against navigator.userAgent
// //
// // ** It should only be used on browser that *do* support the API, but
// // incorrectly **
// //
// Dropzone.blacklistedBrowsers = [
// // The mac os and windows phone version of opera 12 seems to have a problem with the File drag'n'drop API.
// /opera.*(Macintosh|Windows Phone).*version\/12/i];
//
// // Checks if the browser is supported
// Dropzone.isBrowserSupported = function () {
//   var capableBrowser = true;
//
//   if (window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector) {
//     if (!("classList" in document.createElement("a"))) {
//       capableBrowser = false;
//     } else {
//       // The browser supports the API, but may be blacklisted.
//       for (var _iterator34 = Dropzone.blacklistedBrowsers, _isArray34 = true, _i36 = 0, _iterator34 = _isArray34 ? _iterator34 : _iterator34[Symbol.iterator]();;) {
//         var _ref33;
//
//         if (_isArray34) {
//           if (_i36 >= _iterator34.length) break;
//           _ref33 = _iterator34[_i36++];
//         } else {
//           _i36 = _iterator34.next();
//           if (_i36.done) break;
//           _ref33 = _i36.value;
//         }
//
//         var regex = _ref33;
//
//         if (regex.test(navigator.userAgent)) {
//           capableBrowser = false;
//           continue;
//         }
//       }
//     }
//   } else {
//     capableBrowser = false;
//   }
//
//   return capableBrowser;
// };
//
// Dropzone.dataURItoBlob = function (dataURI) {
//   // convert base64 to raw binary data held in a string
//   // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
//   var byteString = atob(dataURI.split(',')[1]);
//
//   // separate out the mime component
//   var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
//
//   // write the bytes of the string to an ArrayBuffer
//   var ab = new ArrayBuffer(byteString.length);
//   var ia = new Uint8Array(ab);
//   for (var i = 0, end = byteString.length, asc = 0 <= end; asc ? i <= end : i >= end; asc ? i++ : i--) {
//     ia[i] = byteString.charCodeAt(i);
//   }
//
//   // write the ArrayBuffer to a blob
//   return new Blob([ab], { type: mimeString });
// };
//
// // Returns an array without the rejected item
// var without = function without(list, rejectedItem) {
//   return list.filter(function (item) {
//     return item !== rejectedItem;
//   }).map(function (item) {
//     return item;
//   });
// };
//
// // abc-def_ghi -> abcDefGhi
// var camelize = function camelize(str) {
//   return str.replace(/[\-_](\w)/g, function (match) {
//     return match.charAt(1).toUpperCase();
//   });
// };
//
// // Creates an element from string
// Dropzone.createElement = function (string) {
//   var div = document.createElement("div");
//   div.innerHTML = string;
//   return div.childNodes[0];
// };
//
// // Tests if given element is inside (or simply is) the container
// Dropzone.elementInside = function (element, container) {
//   if (element === container) {
//     return true;
//   } // Coffeescript doesn't support do/while loops
//   while (element = element.parentNode) {
//     if (element === container) {
//       return true;
//     }
//   }
//   return false;
// };
//
// Dropzone.getElement = function (el, name) {
//   var element = void 0;
//   if (typeof el === "string") {
//     element = document.querySelector(el);
//   } else if (el.nodeType != null) {
//     element = el;
//   }
//   if (element == null) {
//     throw new Error("Invalid `" + name + "` option provided. Please provide a CSS selector or a plain HTML element.");
//   }
//   return element;
// };
//
// Dropzone.getElements = function (els, name) {
//   var el = void 0,
//       elements = void 0;
//   if (els instanceof Array) {
//     elements = [];
//     try {
//       for (var _iterator35 = els, _isArray35 = true, _i37 = 0, _iterator35 = _isArray35 ? _iterator35 : _iterator35[Symbol.iterator]();;) {
//         if (_isArray35) {
//           if (_i37 >= _iterator35.length) break;
//           el = _iterator35[_i37++];
//         } else {
//           _i37 = _iterator35.next();
//           if (_i37.done) break;
//           el = _i37.value;
//         }
//
//         elements.push(this.getElement(el, name));
//       }
//     } catch (e) {
//       elements = null;
//     }
//   } else if (typeof els === "string") {
//     elements = [];
//     for (var _iterator36 = document.querySelectorAll(els), _isArray36 = true, _i38 = 0, _iterator36 = _isArray36 ? _iterator36 : _iterator36[Symbol.iterator]();;) {
//       if (_isArray36) {
//         if (_i38 >= _iterator36.length) break;
//         el = _iterator36[_i38++];
//       } else {
//         _i38 = _iterator36.next();
//         if (_i38.done) break;
//         el = _i38.value;
//       }
//
//       elements.push(el);
//     }
//   } else if (els.nodeType != null) {
//     elements = [els];
//   }
//
//   if (elements == null || !elements.length) {
//     throw new Error("Invalid `" + name + "` option provided. Please provide a CSS selector, a plain HTML element or a list of those.");
//   }
//
//   return elements;
// };
//
// // Asks the user the question and calls accepted or rejected accordingly
// //
// // The default implementation just uses `window.confirm` and then calls the
// // appropriate callback.
// Dropzone.confirm = function (question, accepted, rejected) {
//   if (window.confirm(question)) {
//     return accepted();
//   } else if (rejected != null) {
//     return rejected();
//   }
// };
//
// // Validates the mime type like this:
// //
// // https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-accept
// Dropzone.isValidFile = function (file, acceptedFiles) {
//   if (!acceptedFiles) {
//     return true;
//   } // If there are no accepted mime types, it's OK
//   acceptedFiles = acceptedFiles.split(",");
//
//   var mimeType = file.type;
//   var baseMimeType = mimeType.replace(/\/.*$/, "");
//
//   for (var _iterator37 = acceptedFiles, _isArray37 = true, _i39 = 0, _iterator37 = _isArray37 ? _iterator37 : _iterator37[Symbol.iterator]();;) {
//     var _ref34;
//
//     if (_isArray37) {
//       if (_i39 >= _iterator37.length) break;
//       _ref34 = _iterator37[_i39++];
//     } else {
//       _i39 = _iterator37.next();
//       if (_i39.done) break;
//       _ref34 = _i39.value;
//     }
//
//     var validType = _ref34;
//
//     validType = validType.trim();
//     if (validType.charAt(0) === ".") {
//       if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) {
//         return true;
//       }
//     } else if (/\/\*$/.test(validType)) {
//       // This is something like a image/* mime type
//       if (baseMimeType === validType.replace(/\/.*$/, "")) {
//         return true;
//       }
//     } else {
//       if (mimeType === validType) {
//         return true;
//       }
//     }
//   }
//
//   return false;
// };
//
// // Augment jQuery
// if (typeof jQuery !== 'undefined' && jQuery !== null) {
//   jQuery.fn.dropzone = function (options) {
//     return this.each(function () {
//       return new Dropzone(this, options);
//     });
//   };
// }
//
// if (typeof module !== 'undefined' && module !== null) {
//   module.exports = Dropzone;
// } else {
//   window.Dropzone = Dropzone;
// }
//
// // Dropzone file status codes
// Dropzone.ADDED = "added";
//
// Dropzone.QUEUED = "queued";
// // For backwards compatibility. Now, if a file is accepted, it's either queued
// // or uploading.
// Dropzone.ACCEPTED = Dropzone.QUEUED;
//
// Dropzone.UPLOADING = "uploading";
// Dropzone.PROCESSING = Dropzone.UPLOADING; // alias
//
// Dropzone.CANCELED = "canceled";
// Dropzone.ERROR = "error";
// Dropzone.SUCCESS = "success";
//
// /*
//
//  Bugfix for iOS 6 and 7
//  Source: http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios
//  based on the work of https://github.com/stomita/ios-imagefile-megapixel
//
//  */
//
// // Detecting vertical squash in loaded image.
// // Fixes a bug which squash image vertically while drawing into canvas for some images.
// // This is a bug in iOS6 devices. This function from https://github.com/stomita/ios-imagefile-megapixel
// var detectVerticalSquash = function detectVerticalSquash(img) {
//   var iw = img.naturalWidth;
//   var ih = img.naturalHeight;
//   var canvas = document.createElement("canvas");
//   canvas.width = 1;
//   canvas.height = ih;
//   var ctx = canvas.getContext("2d");
//   ctx.drawImage(img, 0, 0);
//
//   var _ctx$getImageData = ctx.getImageData(1, 0, 1, ih),
//       data = _ctx$getImageData.data;
//
//   // search image edge pixel position in case it is squashed vertically.
//
//
//   var sy = 0;
//   var ey = ih;
//   var py = ih;
//   while (py > sy) {
//     var alpha = data[(py - 1) * 4 + 3];
//
//     if (alpha === 0) {
//       ey = py;
//     } else {
//       sy = py;
//     }
//
//     py = ey + sy >> 1;
//   }
//   var ratio = py / ih;
//
//   if (ratio === 0) {
//     return 1;
//   } else {
//     return ratio;
//   }
// };
//
// // A replacement for context.drawImage
// // (args are for source and destination).
// var drawImageIOSFix = function drawImageIOSFix(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
//   var vertSquashRatio = detectVerticalSquash(img);
//   return ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
// };
//
// // Based on MinifyJpeg
// // Source: http://www.perry.cz/files/ExifRestorer.js
// // http://elicon.blog57.fc2.com/blog-entry-206.html
//
// var ExifRestore = function () {
//   function ExifRestore() {
//     _classCallCheck(this, ExifRestore);
//   }
//
//   _createClass(ExifRestore, null, [{
//     key: "initClass",
//     value: function initClass() {
//       this.KEY_STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
//     }
//   }, {
//     key: "encode64",
//     value: function encode64(input) {
//       var output = '';
//       var chr1 = undefined;
//       var chr2 = undefined;
//       var chr3 = '';
//       var enc1 = undefined;
//       var enc2 = undefined;
//       var enc3 = undefined;
//       var enc4 = '';
//       var i = 0;
//       while (true) {
//         chr1 = input[i++];
//         chr2 = input[i++];
//         chr3 = input[i++];
//         enc1 = chr1 >> 2;
//         enc2 = (chr1 & 3) << 4 | chr2 >> 4;
//         enc3 = (chr2 & 15) << 2 | chr3 >> 6;
//         enc4 = chr3 & 63;
//         if (isNaN(chr2)) {
//           enc3 = enc4 = 64;
//         } else if (isNaN(chr3)) {
//           enc4 = 64;
//         }
//         output = output + this.KEY_STR.charAt(enc1) + this.KEY_STR.charAt(enc2) + this.KEY_STR.charAt(enc3) + this.KEY_STR.charAt(enc4);
//         chr1 = chr2 = chr3 = '';
//         enc1 = enc2 = enc3 = enc4 = '';
//         if (!(i < input.length)) {
//           break;
//         }
//       }
//       return output;
//     }
//   }, {
//     key: "restore",
//     value: function restore(origFileBase64, resizedFileBase64) {
//       if (!origFileBase64.match('data:image/jpeg;base64,')) {
//         return resizedFileBase64;
//       }
//       var rawImage = this.decode64(origFileBase64.replace('data:image/jpeg;base64,', ''));
//       var segments = this.slice2Segments(rawImage);
//       var image = this.exifManipulation(resizedFileBase64, segments);
//       return "data:image/jpeg;base64," + this.encode64(image);
//     }
//   }, {
//     key: "exifManipulation",
//     value: function exifManipulation(resizedFileBase64, segments) {
//       var exifArray = this.getExifArray(segments);
//       var newImageArray = this.insertExif(resizedFileBase64, exifArray);
//       var aBuffer = new Uint8Array(newImageArray);
//       return aBuffer;
//     }
//   }, {
//     key: "getExifArray",
//     value: function getExifArray(segments) {
//       var seg = undefined;
//       var x = 0;
//       while (x < segments.length) {
//         seg = segments[x];
//         if (seg[0] === 255 & seg[1] === 225) {
//           return seg;
//         }
//         x++;
//       }
//       return [];
//     }
//   }, {
//     key: "insertExif",
//     value: function insertExif(resizedFileBase64, exifArray) {
//       var imageData = resizedFileBase64.replace('data:image/jpeg;base64,', '');
//       var buf = this.decode64(imageData);
//       var separatePoint = buf.indexOf(255, 3);
//       var mae = buf.slice(0, separatePoint);
//       var ato = buf.slice(separatePoint);
//       var array = mae;
//       array = array.concat(exifArray);
//       array = array.concat(ato);
//       return array;
//     }
//   }, {
//     key: "slice2Segments",
//     value: function slice2Segments(rawImageArray) {
//       var head = 0;
//       var segments = [];
//       while (true) {
//         var length;
//         if (rawImageArray[head] === 255 & rawImageArray[head + 1] === 218) {
//           break;
//         }
//         if (rawImageArray[head] === 255 & rawImageArray[head + 1] === 216) {
//           head += 2;
//         } else {
//           length = rawImageArray[head + 2] * 256 + rawImageArray[head + 3];
//           var endPoint = head + length + 2;
//           var seg = rawImageArray.slice(head, endPoint);
//           segments.push(seg);
//           head = endPoint;
//         }
//         if (head > rawImageArray.length) {
//           break;
//         }
//       }
//       return segments;
//     }
//   }, {
//     key: "decode64",
//     value: function decode64(input) {
//       var output = '';
//       var chr1 = undefined;
//       var chr2 = undefined;
//       var chr3 = '';
//       var enc1 = undefined;
//       var enc2 = undefined;
//       var enc3 = undefined;
//       var enc4 = '';
//       var i = 0;
//       var buf = [];
//       // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
//       var base64test = /[^A-Za-z0-9\+\/\=]/g;
//       if (base64test.exec(input)) {
//         console.warn('There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, \'+\', \'/\',and \'=\'\nExpect errors in decoding.');
//       }
//       input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
//       while (true) {
//         enc1 = this.KEY_STR.indexOf(input.charAt(i++));
//         enc2 = this.KEY_STR.indexOf(input.charAt(i++));
//         enc3 = this.KEY_STR.indexOf(input.charAt(i++));
//         enc4 = this.KEY_STR.indexOf(input.charAt(i++));
//         chr1 = enc1 << 2 | enc2 >> 4;
//         chr2 = (enc2 & 15) << 4 | enc3 >> 2;
//         chr3 = (enc3 & 3) << 6 | enc4;
//         buf.push(chr1);
//         if (enc3 !== 64) {
//           buf.push(chr2);
//         }
//         if (enc4 !== 64) {
//           buf.push(chr3);
//         }
//         chr1 = chr2 = chr3 = '';
//         enc1 = enc2 = enc3 = enc4 = '';
//         if (!(i < input.length)) {
//           break;
//         }
//       }
//       return buf;
//     }
//   }]);
//
//   return ExifRestore;
// }();
//
// ExifRestore.initClass();
//
// /*
//  * contentloaded.js
//  *
//  * Author: Diego Perini (diego.perini at gmail.com)
//  * Summary: cross-browser wrapper for DOMContentLoaded
//  * Updated: 20101020
//  * License: MIT
//  * Version: 1.2
//  *
//  * URL:
//  * http://javascript.nwbox.com/ContentLoaded/
//  * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
//  */
//
// // @win window reference
// // @fn function reference
// var contentLoaded = function contentLoaded(win, fn) {
//   var done = false;
//   var top = true;
//   var doc = win.document;
//   var root = doc.documentElement;
//   var add = doc.addEventListener ? "addEventListener" : "attachEvent";
//   var rem = doc.addEventListener ? "removeEventListener" : "detachEvent";
//   var pre = doc.addEventListener ? "" : "on";
//   var init = function init(e) {
//     if (e.type === "readystatechange" && doc.readyState !== "complete") {
//       return;
//     }
//     (e.type === "load" ? win : doc)[rem](pre + e.type, init, false);
//     if (!done && (done = true)) {
//       return fn.call(win, e.type || e);
//     }
//   };
//
//   var poll = function poll() {
//     try {
//       root.doScroll("left");
//     } catch (e) {
//       setTimeout(poll, 50);
//       return;
//     }
//     return init("poll");
//   };
//
//   if (doc.readyState !== "complete") {
//     if (doc.createEventObject && root.doScroll) {
//       try {
//         top = !win.frameElement;
//       } catch (error) {}
//       if (top) {
//         poll();
//       }
//     }
//     doc[add](pre + "DOMContentLoaded", init, false);
//     doc[add](pre + "readystatechange", init, false);
//     return win[add](pre + "load", init, false);
//   }
// };
//
// // As a single function to be able to write tests.
// Dropzone._autoDiscoverFunction = function () {
//   if (Dropzone.autoDiscover) {
//     return Dropzone.discover();
//   }
// };
// contentLoaded(window, Dropzone._autoDiscoverFunction);
//
// function __guard__(value, transform) {
//   return typeof value !== 'undefined' && value !== null ? transform(value) : undefined;
// }
// function __guardMethod__(obj, methodName, transform) {
//   if (typeof obj !== 'undefined' && obj !== null && typeof obj[methodName] === 'function') {
//     return transform(obj, methodName);
//   } else {
//     return undefined;
//   }
// }
//
//
//
//
//
// // todo: ukryj sekcje z contentem, pokaz po uploadzie (upload ukryj)
//
// /* Dropzone */
//
// $(function() {
// Dropzone.options.dropzoneElement = {
//     maxFilesize: 500,
//     autoProcessQueue: false,
//     init: function() {
//
//         var submitButton = document.querySelector("#btnUpload")
//         myDropzone = this;
//
//         submitButton.addEventListener("click", function() {
//
//             /* Check if file is selected for upload */
//             if (myDropzone.getUploadingFiles().length === 0 && myDropzone.getQueuedFiles().length === 0) {
//                 alert('No file selected for upload');
//                 return false;
//             }
//             else {
//                 /* Remove event listener and start processing */
//                 myDropzone.removeEventListeners();
//                 myDropzone.processQueue();
//
//             }
//         });
//
//
//         /* On Success, do whatever you want */
//         this.on("success", function(file, responseText) {
//             alert('Success');
//         });
//     }
// };
// });
//
//
// /*jslint onevar:true, undef:true, newcap:true, regexp:true, bitwise:true, maxerr:50, indent:4, white:false, nomen:false, plusplus:false */
// /*global define:false, require:false, exports:false, module:false, signals:false */
//
// /** @license
//  * JS Signals <http://millermedeiros.github.com/js-signals/>
//  * Released under the MIT license
//  * Author: Miller Medeiros
//  * Version: 1.0.0 - Build: 268 (2012/11/29 05:48 PM)
//  */
//
// (function(global){
//
//     // SignalBinding -------------------------------------------------
//     //================================================================
//
//     /**
//      * Object that represents a binding between a Signal and a listener function.
//      * <br />- <strong>This is an internal constructor and shouldn't be called by regular users.</strong>
//      * <br />- inspired by Joa Ebert AS3 SignalBinding and Robert Penner's Slot classes.
//      * @author Miller Medeiros
//      * @constructor
//      * @internal
//      * @name SignalBinding
//      * @param {Signal} signal Reference to Signal object that listener is currently bound to.
//      * @param {Function} listener Handler function bound to the signal.
//      * @param {boolean} isOnce If binding should be executed just once.
//      * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
//      * @param {Number} [priority] The priority level of the event listener. (default = 0).
//      */
//     function SignalBinding(signal, listener, isOnce, listenerContext, priority) {
//
//         /**
//          * Handler function bound to the signal.
//          * @type Function
//          * @private
//          */
//         this._listener = listener;
//
//         /**
//          * If binding should be executed just once.
//          * @type boolean
//          * @private
//          */
//         this._isOnce = isOnce;
//
//         /**
//          * Context on which listener will be executed (object that should represent the `this` variable inside listener function).
//          * @memberOf SignalBinding.prototype
//          * @name context
//          * @type Object|undefined|null
//          */
//         this.context = listenerContext;
//
//         /**
//          * Reference to Signal object that listener is currently bound to.
//          * @type Signal
//          * @private
//          */
//         this._signal = signal;
//
//         /**
//          * Listener priority
//          * @type Number
//          * @private
//          */
//         this._priority = priority || 0;
//     }
//
//     SignalBinding.prototype = {
//
//         /**
//          * If binding is active and should be executed.
//          * @type boolean
//          */
//         active : true,
//
//         /**
//          * Default parameters passed to listener during `Signal.dispatch` and `SignalBinding.execute`. (curried parameters)
//          * @type Array|null
//          */
//         params : null,
//
//         /**
//          * Call listener passing arbitrary parameters.
//          * <p>If binding was added using `Signal.addOnce()` it will be automatically removed from signal dispatch queue, this method is used internally for the signal dispatch.</p>
//          * @param {Array} [paramsArr] Array of parameters that should be passed to the listener
//          * @return {*} Value returned by the listener.
//          */
//         execute : function (paramsArr) {
//             var handlerReturn, params;
//             if (this.active && !!this._listener) {
//                 params = this.params? this.params.concat(paramsArr) : paramsArr;
//                 handlerReturn = this._listener.apply(this.context, params);
//                 if (this._isOnce) {
//                     this.detach();
//                 }
//             }
//             return handlerReturn;
//         },
//
//         /**
//          * Detach binding from signal.
//          * - alias to: mySignal.remove(myBinding.getListener());
//          * @return {Function|null} Handler function bound to the signal or `null` if binding was previously detached.
//          */
//         detach : function () {
//             return this.isBound()? this._signal.remove(this._listener, this.context) : null;
//         },
//
//         /**
//          * @return {Boolean} `true` if binding is still bound to the signal and have a listener.
//          */
//         isBound : function () {
//             return (!!this._signal && !!this._listener);
//         },
//
//         /**
//          * @return {boolean} If SignalBinding will only be executed once.
//          */
//         isOnce : function () {
//             return this._isOnce;
//         },
//
//         /**
//          * @return {Function} Handler function bound to the signal.
//          */
//         getListener : function () {
//             return this._listener;
//         },
//
//         /**
//          * @return {Signal} Signal that listener is currently bound to.
//          */
//         getSignal : function () {
//             return this._signal;
//         },
//
//         /**
//          * Delete instance properties
//          * @private
//          */
//         _destroy : function () {
//             delete this._signal;
//             delete this._listener;
//             delete this.context;
//         },
//
//         /**
//          * @return {string} String representation of the object.
//          */
//         toString : function () {
//             return '[SignalBinding isOnce:' + this._isOnce +', isBound:'+ this.isBound() +', active:' + this.active + ']';
//         }
//
//     };
//
//
// /*global SignalBinding:false*/
//
//     // Signal --------------------------------------------------------
//     //================================================================
//
//     function validateListener(listener, fnName) {
//         if (typeof listener !== 'function') {
//             throw new Error( 'listener is a required param of {fn}() and should be a Function.'.replace('{fn}', fnName) );
//         }
//     }
//
//     /**
//      * Custom event broadcaster
//      * <br />- inspired by Robert Penner's AS3 Signals.
//      * @name Signal
//      * @author Miller Medeiros
//      * @constructor
//      */
//     function Signal() {
//         /**
//          * @type Array.<SignalBinding>
//          * @private
//          */
//         this._bindings = [];
//         this._prevParams = null;
//
//         // enforce dispatch to aways work on same context (#47)
//         var self = this;
//         this.dispatch = function(){
//             Signal.prototype.dispatch.apply(self, arguments);
//         };
//     }
//
//     Signal.prototype = {
//
//         /**
//          * Signals Version Number
//          * @type String
//          * @const
//          */
//         VERSION : '1.0.0',
//
//         /**
//          * If Signal should keep record of previously dispatched parameters and
//          * automatically execute listener during `add()`/`addOnce()` if Signal was
//          * already dispatched before.
//          * @type boolean
//          */
//         memorize : false,
//
//         /**
//          * @type boolean
//          * @private
//          */
//         _shouldPropagate : true,
//
//         /**
//          * If Signal is active and should broadcast events.
//          * <p><strong>IMPORTANT:</strong> Setting this property during a dispatch will only affect the next dispatch, if you want to stop the propagation of a signal use `halt()` instead.</p>
//          * @type boolean
//          */
//         active : true,
//
//         /**
//          * @param {Function} listener
//          * @param {boolean} isOnce
//          * @param {Object} [listenerContext]
//          * @param {Number} [priority]
//          * @return {SignalBinding}
//          * @private
//          */
//         _registerListener : function (listener, isOnce, listenerContext, priority) {
//
//             var prevIndex = this._indexOfListener(listener, listenerContext),
//                 binding;
//
//             if (prevIndex !== -1) {
//                 binding = this._bindings[prevIndex];
//                 if (binding.isOnce() !== isOnce) {
//                     throw new Error('You cannot add'+ (isOnce? '' : 'Once') +'() then add'+ (!isOnce? '' : 'Once') +'() the same listener without removing the relationship first.');
//                 }
//             } else {
//                 binding = new SignalBinding(this, listener, isOnce, listenerContext, priority);
//                 this._addBinding(binding);
//             }
//
//             if(this.memorize && this._prevParams){
//                 binding.execute(this._prevParams);
//             }
//
//             return binding;
//         },
//
//         /**
//          * @param {SignalBinding} binding
//          * @private
//          */
//         _addBinding : function (binding) {
//             //simplified insertion sort
//             var n = this._bindings.length;
//             do { --n; } while (this._bindings[n] && binding._priority <= this._bindings[n]._priority);
//             this._bindings.splice(n + 1, 0, binding);
//         },
//
//         /**
//          * @param {Function} listener
//          * @return {number}
//          * @private
//          */
//         _indexOfListener : function (listener, context) {
//             var n = this._bindings.length,
//                 cur;
//             while (n--) {
//                 cur = this._bindings[n];
//                 if (cur._listener === listener && cur.context === context) {
//                     return n;
//                 }
//             }
//             return -1;
//         },
//
//         /**
//          * Check if listener was attached to Signal.
//          * @param {Function} listener
//          * @param {Object} [context]
//          * @return {boolean} if Signal has the specified listener.
//          */
//         has : function (listener, context) {
//             return this._indexOfListener(listener, context) !== -1;
//         },
//
//         /**
//          * Add a listener to the signal.
//          * @param {Function} listener Signal handler function.
//          * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
//          * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
//          * @return {SignalBinding} An Object representing the binding between the Signal and listener.
//          */
//         add : function (listener, listenerContext, priority) {
//             validateListener(listener, 'add');
//             return this._registerListener(listener, false, listenerContext, priority);
//         },
//
//         /**
//          * Add listener to the signal that should be removed after first execution (will be executed only once).
//          * @param {Function} listener Signal handler function.
//          * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
//          * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
//          * @return {SignalBinding} An Object representing the binding between the Signal and listener.
//          */
//         addOnce : function (listener, listenerContext, priority) {
//             validateListener(listener, 'addOnce');
//             return this._registerListener(listener, true, listenerContext, priority);
//         },
//
//         /**
//          * Remove a single listener from the dispatch queue.
//          * @param {Function} listener Handler function that should be removed.
//          * @param {Object} [context] Execution context (since you can add the same handler multiple times if executing in a different context).
//          * @return {Function} Listener handler function.
//          */
//         remove : function (listener, context) {
//             validateListener(listener, 'remove');
//
//             var i = this._indexOfListener(listener, context);
//             if (i !== -1) {
//                 this._bindings[i]._destroy(); //no reason to a SignalBinding exist if it isn't attached to a signal
//                 this._bindings.splice(i, 1);
//             }
//             return listener;
//         },
//
//         /**
//          * Remove all listeners from the Signal.
//          */
//         removeAll : function () {
//             var n = this._bindings.length;
//             while (n--) {
//                 this._bindings[n]._destroy();
//             }
//             this._bindings.length = 0;
//         },
//
//         /**
//          * @return {number} Number of listeners attached to the Signal.
//          */
//         getNumListeners : function () {
//             return this._bindings.length;
//         },
//
//         /**
//          * Stop propagation of the event, blocking the dispatch to next listeners on the queue.
//          * <p><strong>IMPORTANT:</strong> should be called only during signal dispatch, calling it before/after dispatch won't affect signal broadcast.</p>
//          * @see Signal.prototype.disable
//          */
//         halt : function () {
//             this._shouldPropagate = false;
//         },
//
//         /**
//          * Dispatch/Broadcast Signal to all listeners added to the queue.
//          * @param {...*} [params] Parameters that should be passed to each handler.
//          */
//         dispatch : function (params) {
//             if (! this.active) {
//                 return;
//             }
//
//             var paramsArr = Array.prototype.slice.call(arguments),
//                 n = this._bindings.length,
//                 bindings;
//
//             if (this.memorize) {
//                 this._prevParams = paramsArr;
//             }
//
//             if (! n) {
//                 //should come after memorize
//                 return;
//             }
//
//             bindings = this._bindings.slice(); //clone array in case add/remove items during dispatch
//             this._shouldPropagate = true; //in case `halt` was called before dispatch or during the previous dispatch.
//
//             //execute all callbacks until end of the list or until a callback returns `false` or stops propagation
//             //reverse loop since listeners with higher priority will be added at the end of the list
//             do { n--; } while (bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);
//         },
//
//         /**
//          * Forget memorized arguments.
//          * @see Signal.memorize
//          */
//         forget : function(){
//             this._prevParams = null;
//         },
//
//         /**
//          * Remove all bindings from signal and destroy any reference to external objects (destroy Signal object).
//          * <p><strong>IMPORTANT:</strong> calling any method on the signal instance after calling dispose will throw errors.</p>
//          */
//         dispose : function () {
//             this.removeAll();
//             delete this._bindings;
//             delete this._prevParams;
//         },
//
//         /**
//          * @return {string} String representation of the object.
//          */
//         toString : function () {
//             return '[Signal active:'+ this.active +' numListeners:'+ this.getNumListeners() +']';
//         }
//
//     };
//
//
//     // Namespace -----------------------------------------------------
//     //================================================================
//
//     /**
//      * Signals namespace
//      * @namespace
//      * @name signals
//      */
//     var signals = Signal;
//
//     /**
//      * Custom event broadcaster
//      * @see Signal
//      */
//     // alias for backwards compatibility (see #gh-44)
//     signals.Signal = Signal;
//
//
//
//     //exports to multiple environments
//     if(typeof define === 'function' && define.amd){ //AMD
//         define(function () { return signals; });
//     } else if (typeof module !== 'undefined' && module.exports){ //node
//         module.exports = signals;
//     } else { //browser
//         //use string because of Google closure compiler ADVANCED_MODE
//         /*jslint sub:true */
//         global['signals'] = signals;
//     }
//
// }(this));
//
// 'use strict';
//
// module.exports = function(grunt) {
//
//   grunt.initConfig({
//     pkg: grunt.file.readJSON('package.json'),
//     jshint: {
//       options: {
//         "curly": true,
//         "eqeqeq": true,
//         "immed": true,
//         "latedef": "nofunc",
//         "newcap": true,
//         "noarg": true,
//         "sub": true,
//         "undef": true,
//         "unused": true,
//         "boss": true,
//         "eqnull": true,
//         "node": true,
//         "mocha": true,
//         "ignores": ['test/require.js', 'src/jquery.csv.min.js']
//       },
//       tasks: {
//         src: ['examples/*.js', 'src/*.js', 'test/*.js']
//       },
//     },
//     htmlhint: {
//       build: {
//         options: {
//             'tag-pair': true,
//             'tagname-lowercase': true,
//             'attr-lowercase': true,
//             'attr-value-double-quotes': true,
//             'doctype-first': true,
//             'spec-char-escape': true,
//             'id-unique': true,
//             'head-script-disabled': true,
//             'style-disabled': false
//         },
//         src: ['examples/*.html', 'test/test.html']
//       }
//     },
//     uglify: {
//       build: {
//         files: {
//             'src/jquery.csv.min.js': ['src/jquery.csv.js']
//         }
//       }
//     }
//   });
//
//   // These plugins provide necessary tasks.
//   grunt.loadNpmTasks('grunt-contrib-uglify');
//   grunt.loadNpmTasks('grunt-contrib-jshint');
//   grunt.loadNpmTasks('grunt-htmlhint');
//
//   // Default task.
//   grunt.registerTask('default', ['jshint']);
//
// };
//
// var fs = require('fs');
// var $ = jQuery = require('jQuery');
// require('../src/jquery.csv.js');
//
// var sample = './data/sample.csv';
// fs.readFile(sample, 'UTF-8', function(err, csv) {
//   $.csv.toArrays(csv, {}, function(err, data) {
//     for(var i=0, len=data.length; i<len; i++) {
//       console.log(data[i]);
//     }
//   });
// });
// var assert = require('chai').assert;
// var expect = require('chai').expect;
// var should = require('chai').should();
//
// var csv      = require('../src/jquery.csv.js');
// var fixtures = require('./fixtures/fixtures.js');
//
// describe('core:', function () {
//
//   describe('toArray', function () {
//     it ('should be able to parse an entry containing multiple cells', function () {
//       var out = csv.toArray(fixtures.array_csv);
//       assert.deepEqual(out, fixtures.array_obj);
//     });
//
//     it ('should return [""] when input is empty', function () {
//       var out = csv.toArray('');
//       out.should.have.length(1);
//     });
//
//     it ('should return ["a1"] when input is "a1"', function () {
//       var out = csv.toArray('a1');
//       out.should.have.length(1);
//       out[0].should.equal('a1');
//     });
//   });
//
// //describe('fromArray', function () {
// //  it ('should be able to format a multi-cell entry', function () {
// //    var out = csv.fromArray(fixtures.array_obj);
// //    assert.deepEqual(out, fixtures.array_csv);
// //  });
// //});
//
//   describe('toArrays', function () {
//     it ('should be able to parse multi-entry/multi-cell input', function () {
//       var out = csv.toArrays(fixtures.arrays_csv);
//       assert.deepEqual(out, fixtures.arrays_obj);
//     });
//   });
//
// //  describe('fromArrays', function() {
// //    it ('should be able to format multi-entry/multi-cell data set', function() {
// //      var out = csv.fromArrays(fixtures.arrays_obj);
// //      assert.deepEqual(out, fixtures.arrays_csv);
// //    });
// //  });
// });
//
// describe('RFC 4180 Compliance', function () {
//   it ('should follow Rule #1 - One entry per line, each line ends with a newline', function () {
//     var out = csv.toArrays(fixtures.rfc1_csv);
//     assert.deepEqual(out, fixtures.rfc1_obj);
//   });
//
//   it ('should follow Rule #2 - Trailing newline at the end of the file ommitted', function () {
//     var out = csv.toArrays(fixtures.rfc2_csv);
//     assert.deepEqual(out, fixtures.rfc2_obj);
//   });
//
//   it ('should follow Rule #3 - First row contains header data', function () {
//     var out = csv.toObjects(fixtures.rfc3_csv);
//     assert.deepEqual(out, fixtures.rfc3_obj);
//   });
//
//   it ('should follow Rule #4 - Spaces are considered data and entries should not contain a trailing comma', function () {
//     var out = csv.toArray(fixtures.rfc4_csv);
//     assert.deepEqual(out, fixtures.rfc4_obj);
//   });
//
//   it ('should follow Rule #5 - Lines may or may not be delimited by double-quotes', function () {
//     var out = csv.toArrays(fixtures.rfc5_csv);
//     assert.deepEqual(out, fixtures.rfc5_obj);
//   });
//
//   it ('should follow Rule #6 - Fields containing line breaks, double-quotes, and commas should be enclosed in double-quotes', function () {
//     var out = csv.toArrays(fixtures.rfc6_csv);
//     assert.deepEqual(out, fixtures.rfc6_obj);
//   });
//
//   it ('should follow Rule #7 - If double-quotes are used to enclose fields, then a double-quote appering inside a field must be escaped by a preceding it with another double-quote', function () {
//     var out = csv.toArray(fixtures.rfc7_csv);
//     assert.deepEqual(out, fixtures.rfc7_obj);
//   });
//
//   it ('should follow Amendment #1 - An unquoted field may contain a null (ie empty) value', function () {
//     var out = csv.toArray(fixtures.rfcA1_csv);
//     assert.deepEqual(out, fixtures.rfcA1_obj);
//   });
//
//   it ('should follow Amendment #2 - A quoted field may contain a null (ie empty) value', function() {
//     var out = csv.toArray(fixtures.rfcA2_csv);
//     assert.deepEqual(out, fixtures.rfcA2_obj);
//   });
//
//   it ('should follow Amendment #3 - The last field in an entry may contain a null (ie empty) value', function() {
//     var out = csv.toArray(fixtures.rfcA3_csv);
//     assert.deepEqual(out, fixtures.rfcA3_obj);
//   });
// });
//
// describe('line endings:', function () {
//   it ('should support \\n (unix) line endings', function () {
//     var out = csv.toArrays(fixtures.newline_unix);
//     out.should.have.length(2);
//   });
//
//   it ('should support \\r (mac) line endings', function () {
//     var out = csv.toArrays(fixtures.newline_mac);
//     out.should.have.length(2);
//   });
//
//   it ('should support \\r\\n (dos) line endings', function () {
//     var out = csv.toArrays(fixtures.newline_dos);
//     out.should.have.length(2);
//   });
// });
//
// describe('custom terminals (ie delimiter, separator', function() {
//   it ('should parse using the default terminals', function() {
//     var out = csv.toArray(fixtures.defaults_csv);
//     assert.deepEqual(out, fixtures.defaults_obj);
//   });
//
//   it ('should parse using a custom delimiter', function() {
//     var out = csv.toArray(fixtures.delimiter_csv, { delimiter:"'" });
//     assert.deepEqual(out, fixtures.delimiter_obj);
//   });
//
//   it ('should parse using a custom separator', function() {
//     var out = csv.toArray(fixtures.separator_csv, { separator:";"});
//     assert.deepEqual(out, fixtures.separator_obj);
//   });
//
//   it ('should properly escape regex special chars', function() {
//     var out = csv.toArray(fixtures.regex_csv, { separator:'|'});
//     assert.deepEqual(out, fixtures.regex_obj);
//   });
//
//   it ('should support custom terminals via toArrays()', function() {
//     var out = csv.toArrays(fixtures.term_arrays_csv, { delimiter: '*', separator:':' });
//     assert.deepEqual(out, fixtures.term_arrays_obj);
//   });
//
//   it ('should support custom terminals via toObjects()', function() {
//     var out = csv.toObjects(fixtures.term_objects_csv, { delimiter: '^', separator: '&'} );
//     assert.deepEqual(out, fixtures.term_objects_obj);
//   });
// });
//
//
// //describe('custom start/end points', function() {
// //  it('should start at a certain point when used on toArrays()', function() {
// //  });
// //});
// require.config({
//   baseUrl: '/',
//   paths: {
//     'jquery'        : '../../node_modules/jquery/dist/jquery',
//     'jquery-csv'    : '../../src/jquery.csv',
//     'mocha'         : '../../node_modules/mocha/mocha',
//     'chai'          : '../../node_modules/chai/chai',
//   },
//   shim: {
//     'mocha': {
//       exports: 'mocha'
//     },
//     'chai': {
//       exports: 'chai'
//     },
//     'jquery-csv' : {
//       deps: ['jquery'],
//       exports: 'jQuery.fn.csv',
//     }
//   },
// });
//
// define(function(require) {
//   $ = require('jquery');
//   $.csv = require('jquery-csv');
//
//   // chai setup
//   var chai = require('chai');
//   var expect = chai.expect();
//   var should = chai.should();
//
//   // mocha setup
//   var mocha = require('mocha');
//   mocha.setup('bdd');
//   mocha.reporter('html');
//   mocha.bail(false);
//
//   require(['test.js', 'jquery', 'jquery-csv'], function(require, $, csv) {
//     $.csv = csv;
//     if (window.mochaPhantomJS) {
//       mochaPhantomJS.run();
//     }
//     else {
//       mocha.run();
//     }
//   });
// });
//
// /*
//  RequireJS 2.1.16 Copyright (c) 2010-2015, The Dojo Foundation All Rights Reserved.
//  Available via the MIT or new BSD license.
//  see: http://github.com/jrburke/requirejs for details
// */
// var requirejs,require,define;
// (function(ba){function G(b){return"[object Function]"===K.call(b)}function H(b){return"[object Array]"===K.call(b)}function v(b,c){if(b){var d;for(d=0;d<b.length&&(!b[d]||!c(b[d],d,b));d+=1);}}function T(b,c){if(b){var d;for(d=b.length-1;-1<d&&(!b[d]||!c(b[d],d,b));d-=1);}}function t(b,c){return fa.call(b,c)}function m(b,c){return t(b,c)&&b[c]}function B(b,c){for(var d in b)if(t(b,d)&&c(b[d],d))break}function U(b,c,d,e){c&&B(c,function(c,g){if(d||!t(b,g))e&&"object"===typeof c&&c&&!H(c)&&!G(c)&&!(c instanceof
// RegExp)?(b[g]||(b[g]={}),U(b[g],c,d,e)):b[g]=c});return b}function u(b,c){return function(){return c.apply(b,arguments)}}function ca(b){throw b;}function da(b){if(!b)return b;var c=ba;v(b.split("."),function(b){c=c[b]});return c}function C(b,c,d,e){c=Error(c+"\nhttp://requirejs.org/docs/errors.html#"+b);c.requireType=b;c.requireModules=e;d&&(c.originalError=d);return c}function ga(b){function c(a,k,b){var f,l,c,d,e,g,i,p,k=k&&k.split("/"),h=j.map,n=h&&h["*"];if(a){a=a.split("/");l=a.length-1;j.nodeIdCompat&&
// Q.test(a[l])&&(a[l]=a[l].replace(Q,""));"."===a[0].charAt(0)&&k&&(l=k.slice(0,k.length-1),a=l.concat(a));l=a;for(c=0;c<l.length;c++)if(d=l[c],"."===d)l.splice(c,1),c-=1;else if(".."===d&&!(0===c||1==c&&".."===l[2]||".."===l[c-1])&&0<c)l.splice(c-1,2),c-=2;a=a.join("/")}if(b&&h&&(k||n)){l=a.split("/");c=l.length;a:for(;0<c;c-=1){e=l.slice(0,c).join("/");if(k)for(d=k.length;0<d;d-=1)if(b=m(h,k.slice(0,d).join("/")))if(b=m(b,e)){f=b;g=c;break a}!i&&(n&&m(n,e))&&(i=m(n,e),p=c)}!f&&i&&(f=i,g=p);f&&(l.splice(0,
// g,f),a=l.join("/"))}return(f=m(j.pkgs,a))?f:a}function d(a){z&&v(document.getElementsByTagName("script"),function(k){if(k.getAttribute("data-requiremodule")===a&&k.getAttribute("data-requirecontext")===i.contextName)return k.parentNode.removeChild(k),!0})}function e(a){var k=m(j.paths,a);if(k&&H(k)&&1<k.length)return k.shift(),i.require.undef(a),i.makeRequire(null,{skipMap:!0})([a]),!0}function n(a){var k,c=a?a.indexOf("!"):-1;-1<c&&(k=a.substring(0,c),a=a.substring(c+1,a.length));return[k,a]}function p(a,
// k,b,f){var l,d,e=null,g=k?k.name:null,j=a,p=!0,h="";a||(p=!1,a="_@r"+(K+=1));a=n(a);e=a[0];a=a[1];e&&(e=c(e,g,f),d=m(r,e));a&&(e?h=d&&d.normalize?d.normalize(a,function(a){return c(a,g,f)}):-1===a.indexOf("!")?c(a,g,f):a:(h=c(a,g,f),a=n(h),e=a[0],h=a[1],b=!0,l=i.nameToUrl(h)));b=e&&!d&&!b?"_unnormalized"+(O+=1):"";return{prefix:e,name:h,parentMap:k,unnormalized:!!b,url:l,originalName:j,isDefine:p,id:(e?e+"!"+h:h)+b}}function s(a){var k=a.id,b=m(h,k);b||(b=h[k]=new i.Module(a));return b}function q(a,
// k,b){var f=a.id,c=m(h,f);if(t(r,f)&&(!c||c.defineEmitComplete))"defined"===k&&b(r[f]);else if(c=s(a),c.error&&"error"===k)b(c.error);else c.on(k,b)}function w(a,b){var c=a.requireModules,f=!1;if(b)b(a);else if(v(c,function(b){if(b=m(h,b))b.error=a,b.events.error&&(f=!0,b.emit("error",a))}),!f)g.onError(a)}function x(){R.length&&(ha.apply(A,[A.length,0].concat(R)),R=[])}function y(a){delete h[a];delete V[a]}function F(a,b,c){var f=a.map.id;a.error?a.emit("error",a.error):(b[f]=!0,v(a.depMaps,function(f,
// d){var e=f.id,g=m(h,e);g&&(!a.depMatched[d]&&!c[e])&&(m(b,e)?(a.defineDep(d,r[e]),a.check()):F(g,b,c))}),c[f]=!0)}function D(){var a,b,c=(a=1E3*j.waitSeconds)&&i.startTime+a<(new Date).getTime(),f=[],l=[],g=!1,h=!0;if(!W){W=!0;B(V,function(a){var i=a.map,j=i.id;if(a.enabled&&(i.isDefine||l.push(a),!a.error))if(!a.inited&&c)e(j)?g=b=!0:(f.push(j),d(j));else if(!a.inited&&(a.fetched&&i.isDefine)&&(g=!0,!i.prefix))return h=!1});if(c&&f.length)return a=C("timeout","Load timeout for modules: "+f,null,
// f),a.contextName=i.contextName,w(a);h&&v(l,function(a){F(a,{},{})});if((!c||b)&&g)if((z||ea)&&!X)X=setTimeout(function(){X=0;D()},50);W=!1}}function E(a){t(r,a[0])||s(p(a[0],null,!0)).init(a[1],a[2])}function I(a){var a=a.currentTarget||a.srcElement,b=i.onScriptLoad;a.detachEvent&&!Y?a.detachEvent("onreadystatechange",b):a.removeEventListener("load",b,!1);b=i.onScriptError;(!a.detachEvent||Y)&&a.removeEventListener("error",b,!1);return{node:a,id:a&&a.getAttribute("data-requiremodule")}}function J(){var a;
// for(x();A.length;){a=A.shift();if(null===a[0])return w(C("mismatch","Mismatched anonymous define() module: "+a[a.length-1]));E(a)}}var W,Z,i,L,X,j={waitSeconds:7,baseUrl:"./",paths:{},bundles:{},pkgs:{},shim:{},config:{}},h={},V={},$={},A=[],r={},S={},aa={},K=1,O=1;L={require:function(a){return a.require?a.require:a.require=i.makeRequire(a.map)},exports:function(a){a.usingExports=!0;if(a.map.isDefine)return a.exports?r[a.map.id]=a.exports:a.exports=r[a.map.id]={}},module:function(a){return a.module?
// a.module:a.module={id:a.map.id,uri:a.map.url,config:function(){return m(j.config,a.map.id)||{}},exports:a.exports||(a.exports={})}}};Z=function(a){this.events=m($,a.id)||{};this.map=a;this.shim=m(j.shim,a.id);this.depExports=[];this.depMaps=[];this.depMatched=[];this.pluginMaps={};this.depCount=0};Z.prototype={init:function(a,b,c,f){f=f||{};if(!this.inited){this.factory=b;if(c)this.on("error",c);else this.events.error&&(c=u(this,function(a){this.emit("error",a)}));this.depMaps=a&&a.slice(0);this.errback=
// c;this.inited=!0;this.ignore=f.ignore;f.enabled||this.enabled?this.enable():this.check()}},defineDep:function(a,b){this.depMatched[a]||(this.depMatched[a]=!0,this.depCount-=1,this.depExports[a]=b)},fetch:function(){if(!this.fetched){this.fetched=!0;i.startTime=(new Date).getTime();var a=this.map;if(this.shim)i.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],u(this,function(){return a.prefix?this.callPlugin():this.load()}));else return a.prefix?this.callPlugin():this.load()}},load:function(){var a=
// this.map.url;S[a]||(S[a]=!0,i.load(this.map.id,a))},check:function(){if(this.enabled&&!this.enabling){var a,b,c=this.map.id;b=this.depExports;var f=this.exports,l=this.factory;if(this.inited)if(this.error)this.emit("error",this.error);else{if(!this.defining){this.defining=!0;if(1>this.depCount&&!this.defined){if(G(l)){if(this.events.error&&this.map.isDefine||g.onError!==ca)try{f=i.execCb(c,l,b,f)}catch(d){a=d}else f=i.execCb(c,l,b,f);this.map.isDefine&&void 0===f&&((b=this.module)?f=b.exports:this.usingExports&&
// (f=this.exports));if(a)return a.requireMap=this.map,a.requireModules=this.map.isDefine?[this.map.id]:null,a.requireType=this.map.isDefine?"define":"require",w(this.error=a)}else f=l;this.exports=f;if(this.map.isDefine&&!this.ignore&&(r[c]=f,g.onResourceLoad))g.onResourceLoad(i,this.map,this.depMaps);y(c);this.defined=!0}this.defining=!1;this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else this.fetch()}},callPlugin:function(){var a=
// this.map,b=a.id,d=p(a.prefix);this.depMaps.push(d);q(d,"defined",u(this,function(f){var l,d;d=m(aa,this.map.id);var e=this.map.name,P=this.map.parentMap?this.map.parentMap.name:null,n=i.makeRequire(a.parentMap,{enableBuildCallback:!0});if(this.map.unnormalized){if(f.normalize&&(e=f.normalize(e,function(a){return c(a,P,!0)})||""),f=p(a.prefix+"!"+e,this.map.parentMap),q(f,"defined",u(this,function(a){this.init([],function(){return a},null,{enabled:!0,ignore:!0})})),d=m(h,f.id)){this.depMaps.push(f);
// if(this.events.error)d.on("error",u(this,function(a){this.emit("error",a)}));d.enable()}}else d?(this.map.url=i.nameToUrl(d),this.load()):(l=u(this,function(a){this.init([],function(){return a},null,{enabled:!0})}),l.error=u(this,function(a){this.inited=!0;this.error=a;a.requireModules=[b];B(h,function(a){0===a.map.id.indexOf(b+"_unnormalized")&&y(a.map.id)});w(a)}),l.fromText=u(this,function(f,c){var d=a.name,e=p(d),P=M;c&&(f=c);P&&(M=!1);s(e);t(j.config,b)&&(j.config[d]=j.config[b]);try{g.exec(f)}catch(h){return w(C("fromtexteval",
// "fromText eval for "+b+" failed: "+h,h,[b]))}P&&(M=!0);this.depMaps.push(e);i.completeLoad(d);n([d],l)}),f.load(a.name,n,l,j))}));i.enable(d,this);this.pluginMaps[d.id]=d},enable:function(){V[this.map.id]=this;this.enabling=this.enabled=!0;v(this.depMaps,u(this,function(a,b){var c,f;if("string"===typeof a){a=p(a,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap);this.depMaps[b]=a;if(c=m(L,a.id)){this.depExports[b]=c(this);return}this.depCount+=1;q(a,"defined",u(this,function(a){this.defineDep(b,
// a);this.check()}));this.errback?q(a,"error",u(this,this.errback)):this.events.error&&q(a,"error",u(this,function(a){this.emit("error",a)}))}c=a.id;f=h[c];!t(L,c)&&(f&&!f.enabled)&&i.enable(a,this)}));B(this.pluginMaps,u(this,function(a){var b=m(h,a.id);b&&!b.enabled&&i.enable(a,this)}));this.enabling=!1;this.check()},on:function(a,b){var c=this.events[a];c||(c=this.events[a]=[]);c.push(b)},emit:function(a,b){v(this.events[a],function(a){a(b)});"error"===a&&delete this.events[a]}};i={config:j,contextName:b,
// registry:h,defined:r,urlFetched:S,defQueue:A,Module:Z,makeModuleMap:p,nextTick:g.nextTick,onError:w,configure:function(a){a.baseUrl&&"/"!==a.baseUrl.charAt(a.baseUrl.length-1)&&(a.baseUrl+="/");var b=j.shim,c={paths:!0,bundles:!0,config:!0,map:!0};B(a,function(a,b){c[b]?(j[b]||(j[b]={}),U(j[b],a,!0,!0)):j[b]=a});a.bundles&&B(a.bundles,function(a,b){v(a,function(a){a!==b&&(aa[a]=b)})});a.shim&&(B(a.shim,function(a,c){H(a)&&(a={deps:a});if((a.exports||a.init)&&!a.exportsFn)a.exportsFn=i.makeShimExports(a);
// b[c]=a}),j.shim=b);a.packages&&v(a.packages,function(a){var b,a="string"===typeof a?{name:a}:a;b=a.name;a.location&&(j.paths[b]=a.location);j.pkgs[b]=a.name+"/"+(a.main||"main").replace(ia,"").replace(Q,"")});B(h,function(a,b){!a.inited&&!a.map.unnormalized&&(a.map=p(b))});if(a.deps||a.callback)i.require(a.deps||[],a.callback)},makeShimExports:function(a){return function(){var b;a.init&&(b=a.init.apply(ba,arguments));return b||a.exports&&da(a.exports)}},makeRequire:function(a,e){function j(c,d,m){var n,
// q;e.enableBuildCallback&&(d&&G(d))&&(d.__requireJsBuild=!0);if("string"===typeof c){if(G(d))return w(C("requireargs","Invalid require call"),m);if(a&&t(L,c))return L[c](h[a.id]);if(g.get)return g.get(i,c,a,j);n=p(c,a,!1,!0);n=n.id;return!t(r,n)?w(C("notloaded",'Module name "'+n+'" has not been loaded yet for context: '+b+(a?"":". Use require([])"))):r[n]}J();i.nextTick(function(){J();q=s(p(null,a));q.skipMap=e.skipMap;q.init(c,d,m,{enabled:!0});D()});return j}e=e||{};U(j,{isBrowser:z,toUrl:function(b){var d,
// e=b.lastIndexOf("."),k=b.split("/")[0];if(-1!==e&&(!("."===k||".."===k)||1<e))d=b.substring(e,b.length),b=b.substring(0,e);return i.nameToUrl(c(b,a&&a.id,!0),d,!0)},defined:function(b){return t(r,p(b,a,!1,!0).id)},specified:function(b){b=p(b,a,!1,!0).id;return t(r,b)||t(h,b)}});a||(j.undef=function(b){x();var c=p(b,a,!0),e=m(h,b);d(b);delete r[b];delete S[c.url];delete $[b];T(A,function(a,c){a[0]===b&&A.splice(c,1)});e&&(e.events.defined&&($[b]=e.events),y(b))});return j},enable:function(a){m(h,a.id)&&
// s(a).enable()},completeLoad:function(a){var b,c,d=m(j.shim,a)||{},g=d.exports;for(x();A.length;){c=A.shift();if(null===c[0]){c[0]=a;if(b)break;b=!0}else c[0]===a&&(b=!0);E(c)}c=m(h,a);if(!b&&!t(r,a)&&c&&!c.inited){if(j.enforceDefine&&(!g||!da(g)))return e(a)?void 0:w(C("nodefine","No define call for "+a,null,[a]));E([a,d.deps||[],d.exportsFn])}D()},nameToUrl:function(a,b,c){var d,e,h;(d=m(j.pkgs,a))&&(a=d);if(d=m(aa,a))return i.nameToUrl(d,b,c);if(g.jsExtRegExp.test(a))d=a+(b||"");else{d=j.paths;
// a=a.split("/");for(e=a.length;0<e;e-=1)if(h=a.slice(0,e).join("/"),h=m(d,h)){H(h)&&(h=h[0]);a.splice(0,e,h);break}d=a.join("/");d+=b||(/^data\:|\?/.test(d)||c?"":".js");d=("/"===d.charAt(0)||d.match(/^[\w\+\.\-]+:/)?"":j.baseUrl)+d}return j.urlArgs?d+((-1===d.indexOf("?")?"?":"&")+j.urlArgs):d},load:function(a,b){g.load(i,a,b)},execCb:function(a,b,c,d){return b.apply(d,c)},onScriptLoad:function(a){if("load"===a.type||ja.test((a.currentTarget||a.srcElement).readyState))N=null,a=I(a),i.completeLoad(a.id)},
// onScriptError:function(a){var b=I(a);if(!e(b.id))return w(C("scripterror","Script error for: "+b.id,a,[b.id]))}};i.require=i.makeRequire();return i}var g,x,y,D,I,E,N,J,s,O,ka=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,la=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,Q=/\.js$/,ia=/^\.\//;x=Object.prototype;var K=x.toString,fa=x.hasOwnProperty,ha=Array.prototype.splice,z=!!("undefined"!==typeof window&&"undefined"!==typeof navigator&&window.document),ea=!z&&"undefined"!==typeof importScripts,ja=
// z&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,Y="undefined"!==typeof opera&&"[object Opera]"===opera.toString(),F={},q={},R=[],M=!1;if("undefined"===typeof define){if("undefined"!==typeof requirejs){if(G(requirejs))return;q=requirejs;requirejs=void 0}"undefined"!==typeof require&&!G(require)&&(q=require,require=void 0);g=requirejs=function(b,c,d,e){var n,p="_";!H(b)&&"string"!==typeof b&&(n=b,H(c)?(b=c,c=d,d=e):b=[]);n&&n.context&&(p=n.context);(e=m(F,p))||(e=F[p]=g.s.newContext(p));
// n&&e.configure(n);return e.require(b,c,d)};g.config=function(b){return g(b)};g.nextTick="undefined"!==typeof setTimeout?function(b){setTimeout(b,4)}:function(b){b()};require||(require=g);g.version="2.1.16";g.jsExtRegExp=/^\/|:|\?|\.js$/;g.isBrowser=z;x=g.s={contexts:F,newContext:ga};g({});v(["toUrl","undef","defined","specified"],function(b){g[b]=function(){var c=F._;return c.require[b].apply(c,arguments)}});if(z&&(y=x.head=document.getElementsByTagName("head")[0],D=document.getElementsByTagName("base")[0]))y=
// x.head=D.parentNode;g.onError=ca;g.createNode=function(b){var c=b.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");c.type=b.scriptType||"text/javascript";c.charset="utf-8";c.async=!0;return c};g.load=function(b,c,d){var e=b&&b.config||{};if(z)return e=g.createNode(e,c,d),e.setAttribute("data-requirecontext",b.contextName),e.setAttribute("data-requiremodule",c),e.attachEvent&&!(e.attachEvent.toString&&0>e.attachEvent.toString().indexOf("[native code"))&&
// !Y?(M=!0,e.attachEvent("onreadystatechange",b.onScriptLoad)):(e.addEventListener("load",b.onScriptLoad,!1),e.addEventListener("error",b.onScriptError,!1)),e.src=d,J=e,D?y.insertBefore(e,D):y.appendChild(e),J=null,e;if(ea)try{importScripts(d),b.completeLoad(c)}catch(m){b.onError(C("importscripts","importScripts failed for "+c+" at "+d,m,[c]))}};z&&!q.skipDataMain&&T(document.getElementsByTagName("script"),function(b){y||(y=b.parentNode);if(I=b.getAttribute("data-main"))return s=I,q.baseUrl||(E=s.split("/"),
// s=E.pop(),O=E.length?E.join("/")+"/":"./",q.baseUrl=O),s=s.replace(Q,""),g.jsExtRegExp.test(s)&&(s=I),q.deps=q.deps?q.deps.concat(s):[s],!0});define=function(b,c,d){var e,g;"string"!==typeof b&&(d=c,c=b,b=null);H(c)||(d=c,c=null);!c&&G(d)&&(c=[],d.length&&(d.toString().replace(ka,"").replace(la,function(b,d){c.push(d)}),c=(1===d.length?["require"]:["require","exports","module"]).concat(c)));if(M){if(!(e=J))N&&"interactive"===N.readyState||T(document.getElementsByTagName("script"),function(b){if("interactive"===
// b.readyState)return N=b}),e=N;e&&(b||(b=e.getAttribute("data-requiremodule")),g=F[e.getAttribute("data-requirecontext")])}(g?g.defQueue:R).push([b,c,d])};define.amd={jQuery:!0};g.exec=function(b){return eval(b)};g(q)}})(this);
//
// var fs     = require('fs');
//
// (function (undefined) {
//   'use strict';
//
//   function csvFixture(fixtureName) {
//     return fs.readFileSync('./test/fixtures/' + fixtureName + '.csv', 'utf8');
//   }
//
//   function jsonFixture(fixtureName) {
//     return JSON.parse(fs.readFileSync('./test/fixtures/' + fixtureName + '.json'));
//   }
//
//   var fixtures = {
//     array_csv:        csvFixture('array'),
//     array_obj:        jsonFixture('array'),
//     arrays_csv:       csvFixture('arrays'),
//     arrays_obj:       jsonFixture('arrays'),
//     rfc1_csv:         csvFixture('rfc1'),
//     rfc1_obj:         jsonFixture('rfc1'),
//     rfc2_csv:         csvFixture('rfc2'),
//     rfc2_obj:         jsonFixture('rfc2'),
//     rfc3_csv:         csvFixture('rfc3'),
//     rfc3_obj:         jsonFixture('rfc3'),
//     rfc4_csv:         csvFixture('rfc4'),
//     rfc4_obj:         jsonFixture('rfc4'),
//     rfc5_csv:         csvFixture('rfc5'),
//     rfc5_obj:         jsonFixture('rfc5'),
//     rfc6_csv:         csvFixture('rfc6'),
//     rfc6_obj:         jsonFixture('rfc6'),
//     rfc7_csv:         csvFixture('rfc7'),
//     rfc7_obj:         jsonFixture('rfc7'),
//     rfcA1_csv:        csvFixture('rfcA1'),
//     rfcA1_obj:        jsonFixture('rfcA1'),
//     rfcA2_csv:        csvFixture('rfcA2'),
//     rfcA2_obj:        jsonFixture('rfcA2'),
//     rfcA3_csv:        csvFixture('rfcA3'),
//     rfcA3_obj:        jsonFixture('rfcA3'),
//     newline_unix:     csvFixture('newline_unix'),
//     newline_dos:      csvFixture('newline_dos'),
//     newline_mac:      csvFixture('newline_mac'),
//     defaults_csv:     csvFixture('defaults'),
//     defaults_obj:     jsonFixture('defaults'),
//     delimiter_csv:    csvFixture('delimiter'),
//     delimiter_obj:    jsonFixture('delimiter'),
//     separator_csv:    csvFixture('separator'),
//     separator_obj:    jsonFixture('separator'),
//     regex_csv:        csvFixture('regex'),
//     regex_obj:        jsonFixture('regex'),
//     term_arrays_csv:  csvFixture('term_arrays'),
//     term_arrays_obj:  jsonFixture('term_arrays'),
//     term_objects_csv: csvFixture('term_objects'),
//     term_objects_obj: jsonFixture('term_objects'),
//   };
//
//   // CommonJS module is defined
//   if (typeof module !== 'undefined' && module.exports) {
//     module.exports = fixtures;
//   }
//
// }).call( this );
//
// /**
//  * jQuery-csv (jQuery Plugin)
//  *
//  * This document is licensed as free software under the terms of the
//  * MIT License: http://www.opensource.org/licenses/mit-license.php
//  *
//  * Acknowledgements:
//  * The original design and influence to implement this library as a jquery
//  * plugin is influenced by jquery-json (http://code.google.com/p/jquery-json/).
//  * If you're looking to use native JSON.Stringify but want additional backwards
//  * compatibility for browsers that don't support it, I highly recommend you
//  * check it out.
//  *
//  * A special thanks goes out to rwk@acm.org for providing a lot of valuable
//  * feedback to the project including the core for the new FSM
//  * (Finite State Machine) parsers. If you're looking for a stable TSV parser
//  * be sure to take a look at jquery-tsv (http://code.google.com/p/jquery-tsv/).
//
//  * For legal purposes I'll include the "NO WARRANTY EXPRESSED OR IMPLIED.
//  * USE AT YOUR OWN RISK.". Which, in 'layman's terms' means, by using this
//  * library you are accepting responsibility if it breaks your code.
//  *
//  * Legal jargon aside, I will do my best to provide a useful and stable core
//  * that can effectively be built on.
//  *
//  * Copyrighted 2012 by Evan Plaice.
//  */
//
// RegExp.escape= function(s) {
//     return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
// };
//
// (function (undefined) {
//   'use strict';
//
//   var $;
//
//   // to keep backwards compatibility
//   if (typeof jQuery !== 'undefined' && jQuery) {
//     $ = jQuery;
//   } else {
//     $ = {};
//   }
//
//
//   /**
//    * jQuery.csv.defaults
//    * Encapsulates the method paramater defaults for the CSV plugin module.
//    */
//
//   $.csv = {
//     defaults: {
//       separator:',',
//       delimiter:'"',
//       headers:true
//     },
//
//     hooks: {
//       castToScalar: function(value, state) {
//         var hasDot = /\./;
//         if (isNaN(value)) {
//           return value;
//         } else {
//           if (hasDot.test(value)) {
//             return parseFloat(value);
//           } else {
//             var integer = parseInt(value);
//             if(isNaN(integer)) {
//               return null;
//             } else {
//               return integer;
//             }
//           }
//         }
//       }
//     },
//
//     parsers: {
//       parse: function(csv, options) {
//         // cache settings
//         var separator = options.separator;
//         var delimiter = options.delimiter;
//
//         // set initial state if it's missing
//         if(!options.state.rowNum) {
//           options.state.rowNum = 1;
//         }
//         if(!options.state.colNum) {
//           options.state.colNum = 1;
//         }
//
//         // clear initial state
//         var data = [];
//         var entry = [];
//         var state = 0;
//         var value = '';
//         var exit = false;
//
//         function endOfEntry() {
//           // reset the state
//           state = 0;
//           value = '';
//
//           // if 'start' hasn't been met, don't output
//           if(options.start && options.state.rowNum < options.start) {
//             // update global state
//             entry = [];
//             options.state.rowNum++;
//             options.state.colNum = 1;
//             return;
//           }
//
//           if(options.onParseEntry === undefined) {
//             // onParseEntry hook not set
//             data.push(entry);
//           } else {
//             var hookVal = options.onParseEntry(entry, options.state); // onParseEntry Hook
//             // false skips the row, configurable through a hook
//             if(hookVal !== false) {
//               data.push(hookVal);
//             }
//           }
//           //console.log('entry:' + entry);
//
//           // cleanup
//           entry = [];
//
//           // if 'end' is met, stop parsing
//           if(options.end && options.state.rowNum >= options.end) {
//             exit = true;
//           }
//
//           // update global state
//           options.state.rowNum++;
//           options.state.colNum = 1;
//         }
//
//         function endOfValue() {
//           if(options.onParseValue === undefined) {
//             // onParseValue hook not set
//             entry.push(value);
//           } else {
//             var hook = options.onParseValue(value, options.state); // onParseValue Hook
//             // false skips the row, configurable through a hook
//             if(hook !== false) {
//               entry.push(hook);
//             }
//           }
//           //console.log('value:' + value);
//           // reset the state
//           value = '';
//           state = 0;
//           // update global state
//           options.state.colNum++;
//         }
//
//         // escape regex-specific control chars
//         var escSeparator = RegExp.escape(separator);
//         var escDelimiter = RegExp.escape(delimiter);
//
//         // compile the regEx str using the custom delimiter/separator
//         var match = /(D|S|\r\n|\n|\r|[^DS\r\n]+)/;
//         var matchSrc = match.source;
//         matchSrc = matchSrc.replace(/S/g, escSeparator);
//         matchSrc = matchSrc.replace(/D/g, escDelimiter);
//         match = new RegExp(matchSrc, 'gm');
//
//         // put on your fancy pants...
//         // process control chars individually, use look-ahead on non-control chars
//         csv.replace(match, function (m0) {
//           if(exit) {
//             return;
//           }
//           switch (state) {
//             // the start of a value
//             case 0:
//               // null last value
//               if (m0 === separator) {
//                 value += '';
//                 endOfValue();
//                 break;
//               }
//               // opening delimiter
//               if (m0 === delimiter) {
//                 state = 1;
//                 break;
//               }
//               // null last value
//               if (/^(\r\n|\n|\r)$/.test(m0)) {
//                 endOfValue();
//                 endOfEntry();
//                 break;
//               }
//               // un-delimited value
//               value += m0;
//               state = 3;
//               break;
//
//             // delimited input
//             case 1:
//               // second delimiter? check further
//               if (m0 === delimiter) {
//                 state = 2;
//                 break;
//               }
//               // delimited data
//               value += m0;
//               state = 1;
//               break;
//
//             // delimiter found in delimited input
//             case 2:
//               // escaped delimiter?
//               if (m0 === delimiter) {
//                 value += m0;
//                 state = 1;
//                 break;
//               }
//               // null value
//               if (m0 === separator) {
//                 endOfValue();
//                 break;
//               }
//               // end of entry
//               if (/^(\r\n|\n|\r)$/.test(m0)) {
//                 endOfValue();
//                 endOfEntry();
//                 break;
//               }
//               // broken paser?
//               throw new Error('CSVDataError: Illegal State [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
//
//             // un-delimited input
//             case 3:
//               // null last value
//               if (m0 === separator) {
//                 endOfValue();
//                 break;
//               }
//               // end of entry
//               if (/^(\r\n|\n|\r)$/.test(m0)) {
//                 endOfValue();
//                 endOfEntry();
//                 break;
//               }
//               if (m0 === delimiter) {
//               // non-compliant data
//                 throw new Error('CSVDataError: Illegal Quote [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
//               }
//               // broken parser?
//               throw new Error('CSVDataError: Illegal Data [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
//             default:
//               // shenanigans
//               throw new Error('CSVDataError: Unknown State [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
//           }
//           //console.log('val:' + m0 + ' state:' + state);
//         });
//
//         // submit the last entry
//         // ignore null last line
//         if(entry.length !== 0) {
//           endOfValue();
//           endOfEntry();
//         }
//
//         return data;
//       },
//
//       // a csv-specific line splitter
//       splitLines: function(csv, options) {
//         // cache settings
//         var separator = options.separator;
//         var delimiter = options.delimiter;
//
//         // set initial state if it's missing
//         if(!options.state.rowNum) {
//           options.state.rowNum = 1;
//         }
//
//         // clear initial state
//         var entries = [];
//         var state = 0;
//         var entry = '';
//         var exit = false;
//
//         function endOfLine() {
//           // reset the state
//           state = 0;
//
//           // if 'start' hasn't been met, don't output
//           if(options.start && options.state.rowNum < options.start) {
//             // update global state
//             entry = '';
//             options.state.rowNum++;
//             return;
//           }
//
//           if(options.onParseEntry === undefined) {
//             // onParseEntry hook not set
//             entries.push(entry);
//           } else {
//             var hookVal = options.onParseEntry(entry, options.state); // onParseEntry Hook
//             // false skips the row, configurable through a hook
//             if(hookVal !== false) {
//               entries.push(hookVal);
//             }
//           }
//
//           // cleanup
//           entry = '';
//
//           // if 'end' is met, stop parsing
//           if(options.end && options.state.rowNum >= options.end) {
//             exit = true;
//           }
//
//           // update global state
//           options.state.rowNum++;
//         }
//
//         // escape regex-specific control chars
//         var escSeparator = RegExp.escape(separator);
//         var escDelimiter = RegExp.escape(delimiter);
//
//         // compile the regEx str using the custom delimiter/separator
//         var match = /(D|S|\n|\r|[^DS\r\n]+)/;
//         var matchSrc = match.source;
//         matchSrc = matchSrc.replace(/S/g, escSeparator);
//         matchSrc = matchSrc.replace(/D/g, escDelimiter);
//         match = new RegExp(matchSrc, 'gm');
//
//         // put on your fancy pants...
//         // process control chars individually, use look-ahead on non-control chars
//         csv.replace(match, function (m0) {
//           if(exit) {
//             return;
//           }
//           switch (state) {
//             // the start of a value/entry
//             case 0:
//               // null value
//               if (m0 === separator) {
//                 entry += m0;
//                 state = 0;
//                 break;
//               }
//               // opening delimiter
//               if (m0 === delimiter) {
//                 entry += m0;
//                 state = 1;
//                 break;
//               }
//               // end of line
//               if (m0 === '\n') {
//                 endOfLine();
//                 break;
//               }
//               // phantom carriage return
//               if (/^\r$/.test(m0)) {
//                 break;
//               }
//               // un-delimit value
//               entry += m0;
//               state = 3;
//               break;
//
//             // delimited input
//             case 1:
//               // second delimiter? check further
//               if (m0 === delimiter) {
//                 entry += m0;
//                 state = 2;
//                 break;
//               }
//               // delimited data
//               entry += m0;
//               state = 1;
//               break;
//
//             // delimiter found in delimited input
//             case 2:
//               // escaped delimiter?
//               var prevChar = entry.substr(entry.length - 1);
//               if (m0 === delimiter && prevChar === delimiter) {
//                 entry += m0;
//                 state = 1;
//                 break;
//               }
//               // end of value
//               if (m0 === separator) {
//                 entry += m0;
//                 state = 0;
//                 break;
//               }
//               // end of line
//               if (m0 === '\n') {
//                 endOfLine();
//                 break;
//               }
//               // phantom carriage return
//               if (m0 === '\r') {
//                 break;
//               }
//               // broken paser?
//               throw new Error('CSVDataError: Illegal state [Row:' + options.state.rowNum + ']');
//
//             // un-delimited input
//             case 3:
//               // null value
//               if (m0 === separator) {
//                 entry += m0;
//                 state = 0;
//                 break;
//               }
//               // end of line
//               if (m0 === '\n') {
//                 endOfLine();
//                 break;
//               }
//               // phantom carriage return
//               if (m0 === '\r') {
//                 break;
//               }
//               // non-compliant data
//               if (m0 === delimiter) {
//                 throw new Error('CSVDataError: Illegal quote [Row:' + options.state.rowNum + ']');
//               }
//               // broken parser?
//               throw new Error('CSVDataError: Illegal state [Row:' + options.state.rowNum + ']');
//             default:
//               // shenanigans
//               throw new Error('CSVDataError: Unknown state [Row:' + options.state.rowNum + ']');
//           }
//           //console.log('val:' + m0 + ' state:' + state);
//         });
//
//         // submit the last entry
//         // ignore null last line
//         if(entry !== '') {
//           endOfLine();
//         }
//
//         return entries;
//       },
//
//       // a csv entry parser
//       parseEntry: function(csv, options) {
//         // cache settings
//         var separator = options.separator;
//         var delimiter = options.delimiter;
//
//         // set initial state if it's missing
//         if(!options.state.rowNum) {
//           options.state.rowNum = 1;
//         }
//         if(!options.state.colNum) {
//           options.state.colNum = 1;
//         }
//
//         // clear initial state
//         var entry = [];
//         var state = 0;
//         var value = '';
//
//         function endOfValue() {
//           if(options.onParseValue === undefined) {
//             // onParseValue hook not set
//             entry.push(value);
//           } else {
//             var hook = options.onParseValue(value, options.state); // onParseValue Hook
//             // false skips the value, configurable through a hook
//             if(hook !== false) {
//               entry.push(hook);
//             }
//           }
//           // reset the state
//           value = '';
//           state = 0;
//           // update global state
//           options.state.colNum++;
//         }
//
//         // checked for a cached regEx first
//         if(!options.match) {
//           // escape regex-specific control chars
//           var escSeparator = RegExp.escape(separator);
//           var escDelimiter = RegExp.escape(delimiter);
//
//           // compile the regEx str using the custom delimiter/separator
//           var match = /(D|S|\n|\r|[^DS\r\n]+)/;
//           var matchSrc = match.source;
//           matchSrc = matchSrc.replace(/S/g, escSeparator);
//           matchSrc = matchSrc.replace(/D/g, escDelimiter);
//           options.match = new RegExp(matchSrc, 'gm');
//         }
//
//         // put on your fancy pants...
//         // process control chars individually, use look-ahead on non-control chars
//         csv.replace(options.match, function (m0) {
//           switch (state) {
//             // the start of a value
//             case 0:
//               // null last value
//               if (m0 === separator) {
//                 value += '';
//                 endOfValue();
//                 break;
//               }
//               // opening delimiter
//               if (m0 === delimiter) {
//                 state = 1;
//                 break;
//               }
//               // skip un-delimited new-lines
//               if (m0 === '\n' || m0 === '\r') {
//                 break;
//               }
//               // un-delimited value
//               value += m0;
//               state = 3;
//               break;
//
//             // delimited input
//             case 1:
//               // second delimiter? check further
//               if (m0 === delimiter) {
//                 state = 2;
//                 break;
//               }
//               // delimited data
//               value += m0;
//               state = 1;
//               break;
//
//             // delimiter found in delimited input
//             case 2:
//               // escaped delimiter?
//               if (m0 === delimiter) {
//                 value += m0;
//                 state = 1;
//                 break;
//               }
//               // null value
//               if (m0 === separator) {
//                 endOfValue();
//                 break;
//               }
//               // skip un-delimited new-lines
//               if (m0 === '\n' || m0 === '\r') {
//                 break;
//               }
//               // broken paser?
//               throw new Error('CSVDataError: Illegal State [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
//
//             // un-delimited input
//             case 3:
//               // null last value
//               if (m0 === separator) {
//                 endOfValue();
//                 break;
//               }
//               // skip un-delimited new-lines
//               if (m0 === '\n' || m0 === '\r') {
//                 break;
//               }
//               // non-compliant data
//               if (m0 === delimiter) {
//                 throw new Error('CSVDataError: Illegal Quote [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
//               }
//               // broken parser?
//               throw new Error('CSVDataError: Illegal Data [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
//             default:
//               // shenanigans
//               throw new Error('CSVDataError: Unknown State [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
//           }
//           //console.log('val:' + m0 + ' state:' + state);
//         });
//
//         // submit the last value
//         endOfValue();
//
//         return entry;
//       }
//     },
//
//     helpers: {
//
//       /**
//        * $.csv.helpers.collectPropertyNames(objectsArray)
//        * Collects all unique property names from all passed objects.
//        *
//        * @param {Array} objects Objects to collect properties from.
//        *
//        * Returns an array of property names (array will be empty,
//        * if objects have no own properties).
//        */
//       collectPropertyNames: function (objects) {
//
//         var o, propName, props = [];
//         for (o in objects) {
//           for (propName in objects[o]) {
//             if ((objects[o].hasOwnProperty(propName)) &&
//                 (props.indexOf(propName) < 0) &&
//                 (typeof objects[o][propName] !== 'function')) {
//
//               props.push(propName);
//             }
//           }
//         }
//         return props;
//       }
//     },
//
//     /**
//      * $.csv.toArray(csv)
//      * Converts a CSV entry string to a javascript array.
//      *
//      * @param {Array} csv The string containing the CSV data.
//      * @param {Object} [options] An object containing user-defined options.
//      * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
//      * @param {Character} [delimiter] An override for the delimiter character. Defaults to a double-quote(").
//      *
//      * This method deals with simple CSV strings only. It's useful if you only
//      * need to parse a single entry. If you need to parse more than one line,
//      * use $.csv2Array instead.
//      */
//     toArray: function(csv, options, callback) {
//       options = (options !== undefined ? options : {});
//       var config = {};
//       config.callback = ((callback !== undefined && typeof(callback) === 'function') ? callback : false);
//       config.separator = 'separator' in options ? options.separator : $.csv.defaults.separator;
//       config.delimiter = 'delimiter' in options ? options.delimiter : $.csv.defaults.delimiter;
//       var state = (options.state !== undefined ? options.state : {});
//
//       // setup
//       options = {
//         delimiter: config.delimiter,
//         separator: config.separator,
//         onParseEntry: options.onParseEntry,
//         onParseValue: options.onParseValue,
//         state: state
//       };
//
//       var entry = $.csv.parsers.parseEntry(csv, options);
//
//       // push the value to a callback if one is defined
//       if(!config.callback) {
//         return entry;
//       } else {
//         config.callback('', entry);
//       }
//     },
//
//     /**
//      * $.csv.toArrays(csv)
//      * Converts a CSV string to a javascript array.
//      *
//      * @param {String} csv The string containing the raw CSV data.
//      * @param {Object} [options] An object containing user-defined options.
//      * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
//      * @param {Character} [delimiter] An override for the delimiter character. Defaults to a double-quote(").
//      *
//      * This method deals with multi-line CSV. The breakdown is simple. The first
//      * dimension of the array represents the line (or entry/row) while the second
//      * dimension contains the values (or values/columns).
//      */
//     toArrays: function(csv, options, callback) {
//       options = (options !== undefined ? options : {});
//       var config = {};
//       config.callback = ((callback !== undefined && typeof(callback) === 'function') ? callback : false);
//       config.separator = 'separator' in options ? options.separator : $.csv.defaults.separator;
//       config.delimiter = 'delimiter' in options ? options.delimiter : $.csv.defaults.delimiter;
//
//       // setup
//       var data = [];
//       options = {
//         delimiter: config.delimiter,
//         separator: config.separator,
//         onPreParse: options.onPreParse,
//         onParseEntry: options.onParseEntry,
//         onParseValue: options.onParseValue,
//         onPostParse: options.onPostParse,
//         start: options.start,
//         end: options.end,
//         state: {
//           rowNum: 1,
//           colNum: 1
//         }
//       };
//
//       // onPreParse hook
//       if(options.onPreParse !== undefined) {
//         options.onPreParse(csv, options.state);
//       }
//
//       // parse the data
//       data = $.csv.parsers.parse(csv, options);
//
//       // onPostParse hook
//       if(options.onPostParse !== undefined) {
//         options.onPostParse(data, options.state);
//       }
//
//       // push the value to a callback if one is defined
//       if(!config.callback) {
//         return data;
//       } else {
//         config.callback('', data);
//       }
//     },
//
//     /**
//      * $.csv.toObjects(csv)
//      * Converts a CSV string to a javascript object.
//      * @param {String} csv The string containing the raw CSV data.
//      * @param {Object} [options] An object containing user-defined options.
//      * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
//      * @param {Character} [delimiter] An override for the delimiter character. Defaults to a double-quote(").
//      * @param {Boolean} [headers] Indicates whether the data contains a header line. Defaults to true.
//      *
//      * This method deals with multi-line CSV strings. Where the headers line is
//      * used as the key for each value per entry.
//      */
//     toObjects: function(csv, options, callback) {
//       options = (options !== undefined ? options : {});
//       var config = {};
//       config.callback = ((callback !== undefined && typeof(callback) === 'function') ? callback : false);
//       config.separator = 'separator' in options ? options.separator : $.csv.defaults.separator;
//       config.delimiter = 'delimiter' in options ? options.delimiter : $.csv.defaults.delimiter;
//       config.headers = 'headers' in options ? options.headers : $.csv.defaults.headers;
//       options.start = 'start' in options ? options.start : 1;
//
//       // account for headers
//       if(config.headers) {
//         options.start++;
//       }
//       if(options.end && config.headers) {
//         options.end++;
//       }
//
//       // setup
//       var lines = [];
//       var data = [];
//
//       options = {
//         delimiter: config.delimiter,
//         separator: config.separator,
//         onPreParse: options.onPreParse,
//         onParseEntry: options.onParseEntry,
//         onParseValue: options.onParseValue,
//         onPostParse: options.onPostParse,
//         start: options.start,
//         end: options.end,
//         state: {
//           rowNum: 1,
//           colNum: 1
//         },
//         match: false,
//         transform: options.transform
//       };
//
//       // fetch the headers
//       var headerOptions = {
//         delimiter: config.delimiter,
//         separator: config.separator,
//         start: 1,
//         end: 1,
//         state: {
//           rowNum:1,
//           colNum:1
//         }
//       };
//
//       // onPreParse hook
//       if(options.onPreParse !== undefined) {
//         options.onPreParse(csv, options.state);
//       }
//
//       // parse the csv
//       var headerLine = $.csv.parsers.splitLines(csv, headerOptions);
//       var headers = $.csv.toArray(headerLine[0], options);
//
//       // fetch the data
//       lines = $.csv.parsers.splitLines(csv, options);
//
//       // reset the state for re-use
//       options.state.colNum = 1;
//       if(headers){
//         options.state.rowNum = 2;
//       } else {
//         options.state.rowNum = 1;
//       }
//
//       // convert data to objects
//       for(var i=0, len=lines.length; i<len; i++) {
//         var entry = $.csv.toArray(lines[i], options);
//         var object = {};
//         for(var j=0; j <headers.length; j++) {
//           object[headers[j]] = entry[j];
//         }
//         if (options.transform !== undefined) {
//           data.push(options.transform.call(undefined, object));
//         } else {
//           data.push(object);
//         }
//
//         // update row state
//         options.state.rowNum++;
//       }
//
//       // onPostParse hook
//       if(options.onPostParse !== undefined) {
//         options.onPostParse(data, options.state);
//       }
//
//       // push the value to a callback if one is defined
//       if(!config.callback) {
//         return data;
//       } else {
//         config.callback('', data);
//       }
//     },
//
//      /**
//      * $.csv.fromArrays(arrays)
//      * Converts a javascript array to a CSV String.
//      *
//      * @param {Array} arrays An array containing an array of CSV entries.
//      * @param {Object} [options] An object containing user-defined options.
//      * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
//      * @param {Character} [delimiter] An override for the delimiter character. Defaults to a double-quote(").
//      *
//      * This method generates a CSV file from an array of arrays (representing entries).
//      */
//     fromArrays: function(arrays, options, callback) {
//       options = (options !== undefined ? options : {});
//       var config = {};
//       config.callback = ((callback !== undefined && typeof(callback) === 'function') ? callback : false);
//       config.separator = 'separator' in options ? options.separator : $.csv.defaults.separator;
//       config.delimiter = 'delimiter' in options ? options.delimiter : $.csv.defaults.delimiter;
//
//       var output = '',
//           line,
//           lineValues,
//           i, j;
//
//       for (i = 0; i < arrays.length; i++) {
//         line = arrays[i];
//         lineValues = [];
//         for (j = 0; j < line.length; j++) {
//           var strValue = (line[j] === undefined || line[j] === null) ? '' : line[j].toString();
//           if (strValue.indexOf(config.delimiter) > -1) {
//             strValue = strValue.replace(new RegExp(config.delimiter, 'g'), config.delimiter + config.delimiter);
//           }
//
//           var escMatcher = '\n|\r|S|D';
//           escMatcher = escMatcher.replace('S', config.separator);
//           escMatcher = escMatcher.replace('D', config.delimiter);
//
//           if (strValue.search(escMatcher) > -1) {
//             strValue = config.delimiter + strValue + config.delimiter;
//           }
//           lineValues.push(strValue);
//         }
//         output += lineValues.join(config.separator) + '\r\n';
//       }
//
//       // push the value to a callback if one is defined
//       if(!config.callback) {
//         return output;
//       } else {
//         config.callback('', output);
//       }
//     },
//
//     /**
//      * $.csv.fromObjects(objects)
//      * Converts a javascript dictionary to a CSV string.
//      *
//      * @param {Object} objects An array of objects containing the data.
//      * @param {Object} [options] An object containing user-defined options.
//      * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
//      * @param {Character} [delimiter] An override for the delimiter character. Defaults to a double-quote(").
//      * @param {Character} [sortOrder] Sort order of columns (named after
//      *   object properties). Use 'alpha' for alphabetic. Default is 'declare',
//      *   which means, that properties will _probably_ appear in order they were
//      *   declared for the object. But without any guarantee.
//      * @param {Character or Array} [manualOrder] Manually order columns. May be
//      * a strin in a same csv format as an output or an array of header names
//      * (array items won't be parsed). All the properties, not present in
//      * `manualOrder` will be appended to the end in accordance with `sortOrder`
//      * option. So the `manualOrder` always takes preference, if present.
//      *
//      * This method generates a CSV file from an array of objects (name:value pairs).
//      * It starts by detecting the headers and adding them as the first line of
//      * the CSV file, followed by a structured dump of the data.
//      */
//     fromObjects: function(objects, options, callback) {
//       options = (options !== undefined ? options : {});
//       var config = {};
//       config.callback = ((callback !== undefined && typeof(callback) === 'function') ? callback : false);
//       config.separator = 'separator' in options ? options.separator : $.csv.defaults.separator;
//       config.delimiter = 'delimiter' in options ? options.delimiter : $.csv.defaults.delimiter;
//       config.headers = 'headers' in options ? options.headers : $.csv.defaults.headers;
//       config.sortOrder = 'sortOrder' in options ? options.sortOrder : 'declare';
//       config.manualOrder = 'manualOrder' in options ? options.manualOrder : [];
//       config.transform = options.transform;
//
//       if (typeof config.manualOrder === 'string') {
//         config.manualOrder = $.csv.toArray(config.manualOrder, config);
//       }
//
//       if (config.transform !== undefined) {
//         var origObjects = objects;
//         objects = [];
//
//         var i;
//         for (i = 0; i < origObjects.length; i++) {
//           objects.push(config.transform.call(undefined, origObjects[i]));
//         }
//       }
//
//       var props = $.csv.helpers.collectPropertyNames(objects);
//
//       if (config.sortOrder === 'alpha') {
//         props.sort();
//       } // else {} - nothing to do for 'declare' order
//
//       if (config.manualOrder.length > 0) {
//
//         var propsManual = [].concat(config.manualOrder);
//         var p;
//         for (p = 0; p < props.length; p++) {
//           if (propsManual.indexOf( props[p] ) < 0) {
//             propsManual.push( props[p] );
//           }
//         }
//         props = propsManual;
//       }
//
//       var o, p, line, output = [], propName;
//       if (config.headers) {
//         output.push(props);
//       }
//
//       for (o = 0; o < objects.length; o++) {
//         line = [];
//         for (p = 0; p < props.length; p++) {
//           propName = props[p];
//           if (propName in objects[o] && typeof objects[o][propName] !== 'function') {
//             line.push(objects[o][propName]);
//           } else {
//             line.push('');
//           }
//         }
//         output.push(line);
//       }
//
//       // push the value to a callback if one is defined
//       return $.csv.fromArrays(output, options, config.callback);
//     }
//   };
//
//   // Maintenance code to maintain backward-compatibility
//   // Will be removed in release 1.0
//   $.csvEntry2Array = $.csv.toArray;
//   $.csv2Array = $.csv.toArrays;
//   $.csv2Dictionary = $.csv.toObjects;
//
//   // CommonJS module is defined
//   if (typeof module !== 'undefined' && module.exports) {
//     module.exports = $.csv;
//   }
//
// }).call( this );
//
// RegExp.escape=function(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")},function(a){"use strict";var b;b="undefined"!=typeof jQuery&&jQuery?jQuery:{},b.csv={defaults:{separator:",",delimiter:'"',headers:!0},hooks:{castToScalar:function(a){var b=/\./;if(isNaN(a))return a;if(b.test(a))return parseFloat(a);var c=parseInt(a);return isNaN(c)?null:c}},parsers:{parse:function(b,c){function d(){if(j=0,k="",c.start&&c.state.rowNum<c.start)return i=[],c.state.rowNum++,void(c.state.colNum=1);if(c.onParseEntry===a)h.push(i);else{var b=c.onParseEntry(i,c.state);b!==!1&&h.push(b)}i=[],c.end&&c.state.rowNum>=c.end&&(l=!0),c.state.rowNum++,c.state.colNum=1}function e(){if(c.onParseValue===a)i.push(k);else{var b=c.onParseValue(k,c.state);b!==!1&&i.push(b)}k="",j=0,c.state.colNum++}var f=c.separator,g=c.delimiter;c.state.rowNum||(c.state.rowNum=1),c.state.colNum||(c.state.colNum=1);var h=[],i=[],j=0,k="",l=!1,m=RegExp.escape(f),n=RegExp.escape(g),o=/(D|S|\r\n|\n|\r|[^DS\r\n]+)/,p=o.source;return p=p.replace(/S/g,m),p=p.replace(/D/g,n),o=new RegExp(p,"gm"),b.replace(o,function(a){if(!l)switch(j){case 0:if(a===f){k+="",e();break}if(a===g){j=1;break}if(/^(\r\n|\n|\r)$/.test(a)){e(),d();break}k+=a,j=3;break;case 1:if(a===g){j=2;break}k+=a,j=1;break;case 2:if(a===g){k+=a,j=1;break}if(a===f){e();break}if(/^(\r\n|\n|\r)$/.test(a)){e(),d();break}throw new Error("CSVDataError: Illegal State [Row:"+c.state.rowNum+"][Col:"+c.state.colNum+"]");case 3:if(a===f){e();break}if(/^(\r\n|\n|\r)$/.test(a)){e(),d();break}if(a===g)throw new Error("CSVDataError: Illegal Quote [Row:"+c.state.rowNum+"][Col:"+c.state.colNum+"]");throw new Error("CSVDataError: Illegal Data [Row:"+c.state.rowNum+"][Col:"+c.state.colNum+"]");default:throw new Error("CSVDataError: Unknown State [Row:"+c.state.rowNum+"][Col:"+c.state.colNum+"]")}}),0!==i.length&&(e(),d()),h},splitLines:function(b,c){function d(){if(h=0,c.start&&c.state.rowNum<c.start)return i="",void c.state.rowNum++;if(c.onParseEntry===a)g.push(i);else{var b=c.onParseEntry(i,c.state);b!==!1&&g.push(b)}i="",c.end&&c.state.rowNum>=c.end&&(j=!0),c.state.rowNum++}var e=c.separator,f=c.delimiter;c.state.rowNum||(c.state.rowNum=1);var g=[],h=0,i="",j=!1,k=RegExp.escape(e),l=RegExp.escape(f),m=/(D|S|\n|\r|[^DS\r\n]+)/,n=m.source;return n=n.replace(/S/g,k),n=n.replace(/D/g,l),m=new RegExp(n,"gm"),b.replace(m,function(a){if(!j)switch(h){case 0:if(a===e){i+=a,h=0;break}if(a===f){i+=a,h=1;break}if("\n"===a){d();break}if(/^\r$/.test(a))break;i+=a,h=3;break;case 1:if(a===f){i+=a,h=2;break}i+=a,h=1;break;case 2:var b=i.substr(i.length-1);if(a===f&&b===f){i+=a,h=1;break}if(a===e){i+=a,h=0;break}if("\n"===a){d();break}if("\r"===a)break;throw new Error("CSVDataError: Illegal state [Row:"+c.state.rowNum+"]");case 3:if(a===e){i+=a,h=0;break}if("\n"===a){d();break}if("\r"===a)break;if(a===f)throw new Error("CSVDataError: Illegal quote [Row:"+c.state.rowNum+"]");throw new Error("CSVDataError: Illegal state [Row:"+c.state.rowNum+"]");default:throw new Error("CSVDataError: Unknown state [Row:"+c.state.rowNum+"]")}}),""!==i&&d(),g},parseEntry:function(b,c){function d(){if(c.onParseValue===a)g.push(i);else{var b=c.onParseValue(i,c.state);b!==!1&&g.push(b)}i="",h=0,c.state.colNum++}var e=c.separator,f=c.delimiter;c.state.rowNum||(c.state.rowNum=1),c.state.colNum||(c.state.colNum=1);var g=[],h=0,i="";if(!c.match){var j=RegExp.escape(e),k=RegExp.escape(f),l=/(D|S|\n|\r|[^DS\r\n]+)/,m=l.source;m=m.replace(/S/g,j),m=m.replace(/D/g,k),c.match=new RegExp(m,"gm")}return b.replace(c.match,function(a){switch(h){case 0:if(a===e){i+="",d();break}if(a===f){h=1;break}if("\n"===a||"\r"===a)break;i+=a,h=3;break;case 1:if(a===f){h=2;break}i+=a,h=1;break;case 2:if(a===f){i+=a,h=1;break}if(a===e){d();break}if("\n"===a||"\r"===a)break;throw new Error("CSVDataError: Illegal State [Row:"+c.state.rowNum+"][Col:"+c.state.colNum+"]");case 3:if(a===e){d();break}if("\n"===a||"\r"===a)break;if(a===f)throw new Error("CSVDataError: Illegal Quote [Row:"+c.state.rowNum+"][Col:"+c.state.colNum+"]");throw new Error("CSVDataError: Illegal Data [Row:"+c.state.rowNum+"][Col:"+c.state.colNum+"]");default:throw new Error("CSVDataError: Unknown State [Row:"+c.state.rowNum+"][Col:"+c.state.colNum+"]")}}),d(),g}},helpers:{collectPropertyNames:function(a){var b,c,d=[];for(b in a)for(c in a[b])a[b].hasOwnProperty(c)&&d.indexOf(c)<0&&"function"!=typeof a[b][c]&&d.push(c);return d}},toArray:function(c,d,e){d=d!==a?d:{};var f={};f.callback=e!==a&&"function"==typeof e?e:!1,f.separator="separator"in d?d.separator:b.csv.defaults.separator,f.delimiter="delimiter"in d?d.delimiter:b.csv.defaults.delimiter;var g=d.state!==a?d.state:{};d={delimiter:f.delimiter,separator:f.separator,onParseEntry:d.onParseEntry,onParseValue:d.onParseValue,state:g};var h=b.csv.parsers.parseEntry(c,d);return f.callback?void f.callback("",h):h},toArrays:function(c,d,e){d=d!==a?d:{};var f={};f.callback=e!==a&&"function"==typeof e?e:!1,f.separator="separator"in d?d.separator:b.csv.defaults.separator,f.delimiter="delimiter"in d?d.delimiter:b.csv.defaults.delimiter;var g=[];return d={delimiter:f.delimiter,separator:f.separator,onPreParse:d.onPreParse,onParseEntry:d.onParseEntry,onParseValue:d.onParseValue,onPostParse:d.onPostParse,start:d.start,end:d.end,state:{rowNum:1,colNum:1}},d.onPreParse!==a&&d.onPreParse(c,d.state),g=b.csv.parsers.parse(c,d),d.onPostParse!==a&&d.onPostParse(g,d.state),f.callback?void f.callback("",g):g},toObjects:function(c,d,e){d=d!==a?d:{};var f={};f.callback=e!==a&&"function"==typeof e?e:!1,f.separator="separator"in d?d.separator:b.csv.defaults.separator,f.delimiter="delimiter"in d?d.delimiter:b.csv.defaults.delimiter,f.headers="headers"in d?d.headers:b.csv.defaults.headers,d.start="start"in d?d.start:1,f.headers&&d.start++,d.end&&f.headers&&d.end++;var g=[],h=[];d={delimiter:f.delimiter,separator:f.separator,onPreParse:d.onPreParse,onParseEntry:d.onParseEntry,onParseValue:d.onParseValue,onPostParse:d.onPostParse,start:d.start,end:d.end,state:{rowNum:1,colNum:1},match:!1,transform:d.transform};var i={delimiter:f.delimiter,separator:f.separator,start:1,end:1,state:{rowNum:1,colNum:1}};d.onPreParse!==a&&d.onPreParse(c,d.state);var j=b.csv.parsers.splitLines(c,i),k=b.csv.toArray(j[0],d);g=b.csv.parsers.splitLines(c,d),d.state.colNum=1,d.state.rowNum=k?2:1;for(var l=0,m=g.length;m>l;l++){for(var n=b.csv.toArray(g[l],d),o={},p=0;p<k.length;p++)o[k[p]]=n[p];h.push(d.transform!==a?d.transform.call(a,o):o),d.state.rowNum++}return d.onPostParse!==a&&d.onPostParse(h,d.state),f.callback?void f.callback("",h):h},fromArrays:function(c,d,e){d=d!==a?d:{};var f={};f.callback=e!==a&&"function"==typeof e?e:!1,f.separator="separator"in d?d.separator:b.csv.defaults.separator,f.delimiter="delimiter"in d?d.delimiter:b.csv.defaults.delimiter;var g,h,i,j,k="";for(i=0;i<c.length;i++){for(g=c[i],h=[],j=0;j<g.length;j++){var l=g[j]===a||null===g[j]?"":g[j].toString();l.indexOf(f.delimiter)>-1&&(l=l.replace(f.delimiter,f.delimiter+f.delimiter));var m="\n|\r|S|D";m=m.replace("S",f.separator),m=m.replace("D",f.delimiter),l.search(m)>-1&&(l=f.delimiter+l+f.delimiter),h.push(l)}k+=h.join(f.separator)+"\r\n"}return f.callback?void f.callback("",k):k},fromObjects:function(c,d,e){d=d!==a?d:{};var f={};if(f.callback=e!==a&&"function"==typeof e?e:!1,f.separator="separator"in d?d.separator:b.csv.defaults.separator,f.delimiter="delimiter"in d?d.delimiter:b.csv.defaults.delimiter,f.headers="headers"in d?d.headers:b.csv.defaults.headers,f.sortOrder="sortOrder"in d?d.sortOrder:"declare",f.manualOrder="manualOrder"in d?d.manualOrder:[],f.transform=d.transform,"string"==typeof f.manualOrder&&(f.manualOrder=b.csv.toArray(f.manualOrder,f)),f.transform!==a){var g=c;c=[];var h;for(h=0;h<g.length;h++)c.push(f.transform.call(a,g[h]))}var i=b.csv.helpers.collectPropertyNames(c);if("alpha"===f.sortOrder&&i.sort(),f.manualOrder.length>0){var j,k=[].concat(f.manualOrder);for(j=0;j<i.length;j++)k.indexOf(i[j])<0&&k.push(i[j]);i=k}var l,j,m,n,o=[];for(f.headers&&o.push(i),l=0;l<c.length;l++){for(m=[],j=0;j<i.length;j++)n=i[j],m.push(n in c[l]&&"function"!=typeof c[l][n]?c[l][n]:"");o.push(m)}return b.csv.fromArrays(o,d,f.callback)}},b.csvEntry2Array=b.csv.toArray,b.csv2Array=b.csv.toArrays,b.csv2Dictionary=b.csv.toObjects,"undefined"!=typeof module&&module.exports&&(module.exports=b.csv)}.call(this);