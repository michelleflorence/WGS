const successGetResponse = (res, data) => {
    res.status(200).json({
        'Status': 200,
        'Message': 'Success!',
        'Data': data
    })
}

const failedGetResponse = (res) => {
    res.status(400).json({
        'Status': 400,
        'Message': 'Failed!',
    })
}

const successInsertResponse = (res) => {
    res.status(200).json({
        'Status': 200,
        'Message': 'Success!'
    })
}

const failedInsertResponse = (res) => {
    res.status(400).json({
        'Status': 400,
        'Message': 'Failed!',
    })
}

module.exports = {successGetResponse, failedGetResponse, successInsertResponse, failedInsertResponse}