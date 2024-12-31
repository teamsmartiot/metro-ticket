// src/components/TrainList.tsx

import React from "react";

interface TrainListProps {
	trains: any[];
	onSelectTrain: (train: any) => void;
}

export const TrainList: React.FC<TrainListProps> = ({ trains, onSelectTrain }) => {
	return (
		<div className='container mx-auto p-4'>
			<h2 className='text-2xl font-semibold mb-4'>Danh sách các chuyến tàu</h2>
			<ul className='space-y-4'>
				{trains.map((train) => (
					<li
						key={train.id}
						className='p-4 border rounded-lg shadow-lg hover:bg-gray-100 cursor-pointer'
						onClick={() => onSelectTrain(train)}>
						<strong className='text-xl'>{train.name}</strong> -{" "}
						<span className='italic'>{train.departure}</span> to{" "}
						<span className='italic'>{train.arrival}</span>
						<div className='mt-2 text-sm'>
							Departure: {train.departureTime} | Arrival: {train.arrivalTime}
						</div>
						<div className='mt-1 font-semibold text-lg'>
							Price: {train.price.toLocaleString()} VND
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};
