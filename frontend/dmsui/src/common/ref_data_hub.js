import RestRequest from './rest_request'
import ApiHelper from './api_helper'
import * as API_END_POINTS from '../api/api_end_points'

export default class RefDataHub {

    static fetchAllLocations() {
        return ApiHelper.fetchAllWithToken(API_END_POINTS.INVENTORY_LOCATIONS_END_POINT)
    }
    static fetchAllItemTypes() {
        return ApiHelper.fetchAllWithToken(API_END_POINTS.INVENTORY_ITEM_TYPES_END_POINT)
    }
    static fetchAllMakers() {
        return ApiHelper.fetchAllWithToken(API_END_POINTS.INVENTORY_ITEM_MAKERS_END_POINT)
    }

    static fetchAllInventoryItems() {
        return ApiHelper.fetchAllWithToken(API_END_POINTS.INVENTORY_ITEMS_END_POINT)
    }
    static fetchInventoryItem(objectRef) {
        return ApiHelper.featchOneWithToken(API_END_POINTS.INVENTORY_ITEMS_END_POINT,objectRef)
    }

    static putOneInventoryItem(objectRef, body) {
        var endPoint=API_END_POINTS.INVENTORY_ITEMS_END_POINT;
        return ApiHelper.putOneWithToken(endPoint,objectRef,body)
    }

    static postOneInventoryItem(body) {
        var endPoint=API_END_POINTS.INVENTORY_ITEMS_END_POINT;
        return ApiHelper.postOneWithToken(endPoint,body)
    }

    
    

    static fetchAllLocationNames() {
        return RefDataHub.fetchAndPopulate(RefDataHub.fetchAllLocations(), 'locationName');
    }
    static fetchAllMakerNames() {
        return RefDataHub.fetchAndPopulate(RefDataHub.fetchAllMakers(), 'itemMakerName');
    }
    static fetchAllItemTypeNames() {
        return RefDataHub.fetchAndPopulate(RefDataHub.fetchAllItemTypes(), 'itemTypeName');
    }

    

    static fetchAndPopulate(fetchPromise, jsonKey) {
        return fetchPromise.then(received => {
            var items=received.responseData.results
            var entries = []
            items.forEach(item => {
                entries.push(item[jsonKey])
            });
            return entries
        })
    }


}