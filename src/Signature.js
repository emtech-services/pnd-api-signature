import Web3 from "web3";

export default class Signature {

    /**
    * Create signature that need to be included in PND services requests. The signature should be added in X-User-Signature header.
    * The signature is calculated by appending the http method, the path of the endpoint and the parameters/body of the request.
    *
    * @param privateKey the private key used to sign the message
    * @param httpMethod the http method of the endpoint
    * @param path the path of the endpoint
    * @param parameters the parameters of the body of the request
    */
    createSignature(privateKey, httpMethod, path, parameters) {
        const provider = new Web3();
        provider.eth.accounts.privateKeyToAccount(privateKey);
        let signatureBase = httpMethod;
        if (httpMethod === "GET") {
            signatureBase = signatureBase + encodeURIComponent(path + parameters);
        } else {
            signatureBase = signatureBase + path + JSON.stringify(parameters);
        }
        return provider.eth.accounts.sign(signatureBase, privateKey);
    };

    /**
    * Recovers the wallet address from the received request. 
    * The address is recovered from the X-User-Address header.
    *
    * @param req the request that was received
    */
    recoverAddress(req) {
        if(!('x-user-signature' in req.headers)) {
            throw 'Header x-user-signature is missing'
        }
        const provider = new Web3();
        let signature = "";
        if (req.method === "GET") {
            signature = req.method + req.url;
        } else {
            signature = req.method + req.route.path + JSON.stringify(req.body);
        }
        const recovered = provider.eth.accounts.recover(signature, req.headers['x-user-signature']);
        console.log("recoverAddres");
    };

}