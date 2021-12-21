const SUCCESS_STATUS = [200, 201, 202, 203, 204];
export const callAPIPaging = (props) => {
  const { response, onSuccess, onError, size: limit } = props;
  if (SUCCESS_STATUS.includes(response?.code || response?.status)) {
    const returnData = {
      data: response?.data,
      meta: { totalPage: 0, totalItems: 0 },
    };
    if (response.headers["x-total-count"]) {
      const allDataCount = response.headers["x-total-count"];
      returnData.meta.totalItems = allDataCount;
      if (
        Number(allDataCount) / Number(limit) >
        Math.round(Number(allDataCount) / Number(limit))
      ) {
        returnData.meta.totalPage =
          Math.round(Number(allDataCount) / Number(limit)) + 1;
      } else {
        returnData.meta.totalPage = Math.round(
          Number(allDataCount) / Number(limit)
        );
      }
    }
    onSuccess(returnData);
    return;
  }
  onError({ data: response?.data, statusText: response?.statusText });
};

export function convertToQuery(param) {
  return (
    "?" +
    Object.keys(param)
      .map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(param[key]);
      })
      .join("&")
  );
}

export function uniqueArr(arr) {
  return Array.from(new Set(arr)) //
}

export const trimmedObject = (obj) => {
  const trimed = JSON.stringify(obj, (key, value) => {
    if (typeof value === "string") {
      return value.trim();
    }
    return value;
  });
  return JSON.parse(trimed);
};

export const countPage = (totalItems, size) => {
  if (Number(totalItems) / Number(size) > Math.round(Number(totalItems) / Number(size))) {
    return Math.round(Number(totalItems) / Number(size)) + 1;
  } else {
    return Math.round(Number(totalItems) / Number(size));
  }

}
export function calcItemStart(page, size) {
  return (page - 1) * size + 1;
}

export function removeAscent(str) {
  if (str === null || str === undefined) return str;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str;
}
