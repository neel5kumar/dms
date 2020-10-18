import RestRequest from './rest_request'
import * as API_END_POINTS from '../api/api_end_points'
import * as ResponseStatus from './response_status'
import axios from 'axios';
export default class ApiHelper {

    static submit(restRequest) {
        const requestOptions = {
            method: restRequest.getMethod(),
            headers: restRequest.getHeaders()
        };
        if (restRequest.getBody()) {
            requestOptions['body'] = restRequest.getBody()
        }


        return fetch(restRequest.getUrl(), requestOptions);
    }

    static deleteOneEntry(apiEndPoints, entryId) {
        var method = "DELETE"
        var url = apiEndPoints.deleteOneUrl(entryId)
        return ApiHelper.submit(RestRequest.restRequest(method, url, apiEndPoints.getHeaders()))
    }

    static getAll(apiEndPoints) {
        var returned = {}
        var url = apiEndPoints.getAllUrl();
        return () => {
            ApiHelper.submit(RestRequest.restRequest("GET", url, apiEndPoints.getHeaders()))
                .then(response => {
                    returned = response
                });
        }
        // return returned;
    }


    // static fetchFor(apiEndPoints) {

    //     return ApiHelper.fetchAllFrom(apiEndPoints);
    // }

    static tryLoggingIn(user, password) {
        var userinfo = {
            username: user,
            password: password
        }
        var received = {
            status: ResponseStatus.UnAuthorised
        }
        return axios.post('api-token-auth/', userinfo, {})
            .then((response => {
                if (response.status == 200) {
                    console.log(" authorised")
                    received = {
                        token: response.data.token,
                        status: ResponseStatus.Authorised
                    }
                }
                return received
            }),
                (error) => {
                    if (error.response.status == 400) {
                        console.log("400 Go to login Page");
                        // console.log(received);
                    }
                    if (error.response.status == 401) {
                        console.log("401 Go to login Page");
                        // console.log(received);
                    }
                    return received

                    console.log(error.response.status);
                });
    }



    static headerWithToken() {

        // return {
        //     headers: {
        //         'Authorization': localStorage.getItem('AuthorizationToken')
        //     }
        // }

        return { 'Authorization': localStorage.getItem('AuthorizationToken') }


    }





    static submitWithToken(promiseableMethod) {
        var received = { status: ResponseStatus.Failed }
        console.log("AuthorizationToken")

        return promiseableMethod
            .then((response) => {
                if (response.status == 200) {//TODO check
                    console.log(" 200 status")
                    //     return response.data;
                }
                received = {
                    responseData: response.data,
                    status: ResponseStatus.Successful

                }
                return received;
            }, (error) => {
                if (error.response.status == 401) {
                    received = {
                        status: ResponseStatus.Unauthorised
                    }
                    console.log("Go to login Page");
                    console.log(received);
                }
                return received
            });
    }

    static fetchAllWithToken(endPoints) {
        return ApiHelper.getWithToken(endPoints.getAllUrl(), endPoints.getHeaders())

    }
    static featchOneWithToken(endPoints, objectRef) {
        return ApiHelper.getWithToken(endPoints.getOneUrl(objectRef), endPoints.getHeaders())

    }
    static getWithToken(url, headerConfig) {
        headerConfig = { 'headers': { ...headerConfig, ...ApiHelper.headerWithToken() } }
        // headerConfig={}
        return ApiHelper.submitWithToken(axios.get(url, headerConfig))
    }

    static putOneWithToken(endPoints, objectRef, body) {
        return ApiHelper.putWithToken(endPoints.putOneUrl(objectRef), endPoints.getHeaders(), body)
    }
    static putWithToken(url, headerConfig, body) {
        headerConfig = { 'headers': { ...headerConfig, ...ApiHelper.headerWithToken() } }
        return ApiHelper.submitWithToken(axios.put(url, body, headerConfig))
    }

    static postOneWithToken(endPoints, body) {
        return ApiHelper.postWithToken(endPoints.postOneUrl(), endPoints.getHeaders(), body)
    }
    static postWithToken(url, headerConfig, body) {
        headerConfig = { 'headers': { ...headerConfig, ...ApiHelper.headerWithToken() } }
        return ApiHelper.submitWithToken(axios.post(url, body, headerConfig))
    }


    //check this code
    // axios.post(Helper.getUserAPI(), {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': 'JWT fefege...'
    //     },
    //     data
    // })      
    // .then((response) => {
    //     dispatch({type: FOUND_USER, data: response.data[0]})
    // })
    // .catch((error) => {
    //     dispatch({type: ERROR_FINDING_USER})
    // })

}