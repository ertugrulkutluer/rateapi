const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    items: [mongoose.Types.ObjectId],
    delivered: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
OrderSchema.set("timestamps", true); // this will add createdAt and updatedAt timestamps
OrderSchema.plugin(mongoosePaginate);
mongoose.model("Order", OrderSchema);
