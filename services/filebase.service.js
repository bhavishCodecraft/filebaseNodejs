const AWS = require('aws-sdk');
const Q = require('q');
const fs = require('fs');
const endpoint = process.env.s3_endpoint;
const signatureVersion = process.env.s3_signatureVersion;
const accessKeyId = process.env.s3_accessKeyId;
const secretAccessKey = process.env.s3_secretAccessKey;

const s3 = new AWS.S3({ endpoint, signatureVersion, accessKeyId, secretAccessKey });

async function listBuckets() {
    const deferred = Q.defer();
    // s3.listBuckets(function (err, data) {
    //     if (err) {
    //         console.log(err, err.stack);
    //     } else {
    //         var params = {
    //             Body: 'Hello, world!',
    //             Bucket: data['Buckets'][0]['Name'],
    //             Key: 'exampleobject',
    //             ContentType: 'text/plain',
    //             Metadata: {
    //                 'metadata1': 'value1',
    //                 'metadata2': 'value2'
    //             }
    //         };
    //         s3.putObject(params, function (err, data) {
    //             if (err) {
    //                 console.log(err, err.stack);
    //             } else {
    //                 console.log(data);
    //             }
    //         });
    //     }
    // });

    s3.listBuckets(function (err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
            const response = { status: 'failed', error: err }
            deferred.resolve(response)
        } else {
            const response = { status: 'success', data }
            deferred.resolve(response)
        }
    });
    return deferred.promise;
}

function listObjects(params) {
    const deferred = Q.defer();

    s3.listObjectsV2(params, function (err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
            const response = { status: 'failed', error: err }
            deferred.resolve(response)
        } else {
            const response = { status: 'success', data }
            deferred.resolve(response)
        }
    });
    return deferred.promise;
}

function putObject(params) {
    const deferred = Q.defer();
    s3.putObject(params, function (err, data) {
        if (err) {
            deferred.resolve({ status: 'failed', error: err })
        } else {
            deferred.resolve({ status: 'success', data })
        }
    });
    return deferred.promise;
}

function getObject(params) {
    const deferred = Q.defer();
    s3.getObject(params, function (err, data) {
        if (err) {
            deferred.resolve({ status: 'failed', error: err })
        } else {
            deferred.resolve({ status: 'success', data })
        }
    });
    return deferred.promise;
}

module.exports = {
    listBuckets,
    listObjects,
    putObject,
    getObject
};