const mongoose = require("mongoose");

const pSchema = mongoose.Schema({
    pid: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'packers'
    },
    mid: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'movers'
    },

    fromcity: {
        type: String,
        required: true
    },
    fromlmark: {
        type: String,
        required: true
    }, fromstreet: {
        type: String,
        required: true
    },
    fromdistrict: {
        type: String,
        required: true
    },
    fromhname: {
        type: String,
        required: true
    },
    tocity: {
        type: String,
        required: true
    },
    tolmark: {
        type: String,
        required: true
    }, tostreet: {
        type: String,
        required: true
    },
    todistrict: {
        type: String,
        required: true
    },
    tohname: {
        type: String,
        required: true
    },
    type: {
        type: String,

        required: true
    },
    distance: {
        type: Number,

        required: true
    },
    boxes: {
        type: Number
    },
    vehicle: {
        type: Boolean
    },
    weight: {
        type: Number


    },
    rate: {
        type: Number
    },
    comments: {
        type: String
    },
    date: {
        type: Date,

        required: true
    },
    time: {
        type: String,

        required: true
    }, paymenttype: {
        type: String
    },
    paymentStatus: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: 'pending'
    },

    godownDays: {
        type: Number,
        default: 0
    },
    driverid: {
        type: mongoose.Types.ObjectId,
        ref: 'drivers',
        default: null
    },
    driverstatus: {
        type: String,
        default: 'pending'
    }
});
module.exports = mongoose.model('pluggages', pSchema)

