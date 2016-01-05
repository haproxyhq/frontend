export class ToastModel {
  content: string;
  style: string;
  timeout: number;
  htmlAllowed: boolean;

  constructor(content: string, style: string, timeout: number, htmlAllowed: boolean) {
    this.content = content;
    this.style = style;
    this.timeout = timeout;
    this.htmlAllowed = htmlAllowed;
  };
}
