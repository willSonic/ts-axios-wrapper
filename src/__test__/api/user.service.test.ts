
import MockAdapter = require( 'axios-mock-adapter' );
import ApiCore from '../../api/axios-wrapper';
import { AxiosRequestConfig } from 'axios';
import HttpParams from '../../api/interfaces/httpParams.model';
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
//import {HttpWrapperService} from "../../api/http.wrapper.service";
import {UserServices} from "../../api/user.service";

const Config: any = {
    API: 'api',
    HOST: 'http://localhost',
    PORT: '0000'
};

const apiConfig: AxiosRequestConfig = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 15000
};

let  newUser = (<any>Object).assign( {}, {
    username: 'vixen',
    firstname: 'George',
    lastname: 'Washington',
    password: 'pass1111',
    email: 'seeds@nest.com'
});



const  httParams:HttpParams  = <HttpParams>{
    auth:false,
    errorActionType: "small Time Error",
    specificErrorType: "BIG TIME SUCCESS",
    payload: newUser,
    responseObject: 'account',
    successActionType: "BIG TIME SUCCESS",
    uri: '/User'
};

//{ "username": "vixen", "firstname": "George", "lastname": "Washington",  "password": "pass1111"  ,"email": "seeds@nest.com" }


const newUseresult =  (<any>Object).assign( {},
    {
        "account": {
            "user": {
                "id": "a1235",
                "username": "vixen",
                "firstname": "George",
                "lastname": "Washington",
                "email": "seeds@nest.com"
            },
            "token": "testcaseA"
        }
    });


const  userLogin = (<any>Object).assign( {}, {
    username: 'vixen',
    password: 'pass1111'
});

const  badUserReaults = (<any>Object).assign( {}, {
    "error": "incorrect input"
});


const  badUserLogin = (<any>Object).assign( {}, {
    username: 'vixen',
    password: 'pas11'
});

const badLoginResult = (<any>Object).assign( {}, {
    "error": "username or password is incorrect"
});




describe('UserServiceTest test', () => {
    const userServices = new UserServices();

    test('post New User returns Observable.fromPromise ', (done) => {
        let someObservable:Subscription;
        let mock = new MockAdapter(userServices.httpWrapperService._apiCore.getAxiosInstance())
        mock.onPost(`${Config.HOST}:${Config.PORT}/${Config.API}/Users`).reply(200, newUseresult);
        someObservable  =  userServices.registerUser(newUser, "small Time Error","BIG TIME ERROR", "BIG TIME SUCCESS")

        someObservable.subscribe(  (result) =>{
            console.log('--UserServices--  Observable.fromPromise result = ', result)
            done();
        })

    });


});