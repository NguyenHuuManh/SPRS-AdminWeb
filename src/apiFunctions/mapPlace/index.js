import { API_KEY_GOONG, CITY, DETAIL_PLACE_ID, DETAIL_PLACE_LAT_LNG, DISTRICT, PLACE_AUTOCOMPLETE, SUBDISTRICT } from "src/constrants/action";
import { convertToQuery } from "src/helps/function";
import httpServices from "src/services/httpServices";

export const apiPlaceDetailByLongLat = async (long, lat) => {
    // return await httpServices.get(
    //     `${DETAIL_PLACE_LAT_LNG}?latlng=${lat},${long}&api_key=${API_KEY_GOONG}`,
    // );
    return await fetch(`${DETAIL_PLACE_LAT_LNG}?latlng=${lat},${long}&api_key=${API_KEY_GOONG}`);
};

export const apiPlaceDetailById = async (id) => {
    // return await httpServices.get(
    //     `${DETAIL_PLACE_ID}?place_id=${id}&api_key=${API_KEY_GOONG}`,
    // );
    return await fetch(`${DETAIL_PLACE_ID}?place_id=${id}&api_key=${API_KEY_GOONG}`)
};

export const apiPlaceAutoComplete = async (key) => {
    const param = {
        api_key: API_KEY_GOONG,
        input: key
    }
    // return await httpServices.get(
    //     `${PLACE_AUTOCOMPLETE}${convertToQuery(param)}`,
    // );
    return await fetch(`${PLACE_AUTOCOMPLETE}${convertToQuery(param)}`)
};

export const apiCity = async () => {
    return await httpServices.get(`${CITY}`);
};

export const apiDistrict = async (id) => {
    return await httpServices.get(`${DISTRICT}${id}`);
}

export const apiSubDistrict = async (id) => {
    return await httpServices.get(`${SUBDISTRICT}${id}`);
}


