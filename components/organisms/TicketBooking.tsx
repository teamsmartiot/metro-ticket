// src/components/TicketBooking.tsx

import React, { useState } from "react";
interface TicketBookingProps {
	selectedTrain: any;
}

export const TicketBooking: React.FC<TicketBookingProps> = ({ selectedTrain }) => {
	const [passengerName, setPassengerName] = useState("");
	const [quantity, setQuantity] = useState(1);
	const [ticket, setTicket] = useState<any | null>(null);

	const handleBookTicket = () => {
		const totalPrice = selectedTrain.price * quantity;
		const newTicket: any = {
			trainId: selectedTrain.id,
			passengerName,
			quantity,
			totalPrice,
		};
		setTicket(newTicket);
	};

	return (
		<div className='container mx-auto p-6'>
			<h2 className='text-2xl font-semibold mb-4'>Đặt vé cho chuyến tàu: {selectedTrain.name}</h2>
			<p className='mb-4'>
				Departure: {selectedTrain.departureTime} | Arrival: {selectedTrain.arrivalTime}
			</p>

			<label className='block mb-2 text-lg'>
				Tên hành khách:
				<input
					type='text'
					value={passengerName}
					onChange={(e) => setPassengerName(e.target.value)}
					className='w-full p-2 border border-gray-300 rounded-md mt-2'
				/>
			</label>

			<label className='block mb-2 text-lg'>
				Số lượng vé:
				<input
					type='number'
					value={quantity}
					onChange={(e) => setQuantity(Number(e.target.value))}
					min='1'
					className='w-full p-2 border border-gray-300 rounded-md mt-2'
				/>
			</label>

			<button
				onClick={handleBookTicket}
				className='w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700'>
				Đặt vé
			</button>

			{ticket && (
				<div className='mt-4 p-4 border rounded-lg shadow-lg'>
					<h3 className='text-xl font-semibold'>Thông tin vé</h3>
					<p>Tên hành khách: {ticket.passengerName}</p>
					<p>Số lượng vé: {ticket.quantity}</p>
					<p>Tổng giá: {ticket.totalPrice.toLocaleString()} VND</p>
				</div>
			)}
		</div>
	);
};
