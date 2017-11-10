
import axios from 'axios';
import MockAdapter = require( 'axios-mock-adapter' );
import ApiCore from '../../api/axios-wrapper';
import { AxiosRequestConfig } from 'axios';

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


describe('AxiosWrapper test', () => {
    let _apiCore = new ApiCore(apiConfig);
    let mock = new MockAdapter(_apiCore.getAxiosInstance());

    test('returns Authentication Bad User Login', (done) => {
        mock.onPost(`${Config.HOST}:${Config.PORT}/${Config.API}/Authorizations/Login`).reply(401, badLoginResult);
        _apiCore.post(`${Config.HOST}:${Config.PORT}/${Config.API}/Authorizations/Login`, null)
            .then(
                (response:any) => {
                    console.log("  Bad User Login call  response = ", response)
                    done();
                },
                (error)=>{
                    expect(error.response.data).toEqual(badLoginResult);
                    done();
                });
    });


    test('returns a new Registered User Error', (done) => {
        mock.onPost(`${Config.HOST}:${Config.PORT}/${Config.API}/Users`).reply(401, badUserReaults);

        _apiCore.post(`${Config.HOST}:${Config.PORT}/${Config.API}/Users`, null)
            .then(
                (response:any) => {
                    console.log(" Registered User Error call  response = ", response)
                    done();
                },
                (error)=>{
                    expect(error.response.data).toEqual(badUserReaults);
                    done();
                });
    });


    test('returns a new Registered User', (done) => {
        mock.reset();
        mock.onPost(`${Config.HOST}:${Config.PORT}/${Config.API}/Users`).reply(200, newUseresult);

        _apiCore.post(`${Config.HOST}:${Config.PORT}/${Config.API}/Users`, newUser)
            .then( (response:any) => {
                    expect(response).toEqual(newUseresult);
                    done();
                });
    });

    test('returns Authentication Login', (done) => {
        mock.onPost(`${Config.HOST}:${Config.PORT}/${Config.API}/Authorizations/Login`).reply(200, newUseresult);
        _apiCore.post(`${Config.HOST}:${Config.PORT}/${Config.API}/Authorizations/Login`, userLogin)
            .then( (response:any) => {
                expect(response).toEqual(newUseresult);
                done();
            });
    });


});

