import Link from "next/link";
import React from "react";

// Định nghĩa các kiểu dữ liệu (Train, Ticket)
interface Train {
	id: number;
	name: string;
	departure: string;
	arrival: string;
	departureTime: string;
	arrivalTime: string;
	price: number;
}

const App: React.FC = () => {
	const trains: Train[] = [
		{
			id: 1,
			name: "Train A",
			departure: "Hà Nội",
			arrival: "TP. Hồ Chí Minh",
			departureTime: "2024-12-31 08:00",
			arrivalTime: "2024-12-31 20:00",
			price: 500000,
		},
		{
			id: 2,
			name: "Train B",
			departure: "Hà Nội",
			arrival: "Đà Nẵng",
			departureTime: "2024-12-31 09:00",
			arrivalTime: "2024-12-31 18:00",
			price: 300000,
		},
	];

	return (
		<div className='font-sans bg-gray-50 min-h-screen'>
			{/* Header */}
			<header className='bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 p-6 text-white text-center shadow-lg rounded-b-full'>
				<h1 className='text-4xl font-extrabold tracking-tight leading-tight'>
					Ứng Dụng Bán Vé Tàu
				</h1>
				<p className='mt-2 text-lg font-medium opacity-90'>
					Chọn chuyến tàu yêu thích và đặt vé ngay!
				</p>
			</header>

			{/* Main content */}
			<div className='container mx-auto mt-6'>
				<div>
					<h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>
						Danh sách các chuyến tàu
					</h2>
					<ul className='space-y-6 flex flex-col w-2/3 m-auto'>
						{trains.map((train) => (
							<Link href={`/booking/${train.id}`} key={train.id}>
								<div
									key={train.id}
									className='p-4 border border-gray-300 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out hover:bg-gradient-to-r from-blue-100 via-indigo-200 to-purple-100 cursor-pointer transform hover:scale-95'>
									<strong className='text-2xl font-bold text-gray-900 mr-2'>{train.name}</strong>
									<span className='text-lg italic text-gray-600'>
										{train.departure} đến {train.arrival}
									</span>
									<div className='mt-4 text-sm text-gray-500'>
										Thời gian khởi hành: {train.departureTime} | Thời gian đến ước tính:{" "}
										{train.arrivalTime}
									</div>
									<div className='mt-3 font-semibold text-lg text-blue-700'>
										Giá: {train.price.toLocaleString()} VND
									</div>
								</div>
							</Link>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default App;
