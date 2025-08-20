## Quick Start
const { ReclaimClient } = require("@reclaimprotocol/zk-fetch");

// Initialize client
const client = new ReclaimClient('APPLICATION_ID', 'APPLICATION_SECRET');

// Make a verified request
const proof = await client.zkFetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd', {
  method: 'GET',
  headers: {
    accept: 'application/json'
  }
}, {
  responseMatches: [{
    type: 'regex',
    value: 'ethereum":{"usd":(?<price>.*?)}}',
  }],
  responseRedactions: [{ regex: 'ethereum":{"usd":(?<price>.*?)}}'}],  
});
Usage

## For public endpoints
If the endpoint you want to fetch and generate a proof of the response. This endpoint is public, and doesn't need any private data like auth headers/api keys.

This is useful when

Verifier needs to verify without re-doing the api call
The API doesn't need any private headers or auth
The proof or response needs to be generated for a particular endpoint now, and verified later
  const publicOptions = {
    method: 'GET', // or POST or PUT
    headers : {
        accept: 'application/json, text/plain, */*' 
    }
  }
  const proof = await client.zkFetch(
    'https://your.url.org',
    publicOptions
  )
Note : all the data in the publicOptions will be visible to them who you share the proof with (aka, verifier).

## For private endpoint
If you want to fetch and generate a proof of the response, but the fetch involves some private data like auth headers or api keys

This is useful when

Using API keys
Using Auth headers
  const publicOptions = {
    method: 'GET', // or POST
    headers : {
      accept: 'application/json, text/plain, */*' 
    }
  }

  const privateOptions = {
    headers {
        apiKey: "123...456",
        someOtherHeader: "someOtherValue",
    }
  }

  const proof = await client.zkFetch(
    'https://your.url.org',
    publicOptions,
    privateOptions
  )

All the data in the privateOptions will stay hidden to the verifier.

## Using Secret Params
You can add secret params to the request. This won't be revealed in the proof and hidden from the verifier.

For example, here's how you can make a POST request with a body containing a JSON object that includes a secret value

  const publicOptions = {
    method: 'POST',
    body: JSON.stringify({
      'param1': '{{value}}'
    })
  }

  const privateOptions = {
    paramValues: {
      'value': 'secret_value'
    }
  }

  const proof = await client.zkFetch(
    'https://your.url.org',
    publicOptions,
    privateOptions
  )
This will replace the '{{value}}' in the body with 'secret_value' and send the request to the server. but the secret_value will remain hidden from the verifier and will not be revealed in the proof.

Using CookieStr
You can add cookieStr to the request. This won't be revealed in the proof and hidden from the verifier.

  const privateOptions = {
    cookieStr: 'cookie_value'
  }
## Using Response Matches and Redactions
You can also use responseMatches and responseRedactions to match and redact the response. This is useful when you want to verify the response against a particular value or redact some part of the response.

 const publicOptions = {
    method: 'GET', // or POST
    headers : {
      accept: 'application/json, text/plain, */*' 
    }
  }

  const privateOptions = {
    responseMatches: [
      {
        type: 'contains' | 'regex', // type of match 
        value: '<HTTP RESPONSE TEXT>' | '<REGEX>', // value to match or regex to match 
      }
    ],
    responseRedactions: [
      {
        jsonPath: '$.data', // JSON path to redact 
        xPath: '/data', // Xpath to redact  
        regex: '<REGEX>', // Regex to redact
      }
    ]
  }

  const proof = await client.zkFetch(
    'https://your.url.org',
    publicOptions,
    privateOptions
  )

## Using Context
You can add context to your proof request, which can be useful for providing additional information:

  const publicOptions = {
    context: {
      contextAddress: '0x0000000000000000000000000000000000000000',
      contextMessage: 'message'
    }
  }

## Using the response
The response looks like the follows

