import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Order from "@/models/Order"; // Sử dụng mô hình Order
import Ticket from "@/models/Ticket"; // Sử dụng mô hình Ticket
import User from "@/models/User";

// Kết nối với MongoDB
connectToDatabase();

// Xử lý GET request: Lấy danh sách đơn hàng
export async function GET() {
	try {
		const orders = await Order.find()
			.populate("user", "firstName lastName email") // Populate thông tin người dùng
			.populate("tickets", "ticketCode amount seatNumber"); // Populate thông tin vé
		return NextResponse.json(orders, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

// Xử lý POST request: Thêm đơn hàng mới
export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { userId, ticketIds } = body; // Lấy thông tin userId và ticketIds từ request

		// Tìm người dùng
		const user = await User.findById(userId);
		if (!user) {
			throw new Error("User not found");
		}

		// Tìm các vé từ mảng ticketIds
		const tickets = await Ticket.find({ _id: { $in: ticketIds } });
		if (tickets.length !== ticketIds.length) {
			throw new Error("Some tickets not found");
		}

		// Tính tổng số tiền của đơn hàng
		const totalAmount = tickets.reduce((sum, ticket) => sum + ticket.amount, 0);

		// Tạo đơn hàng mới
		const newOrder = new Order({
			user: userId,
			tickets: ticketIds,
			totalAmount: totalAmount,
			status: "pending", // Trạng thái ban đầu là pending
		});

		await newOrder.save();

		// Thêm đơn hàng vào mảng `orders` của người dùng
		user.orders.push(newOrder._id);
		await user.save();

		return NextResponse.json(newOrder, { status: 201 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
}

// Xử lý PUT request: Cập nhật thông tin đơn hàng
export async function PUT(req: Request) {
	try {
		const body = await req.json();
		const { id, ...updateData } = body;
		const updatedOrder = await Order.findByIdAndUpdate(id, updateData, { new: true })
			.populate("user", "firstName lastName email")
			.populate("tickets", "ticketCode amount seatNumber");
		return NextResponse.json(updatedOrder, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
}
