System.register([], function(exports_1) {
    var Credentials;
    return {
        setters:[],
        execute: function() {
            Credentials = (function () {
                function Credentials(username, password) {
                    this.username = username || "";
                    this.password = password || "";
                }
                return Credentials;
            })();
            exports_1("Credentials", Credentials);
        }
    }
});
//# sourceMappingURL=credentials.model.js.map