{
  claimData: {
    provider: 'http',
    parameters: '{"body":"","method":"GET","responseMatches":[{"type":"regex","value":"ethereum\\":{\\"usd\\":(?<price>.*?)}}"}],"responseRedactions":[],"url":"https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"}',
    owner: '0x96faf173bb7171a530b3e44f35f32d1307bda4fa',
    timestampS: 1725377559,
    context: '{"contextAddress":"0x0000000000000000000000000000000000000000","contextMessage":"message","extractedParameters":{"price":"2446.75"},"providerHash":"0xe5a9592ed030d011f1755f392c07aea1f3cb0492ad8910254b25f80ad556e3bb"}',
    identifier: '0x8518b246857a47658edc8314319305c1fb5eb666ec3ee36ae07e1564c73ff288',
    epoch: 1
  },
  identifier: '0x8518b246857a47658edc8314319305c1fb5eb666ec3ee36ae07e1564c73ff288',
  signatures: [
    '0x02d14b5f3377875ecab84125e53c2387b7b1a50b4762840b33dd24117326b88670818e24668aa65c5e80f8d71c192ba5803a9ca1415d72a81f3efcf1341379d41c'
  ],
  extractedParameterValues: { price: '2446.75' },
  witnesses: [
    {
      id: '0x307832343438393735373233363865616466363562666263356165633938643865353434336139303732',
      url: 'wss://witness.reclaimprotocol.org/ws'
    }
  ]
}

## Verify the proofs and transform proof for onchain

### Verify the proofs
Install @reclaimprotocol/js-sdk

$ npm install @reclaimprotocol/js-sdk
Import the verifyProof function from the js-sdk

const { verifyProof } = require('@reclaimprotocol/js-sdk');
Use verifyProof(proof)

You must send the proofObject and not the verifiedResponse to the verifier for them to be able to verify.

const isProofVerified = await verifyProof(proof);
it verifies the authenticity and completeness of a given proof. It checks if the proof contains signatures, recalculates the proof identifier, and verifies it against the provided signatures. If the verification fails, it will log the error and return false.

### Transform proof for onchain
Transforms proof data into a format suitable for on-chain transactions, you need to use it before sending the proof to the blockchain.

Import the transformForOnchain function from the js-sdk

const { transformForOnchain } = require('@reclaimprotocol/js-sdk');
Use transformForOnchain(proof) to transform the proof for onchain.

const onchainProof = transformForOnchain(proof);

## Add Retries and Retry Interval
You can add retries and timeout to the fetch request. The default value for retries is 1 and timeout is 1000ms.

  const publicOptions = {
    method: 'GET', // or POST
    headers : {
      accept: 'application/json, text/plain, */*' 
    }
  }

  const privateOptions = {
    headers {
        apiKey: "123...456",
        someOtherHeader: "someOtherValue",
    }
  }

  const proof = await client.zkFetch(
    'https://your.url.org',
    publicOptions,
    privateOptions,
    5, // retries
    10000 // retryInterval
  )

## Add GeoLocation
You can add geolocation information to your fetch request. The default value for geoLocation is null.

Note: The geoLocation should be a two-letter ISO country code, for example, 'US' for the United States.

  const publicOptions = {
    method: 'GET', // or POST
    headers : {
      accept: 'application/json, text/plain, */*' 
    }
    // geoLocation should be a two-letter ISO country code, e.g., 'US' for the United States
    geoLocation: 'US'
  }

  const proof = await client.zkFetch(
    'https://your.url.org',
    publicOptions,
  )

## Decentralised zkFetch
By default, the ReclaimClient.zkfetch() responds with one proof returned from a Reclaim attestor. However, there is an option to retrieve multiple proofs in a decentralised manner. The process relies on Smart Contracts and is a part of Reclaim's decentralisation plan.

To incur this behavior, it is sufficient to pass the isDecentralised flag as True:

async zkFetch(
    ...
    isDecentralised?: boolean,
    ...
  ){
    ...
  }