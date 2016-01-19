'use strict';

/**
 * @ngdoc service
 * @name appApp.audioFilesContainer
 * @description
 * # audioFilesContainer
 * Factory in the appApp.
 */
angular.module('appApp')
    .factory('audioFilesContainer', audioFilesContainer);

function audioFilesContainer(audioDataDecoder) {
    function fileHandler() {
        this.files = [];
        this.decodedFiles = []; 
    }

    fileHandler.prototype.add = add;
    fileHandler.prototype.removeByIndex = removeByIndex;
    fileHandler.prototype.getFiles = getFiles;
    fileHandler.prototype.getDecodedAudioData = getDecodedAudioData;
    fileHandler.prototype.clearAll = clearAll;

    return fileHandler;

    function add(file) {
        if(!file) {
            throw('audioFilesContainer.add: file cannot be null');
        }
        var endIndex = this.files.length;
        this.files[endIndex] = file;
        this.files.sort(comparator);
    }

    function comparator(prev, next) {
        if(prev.name.toLowerCase() > next.name.toLowerCase())
            return 1;
        else if(prev.name.toLowerCase() < next.name.toLowerCase())
            return -1;
        else
            return 0;
    }

    function removeByIndex(pos) {
        this.files.splice(pos, 1);
    }
    
    function getFiles() {
        return this.files.slice(0);
    }

    function getDecodedAudioData() {
        var filename,
            arrayBuffer;
        for(var i = 0; i < this.files.length; i++) {
            filename = this.files[i].name;
            arrayBuffer = this.files[i].arrayBuffer;
            this.decodedFiles[i] = audioDataDecoder.decode(filename, arrayBuffer);
        } 
        return this.decodedFiles.slice(0);
    }

    function clearAll() {
        this.files.length = 0;
        this.decodedFiles.length = 0;
    }
}
