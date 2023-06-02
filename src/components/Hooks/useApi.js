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
            } else {
                console.log("refresh failed");
            }  

    }

    const saveNewData = (userData) => {
        const oldData = JSON.parse(localStorage.getItem("user"));
        const newData = JSON.stringify({...oldData, ...userData});
        localStorage.setItem("user", newData);

        return {"ok":"ok"};
    }


    const axiosReq = async (method, url, data, headers) => {
        try {
            const token = JSON.parse(localStorage.getItem("user"))?.accesToken
            const params = method === "GET"? data : null;
            const body = method !== "GET"? data : null;
            const reqParams = {
                method,
                params,
                data: body,
                headers: {...headers, Authorization: `Bearer ${token}`}
            };
            
            const resp = await axios(`${apiURL}/${url}`, reqParams);  

            if (resp.data?.res === "auth error2") {
                await refreshAuto();
                reqParams.headers = {...headers, Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.accesToken}`};
                const try2 = await axios(`${apiURL}/${url}`, reqParams);
                return try2;
            }
            return resp;
        } catch (e) {
            if (e?.response?.status===401) {

            }
            console.log(e);
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
    };
}
export default useApi;