"use client";
import { IconDelete } from "@douyinfe/semi-icons";
import { Table, Button } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

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
	const router = useRouter();
	const train: Train = {
		id: 1,
		name: "Train A",
		departure: "Hà Nội",
		arrival: "TP. Hồ Chí Minh",
		departureTime: "2024-12-31 08:00",
		arrivalTime: "2024-12-31 20:00",
		price: 500000,
	};

	const [passengerName, setPassengerName] = useState(""); // Lưu tên hành khách
	const [passengers, setPassengers] = useState<{ name: string }[]>([]); // Danh sách tên hành khách
	const [ticket, setTicket] = useState<any | null>(null); // Vé đã đặt

	const handleAddPassenger = () => {
		if (passengerName) {
			setPassengers([...passengers, { name: passengerName }]); // Thêm hành khách vào danh sách
			setPassengerName(""); // Reset tên hành khách sau khi thêm
		}
	};

	const handleBookTicket = () => {
		const totalPrice = train.price * passengers.length; // Tính tổng giá vé theo số hành khách
		const newTicket = {
			trainId: train.id,
			passengers,
			totalPrice,
		};
		setTicket(newTicket); // Lưu vé
	};

	const handleBank = () => {
		toast.success("Thanh toán thành công!");
		router.push("/trains");
	};

	const handleRemovePassenger = (name: string) => {
		setPassengers(passengers.filter((passenger) => passenger.name !== name)); // Xóa hành khách khỏi danh sách
	};

	const columns = [
		{
			title: "Tên hành khách",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Hành động",
			key: "action",
			render: (_: any, record: { name: string }) => (
				<Button
					type='link'
					className='!bg-red-500 !text-white hover:!bg-red-600'
					onClick={() => handleRemovePassenger(record.name)} // Xử lý xóa hành khách
				>
					<IconDelete />
				</Button>
			),
		},
	];

	return (
		<div className='font-sans bg-gray-50 min-h-screen'>
			{/* Header */}
			<header className='bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 p-8 text-white text-center shadow-xl rounded-b-full'>
				<h1 className='text-5xl font-extrabold tracking-tight leading-tight'>Đặt vé tàu</h1>
				<p className='mt-4 text-lg font-medium opacity-90'>
					Chọn chuyến tàu yêu thích và đặt vé ngay!
				</p>
			</header>

			{/* Main content */}
			<div className='mx-10 mt-10 flex gap-12'>
				<div className='flex flex-[2] bg-white rounded-xl shadow-lg p-6 gap-2'>
					<div className='flex-1 flex flex-col h-full justify-between '>
						<div className='flex-1'>
							<h2 className='text-xl font-semibold mb-2'>Đặt vé cho chuyến tàu: {train.name}</h2>
							<p className='text-sm py-2'>
								Departure: {train.departureTime} | Arrival: {train.arrivalTime}
							</p>

							{/* Booking Form */}
							<div className='space-y-4'>
								<label className='block text-sm font-semibold'>
									Tên hành khách:
									<input
										type='text'
										value={passengerName}
										onChange={(e) => setPassengerName(e.target.value)}
										className='w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
										placeholder='Nhập tên hành khách'
									/>
								</label>
							</div>
						</div>
						<button
							onClick={handleAddPassenger}
							className='w-full py-2 text-sm font-semibold  bg-main text-white rounded-md hover:bg-green-700 transition-all duration-200'>
							Thêm hành khách
						</button>
					</div>
					<div className='flex-1 flex flex-col'>
						<h2 className='text-xl font-semibold mb-6'>Danh sách vé</h2>
						<Table
							columns={columns}
							dataSource={passengers}
							pagination={false}
							bordered
							size='middle'
							className='flex-1'
							rowKey='name'
						/>
						<button
							onClick={handleBookTicket}
							className='w-full py-2 text-sm font-semibold  mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200'>
							Đặt vé
						</button>
					</div>
				</div>
				<div className='flex-1 bg-white p-6 rounded-xl shadow-lg'>
					<h2 className='text-3xl font-semibold mb-6'>Thông tin vé</h2>
					{/* Ticket Information */}
					{ticket && (
						<div className='space-y-4'>
							<div className='p-4 border border-gray-300 rounded-lg shadow-md bg-gray-50'>
								<h3 className='text-lg font-semibold mb-2'>Tên khách hàng</h3>
								{ticket.passengers.map((passenger: any, index: number) => (
									<p key={index} className='text-sm text-gray-800 font-semibold'>
										{passenger.name}
									</p>
								))}
								<p className='text-sm'>Trạm đi: {ticket.trainId}</p>
								<p className='text-sm'>Trạm đến: {ticket.trainId}</p>
								<p className='text-sm'>Số vé: {ticket.passengers.length}</p>

								<p className='text-sm'>
									Tổng giá vé:{" "}
									<span className='font-bold text-sm text-blue-600'>
										{ticket.totalPrice.toLocaleString()} VND
									</span>
								</p>
							</div>
							<button
								onClick={handleBank}
								className='w-full py-2 text-sm font-semibold  mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200'>
								Thanh toán
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default App;
