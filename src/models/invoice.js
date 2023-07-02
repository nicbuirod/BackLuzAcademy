import mongoose, { Schema } from "mongoose";

const InvoiceSchema = new Schema({
  number: {
    type: Number,
    unique: true,
    require: true,
  },
});

const Invoice = mongoose.model("Invoice", InvoiceSchema);

export default Invoice;
