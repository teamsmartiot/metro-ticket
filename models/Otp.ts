import { Schema, model, models } from "mongoose";

const CupBoardSchema = new Schema(
	{
		email: { type: String, required: true }, // Tủ (optional)
		code: { type: String, required: true }, // ID Vân Tay (optional)
	},
	{ timestamps: true }
);

const Otp = models.Otp || model("Otp", CupBoardSchema);

export default Otp;
