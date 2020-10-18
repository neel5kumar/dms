import ApiConfig from './api_config'


export const  INVENTORY_ITEMS_END_POINT=new ApiConfig(
    "/api/inventory/items",
    {
      'Accept': 'application/json',
      'Content-type': 'application/json'
      // 'Content-type': 'multipart/form-data' //multipart/form-data
    },
    "json"
);

export const  INVENTORY_LOCATIONS_END_POINT=new ApiConfig(
  "/api/inventory/locations",
  {
    'Accept': 'application/json',
    'Content-type': 'application/json'
    // 'Content-type': 'multipart/form-data' //multipart/form-data
  },
  "json"
);


export const  INVENTORY_ITEM_TYPES_END_POINT=new ApiConfig(
  "/api/inventory/item-types",
  {
    'Accept': 'application/json',
    'Content-type': 'application/json'
    // 'Content-type': 'multipart/form-data' //multipart/form-data
  },
  "json"
);

export const  INVENTORY_ITEM_MAKERS_END_POINT=new ApiConfig(
  "/api/inventory/item-makers",
  {
    'Accept': 'application/json',
    'Content-type': 'application/json'
    // 'Content-type': 'multipart/form-data' //multipart/form-data
  },
  "json"
);

export const  LOGIN_ENDPOINT=new ApiConfig(
  "/login/",
  {
    'Accept': 'application/json',
    'Content-type': 'application/json'
    // 'Content-type': 'multipart/form-data' //multipart/form-data
  },
  "json"
);
