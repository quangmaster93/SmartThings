
export default class Network {
    static get(path, callBack) {
        // console.log("Network.dkm()" + Network.token);
        // console.log(Network.dkm());
        return fetch(Network.dkm().endpoint + path, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Network.token}`
            }
        }).then(responseJson => {
            if (responseJson.status == 200) {
                callBack(responseJson)
            }
            else {
                Network.handleError(responseJson, callBack)
            }

        }).catch(error => {
            console.error(error);
        });
    }

    static post(path, data, callBack) {
        fetch(Network.dkm().endpoint + path, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Network.token}`
            },
            body: data
        }).then(responseJson => {
            callBack(responseJson)
        }).catch(error => {
            console.error(error);
        });
    }

    static handleError(responseJson, callBack) {
        let bodyInit = JSON.parse(responseJson._bodyInit);
        console.error(`[Network] ${bodyInit.error.message}`);
        switch (responseJson.status) {
            case 401:
                // TODO: refresh token
                break;
        }
    }

    static dkm() {
        var v = {
            grant_type: "authorization_code",
            redirect_uri: "cloud.artik.example.hellocloud://oauth2callback",
            state: "abcdefgh",
            code_verifier: "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk",
            client_id: "0c2cefcfe2f245f58e053c31fa2241cb",
            endpoint: 'https://api.artik.cloud/v1.1'
        };
        return v;
    };
}

