# pnd-api-signature
Common module needed for all PND APIs. The module provides signature generation and validation.

## Installation 
The module is only available in the Github repository. To add the module in your project, add it in your package.json file as a Github dependency. Example:
`"pnd-api-signature": "git+https://github.com/emtech-services/pnd-api-signature.git"`
or directly with npm:
`npm install --save https://github.com/emtech-services/pnd-api-signature.git`

## Usage
After installing the dependency the functionality can be used as shown below.

### Create signature
```javascript
import Signature from "pnd-api-signature";

const sig = new Signature.Signature();
console.log(sig.createSignature("0xa7b4a4ef05f454c1bf0245d2c9280c76d981ec9d688f4c38eece936710601b0c", "GET", "pnd/wallet", "nonce=2020-11-12T13:56:02"));
```
### Recover Address
```javascript
import Signature from "pnd-api-signature";

const sig = new Signature.Signature();
console.log(sig.recoverAddress(req));
```