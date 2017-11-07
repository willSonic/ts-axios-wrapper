"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
require("rxjs/add/observable/of");
require("rxjs/add/operator/map");
var user_service_1 = require("./api/user.service");
var http_wrapper_service_1 = require("./api/http.wrapper.service");
var userService = new user_service_1.UserServices(new http_wrapper_service_1.HttpWrapperService());
var newUser = Object.assign({}, {
    username: "TaoSing",
    firstname: "Willie",
    lastname: "Streeter",
    password: "pass1234",
    email: "beez@nest.com"
});
var result = rxjs_1.Observable.of(userService.registerUser(newUser, 'Errrpr', 'failure', 'Success')).subscribe(function (result) {
    console.log('RESULT =', result);
    return result;
});
//# sourceMappingURL=main.js.map