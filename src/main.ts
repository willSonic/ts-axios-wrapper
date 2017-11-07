import {Observable} from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';


import  { UserServices } from "./api/user.service";
import  { HttpWrapperService } from "./api/http.wrapper.service";

const userService:UserServices = new UserServices(new HttpWrapperService());

let  newUser = (<any>Object).assign( {},{
    username: "TaoSing",
    firstname: "Willie",
    lastname: "Streeter",
    password: "pass1234",
    email: "beez@nest.com"
})


const result  = Observable.of(userService.registerUser( newUser,'Errrpr', 'failure', 'Success')).subscribe( (result)=>{

    console.log('RESULT =', result)
    return result;
});