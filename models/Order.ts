import { Schema, model, models } from "mongoose";

// Định nghĩa schema cho Order
const OrderSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User", // Liên kết với mô hình User
			required: true,
		},
		tickets: [
			{
				type: Schema.Types.ObjectId,
				ref: "Ticket", // Liên kết với mô hình Ticket
				required: true,
			},
		],
		totalAmount: {
			type: Number,
			required: true,
		},
		orderDate: {
			type: Date,
			default: Date.now,
		},
		status: {
			type: String,
			enum: ["pending", "completed", "cancelled"], // Trạng thái đơn hàng: đang chờ, đã hoàn thành, đã hủy
			default: "pending",
		},
	},
	{ timestamps: true } // Tự động tạo các trường `createdAt` và `updatedAt`
);

// Tạo mô hình Order
const Order = models.Order || model("Order", OrderSchema);

export default Order;
