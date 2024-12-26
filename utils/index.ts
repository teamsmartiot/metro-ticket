// Định nghĩa kiểu dữ liệu cho địa điểm
interface Location {
	name: string;
	lat: number;
	lon: number;
}

// Hàm tính khoảng cách giữa 2 địa điểm
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
	const toRadians = (degree: number): number => degree * (Math.PI / 180);
	const R = 6371; // Bán kính trái đất (km)

	const lat1Rad = toRadians(lat1);
	const lon1Rad = toRadians(lon1);
	const lat2Rad = toRadians(lat2);
	const lon2Rad = toRadians(lon2);

	const dLat = lat2Rad - lat1Rad;
	const dLon = lon2Rad - lon1Rad;

	const a =
		Math.sin(dLat / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	const distance = R * c;
	return distance; // Khoảng cách tính bằng km
}

// Danh sách các địa điểm trong TP.HCM với kiểu dữ liệu Location
export const locations: Location[] = [
	{ name: "Chợ Bến Thành", lat: 10.762622, lon: 106.695009 },
	{ name: "Nhà thờ Đức Bà", lat: 10.776889, lon: 106.695887 },
	{ name: "Tòa nhà Bitexco", lat: 10.770828, lon: 106.700885 },
	{ name: "Chợ Tân Định", lat: 10.776514, lon: 106.690983 },
	{ name: "Công viên Tao Đàn", lat: 10.762267, lon: 106.686117 },
];
