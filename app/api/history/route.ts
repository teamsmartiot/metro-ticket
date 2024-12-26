import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import History from "@/models/History"; // Sử dụng mô hình History
import Ticket from "@/models/Ticket";
import User from "@/models/User";

// Kết nối với MongoDB
connectToDatabase();

// Xử lý GET request: Lấy danh sách lịch sử
export async function GET() {
	try {
		const histories = await History.find()
			.populate("ticketId", "ticketCode amount seatNumber") // Populate thông tin vé
			.populate("user", "name email phoneNumber"); // Populate thông tin người dùng nếu cần
		return NextResponse.json(histories, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

// Xử lý POST request: Thêm lịch sử giao dịch mới
export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { userId, ticketId, rentDate, returnDate, status } = body; // Lấy thông tin từ request

		// Kiểm tra người dùng
		const user = await User.findById(userId);
		if (!user) {
			throw new Error("User not found");
		}

		// Kiểm tra vé
		const ticket = await Ticket.findById(ticketId);
		if (!ticket) {
			throw new Error("Ticket not found");
		}

		// Tạo lịch sử giao dịch mới
		const newHistory = new History({
			name: user.name,
			email: user.email,
			phoneNumber: user.phoneNumber,
			ticketId: ticketId,
			rentDate: rentDate,
			returnDate: returnDate || null, // Có thể là null nếu chưa trả vé
			status: status || "pending", // Trạng thái mặc định là pending
		});

		await newHistory.save();

		return NextResponse.json(newHistory, { status: 201 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
}

// Xử lý PUT request: Cập nhật thông tin lịch sử giao dịch
export async function PUT(req: Request) {
	try {
		const body = await req.json();
		const { id, ...updateData } = body;

		const updatedHistory = await History.findByIdAndUpdate(id, updateData, { new: true }).populate(
			"ticketId",
			"ticketCode amount seatNumber"
		);

		return NextResponse.json(updatedHistory, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
}
