import { Schema, model, models } from "mongoose";

// Định nghĩa schema cho Ticket
const TicketSchema = new Schema(
	{
		ticketCode: {
			type: String,
			required: true, // ticketCode là bắt buộc
			unique: true, // ticketCode phải là duy nhất
			trim: true, // Loại bỏ khoảng trắng ở đầu và cuối
		},
		issueDate: {
			type: Date,
			required: true, // Ngày phát hành là bắt buộc
			default: Date.now, // Mặc định là ngày hiện tại
		},
		expirationDate: {
			type: Date,
			required: true, // Ngày hết hạn là bắt buộc
		},
		customerId: {
			type: Schema.Types.ObjectId,
			ref: "Customer", // Liên kết với mô hình Customer
			required: true,
		},
		status: {
			type: String,
			enum: ["active", "expired", "used"], // Các trạng thái vé
			default: "active",
		},
		amount: {
			type: Number,
			required: true, // Số tiền vé là bắt buộc
			min: [0, "Amount cannot be less than 0"], // Giá trị tối thiểu là 0
		},
		seatNumber: {
			type: String,
			required: true, // Số ghế là bắt buộc
		},
		departure: {
			type: String,
			required: true, // Điểm đi là bắt buộc
		},
		destination: {
			type: String,
			required: true, // Điểm đến là bắt buộc
		},
	},
	{
		timestamps: true, // Tự động thêm trường createdAt và updatedAt
	}
);

// Tạo model từ schema
const Ticket = models.Ticket || model("Ticket", TicketSchema);

export default Ticket;
