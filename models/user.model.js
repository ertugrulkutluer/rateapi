const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { Schema } = mongoose;
const UserSchema = new Schema(
  {
    token: String,
    username: String,
    role: {
      type: String,
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
UserSchema.set("timestamps", true); // this will add createdAt and updatedAt timestamps
UserSchema.plugin(mongoosePaginate);
mongoose.model("User", UserSchema);
