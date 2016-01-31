import {Injectable} from 'angular2/core';

@Injectable()
export class FileService {

  constructor() {}

  /**
  * opens a download dialog with the given filename and content
  * @param filename the filename
  * @param content the file content
  **/
  public download(filename, content): void {
    let contentType = 'application/octet-stream';
    var a: any = document.createElement('a');
    var blob = new Blob([content], {'type':contentType});
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;
    a.click();
  }
}
