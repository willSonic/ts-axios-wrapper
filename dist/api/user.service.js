var UserServices = /** @class */ (function () {
    function UserServices(httpWrapperService) {
        this.httpWrapperService = httpWrapperService;
    }
    UserServices.prototype.getUserById = function (payload, ErrorActionType, SpecificErrorType, SuccessType) {
        var getParams = {
            auth: true,
            errorActionType: ErrorActionType,
            specificErrorType: SpecificErrorType,
            payload: payload,
            responseObject: 'user',
            successActionType: SuccessType,
            uri: 'Users/' + payload
        };
        return this.httpWrapperService.get(getParams);
    };
    UserServices.prototype.getUserByName = function (payload, ErrorActionType, SpecificErrorType, SuccessType) {
        var getParams = {
            auth: false,
            errorActionType: ErrorActionType,
            specificErrorType: SpecificErrorType,
            payload: payload,
            responseObject: 'user',
            successActionType: SuccessType,
            uri: 'Users/username/' + payload
        };
        return this.httpWrapperService.get(getParams);
    };
    UserServices.prototype.loginUser = function (payload, ErrorActionType, SpecificErrorType, SuccessType) {
        var postParams = {
            auth: false,
            errorActionType: ErrorActionType,
            specificErrorType: SpecificErrorType,
            payload: payload,
            responseObject: 'account',
            successActionType: SuccessType,
            uri: 'Authorizations/Login'
        };
        return this.httpWrapperService.post(postParams);
    };
    UserServices.prototype.logoutUser = function (ErrorActionType, SpecificErrorType, SuccessType) {
        var postParams = {
            auth: true,
            errorActionType: ErrorActionType,
            specificErrorType: SpecificErrorType,
            responseObject: 'general',
            successActionType: SuccessType,
            uri: 'Authorizations/Logout'
        };
        return this.httpWrapperService.post(postParams);
    };
    UserServices.prototype.registerUser = function (payload, ErrorActionType, SpecificErrorType, SuccessType) {
        var postParams = {
            auth: false,
            errorActionType: ErrorActionType,
            specificErrorType: SpecificErrorType,
            payload: payload,
            responseObject: 'account',
            successActionType: SuccessType,
            uri: 'Users'
        };
        return this.httpWrapperService.post(postParams);
    };
    return UserServices;
}());
export { UserServices };
//# sourceMappingURL=user.service.js.map