import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
	{
		name: { type: String, required: true },
		phone: { type: String, required: true },
		email: { type: String, required: true, unique: true, lowercase: true },
		password: { type: String, required: true },
		tickets: [
			{
				type: Schema.Types.ObjectId,
				ref: "Ticket",
			},
		],
		orders: [
			{
				type: Schema.Types.ObjectId,
				ref: "Order", // Liên kết với mô hình Order
			},
		],
	},
	{ timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
