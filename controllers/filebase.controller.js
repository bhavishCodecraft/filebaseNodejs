const filebaseService = require('../services/filebase.service');


const listBuckets = async (req, res) => {
    const response = await filebaseService.listBuckets();
    if (response.status === 'success') {
        res.status(200).send({ status: 'success', code: 200, data: response.data, message: 'bucket list fetched' });
    } else {
        res.status(400).send({ status: 'failed', code: 400, message: "Something went wrong", error: response.error });
    }
}

const listObjects = async (req, res) => {
    const { Bucket, MaxKeys } = req.body

    const expectedBody = {
        Bucket: 'filebase-bucket',
        MaxKeys: 20
    }

    if (!(Bucket || MaxKeys)) {
        res.status(400).send({ status: 'failed', code: 400, message: `Invalid request body.`, expectedBody });
    }

    const response = await filebaseService.listObjects(req.body);
    if (response.status === 'success') {
        res.status(200).send({ status: 'success', code: 200, data: response.data, message: 'Object list fetched' });
    } else {
        res.status(400).send({ status: 'failed', code: 400, message: "Something went wrong", error: response.error });
    }
}

const putObject = async (req, res) => {
    const { Bucket, Key, ContentType, Body, ACL } = req.body

    const expectedBody = {
        Bucket: 'filebase-bucket',
        Key: 'folder/image_name',
        ContentType: 'image/png',
        Body: "myPictureFile",
        ACL: 'public-read',
    }

    if (!(Bucket || Key || ContentType || Body || ACL)) {
        res.status(400).send({ status: 'failed', code: 400, message: `Invalid request body.`, expectedBody });
    }

    const response = await filebaseService.putObject(req.body);
    if (response.status === 'success') {
        res.status(200).send({ status: 'success', code: 200, data: response.data, message: 'object uploaded to bucket' });
    } else {
        res.status(400).send({ status: 'failed', code: 400, message: "Something went wrong", error: response.error });
    }
}

const getObject = async (req, res) => {
    const { Bucket, Key } = req.body

    const expectedBody = {
        Bucket: 'filebase-bucket',
        Key: 'folder/image_name',
    }

    if (!(Bucket || Key )) {
        res.status(400).send({ status: 'failed', code: 400, message: `Invalid request body.`, expectedBody });
    }

    const response = await filebaseService.getObject(req.body);
    if (response.status === 'success') {
        res.status(200).send({ status: 'success', code: 200, data: response.data, message: 'object fetched' });
    } else {
        res.status(400).send({ status: 'failed', code: 400, message: "Something went wrong", error: response.error });
    }
}

module.exports = {
    listBuckets,
    listObjects,
    putObject,
    getObject
}