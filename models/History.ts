import { Schema, model, models } from "mongoose";

const HistorySchema = new Schema(
	{
		name: { type: String, required: true }, // Tên người dùng
		email: { type: String, required: true, lowercase: true }, // Email người dùng
		phoneNumber: { type: String }, // Số điện thoại (có thể là tùy chọn)
		ticketId: {
			type: Schema.Types.ObjectId,
			ref: "Ticket", // Liên kết với mô hình Ticket nếu liên quan đến vé
		},
		rentDate: { type: Date, required: true }, // Ngày thuê
		returnDate: { type: Date }, // Ngày trả
		status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" }, // Trạng thái lịch sử
	},
	{ timestamps: true } // Tự động tạo các trường createdAt và updatedAt
);

const History = models.History || model("History", HistorySchema);

export default History;
