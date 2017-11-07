import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/of';
import 'rxjs/add/operator/map';
import { UserServices } from "./api/user.service";
import { HttpWrapperService } from "./api/http.wrapper.service";
var userService = new UserServices(new HttpWrapperService());
var newUser = Object.assign({}, {
    username: "TaoSing",
    firstname: "Willie",
    lastname: "Streeter",
    password: "pass1234",
    email: "beez@nest.com"
});
var result = Observable.of(userService.registerUser(newUser, 'Errrpr', 'failure', 'Success')).subscribe(function (result) {
    console.log('RESULT =', result);
    return result;
});
//# sourceMappingURL=test.js.map