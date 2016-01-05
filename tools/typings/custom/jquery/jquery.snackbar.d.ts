interface JQuery {

    /**
     * You can do one of the following actions to the snackbar
     * $("#snackbarid").snackbar("show");
     * $("#snackbarid").snackbar("hide");
     * $("#snackbarid").snackbar("toggle");
     */
    snackbar(action: string): JQuery;

}

interface JQueryStatic {

    /**
     * Following options are supported to customize look and behaviour:
     * var options =  {
     *  content: "Some text", // text of the snackbar
     *  style: "toast", // add a custom class to your snackbar
     *  timeout: 100, // time in milliseconds after the snackbar autohides, 0 is disabled
     *  htmlAllowed: true // allows HTML as content value
     * }
     *
     * $.snackbar(options);
     */
    snackbar(config: any): JQuery;
}
