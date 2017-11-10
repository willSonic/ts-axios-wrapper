import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';


import  { UserServices } from'./api/user.service';

const userService: UserServices = new UserServices( );

let  newUser = (<any>Object).assign( {}, {
    username: 'BinDaoBee',
    firstname: 'Sam',
    lastname: 'Stomptown',
    password: 'pass1111',
    email: 'seeds@nest.com'
});


const Config: any = {
    API: 'api',
    HOST: 'http://localhost',
    PORT: '8080'
};

const result  = userService.registerUser( newUser,
                         'Error',
                         'failure',
                         'Success')
                          .subscribe(result=>{
                                                        console.log('Result === ', result)
                                                        return result;
                                                    });



let  loginUser = (<any>Object).assign( {}, {
    username: 'BinDaoBee',
    password: 'pass1111'
});


const loginResult  = userService.loginUser( loginUser,
                         'Error',
                         'failure',
                         'Success')
                          .subscribe(result=>{
                                                        console.log('loginResult === ', result)
                                                        return result;
                                                    });
