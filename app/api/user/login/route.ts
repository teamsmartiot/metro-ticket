import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

// Kết nối với MongoDB
connectToDatabase();

// Xử lý POST request: Đăng nhập
export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { email, password } = body;

		// Tìm người dùng trong cơ sở dữ liệu bằng email
		const user = await User.findOne({ email, password });

		if (!user) {
			return NextResponse.json({ error: "Tài khoản không tồn tại" }, { status: 400 });
		}

		// Nếu đăng nhập thành công, trả về thông tin người dùng (bạn có thể trả về token nếu muốn)
		return NextResponse.json(
			{
				message: "Đăng nhập thành công",
				user: { id: user._id, name: user.name, email: user.email },
			},
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
