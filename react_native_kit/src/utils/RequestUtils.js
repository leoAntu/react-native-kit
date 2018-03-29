'use strict';
function GUID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
    }
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`
}

function encodeQuery(path, data = {}) {
    let url = path
    if (!data || !Object.keys(data).length) {
        return url
    }

    url = url.indexOf("?") === -1 ? `${url}?` : `${url}&`

    const query = Object.keys(data)
        .map(key => `${key}=${data[key]}`)
        .join("&")

    return `${url}${query}`
}

const request = (url, method='get', data={}, body={}) => {

    let isOK;

    return new Promise((resolve, reject) => {
        const requestUrl = encodeQuery(url,data)
        console.log(requestUrl);
        fetch(requestUrl, {
            method: method,
            credentials: "include",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            // body: body
        })
            .then((response) => {
                if (response.ok) {
                    isOK = true;
                } else {
                    isOK = false;
                }
                return response.json();
            })
            .then((responseData) => {
                if (isOK) {
                    resolve(responseData);
                } else {
                    reject(responseData);
                }
            })
            .catch((error) => {
                reject(error);
            })
    })
}


export default  {
    request
}