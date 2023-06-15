import axios from "axios";

const useApi = () => {
    const apiURL = process.env.REACT_APP_BacEnd || `http://localhost:3001`;
    // console.log(apiURL);

    const refreshAuto = async () => {
            const newToken = await axios(`${apiURL}/auth/refresh`, {
                method: "POST",
                data: {refreshToken : JSON.parse(localStorage.getItem("user"))?.refreshToken},
            })
            if (newToken?.data?.refreshToken) {
                saveNewData(newToken.data);
                return newToken.data.accesToken;
            } else {
                console.log("refresh failed");
            }
    }

    const saveNewData = (userData) => {
        try {
            const oldData = JSON.parse(localStorage.getItem("user"));
            const newData = JSON.stringify({...oldData, ...userData});
            localStorage.setItem("user", newData);
        } catch (e) {
            console.log(e);
        }
    }

    const try2 = async (reqParams, newToken) => {
        reqParams.headers = {...reqParams.headers, Authorization: `Bearer ${newToken}`};
        const resp2 = await axios(reqParams);  
        return resp2;
    }

    const axiosReq = async (method, url, data, headers) => {
        
        const token = JSON.parse(localStorage.getItem("user"))?.accesToken
        const params = method === "GET"? data : null;
        const body = method !== "GET"? data : null;
        const reqParams = {
            method,
            params,
            data: body,
            headers: {...headers, Authorization: `Bearer ${token}`}
        };

        try {
            const resp = await axios(`${apiURL}/${url}`, reqParams); 
            return resp;
        } catch (e) {
            if (e?.response?.data.res==="auth error2" ){
                const newToken = await refreshAuto();
                const resp2 = await try2(reqParams, newToken);
                return resp2;
            }
            //console.log(e);
            //window.location.reload();
            // return e
        }
    };

    return {
        register: (data) => axiosReq("POST", "auth/reg", data),
        logOut: (data) => axiosReq("POST", "auth/logOut", data),
        logIn: (data) => axiosReq("POST", "auth/login", data),
        check: (data) => axiosReq("POST", "auth/check", data),
        refresh: refreshAuto,


        getList: (data) => axiosReq("GET", "items/getall", data),
        getListFree: (data) => axiosReq("GET", "items/getallFree", data),
        createItem: (data) => axiosReq("POST", "items/addItem", data),
        update: (data) => axiosReq("POST", "items/update", data),
        delItem: (data) => axiosReq("DELETE", "items/delItem", data),

        getImage: (data) => axiosReq("GET", "items/getImage", data),
        uploadImage: (data) => axiosReq("POST", "items/newImage", data)
    };
}
export default useApi;