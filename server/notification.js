const mongoose = require("mongoose");
const {Schema} = mongoose;

const notifSchema = new Schema(
    {
        title:{
            type:Number
        },
        isRead:{
            type:Boolean
        }
    }
)
const Notis = mongoose.model("noti", notifSchema);
Notis.createIndexes();
module.exports = Notis;