"use server";

// Add User (Registration)
export const addUser = async (data: any) => {
	console.log("data", data);
	const res = await fetch(process.env.URL + "/api/user", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!res.ok) {
		throw new Error("Failed to add user");
	}

	const result = await res.json();
	return result;
};

// User Login
export const loginUser = async (data: any) => {
	const res = await fetch(process.env.URL + "/api/user/login", {
		// Assuming the login endpoint is '/login'
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!res.ok) {
		throw new Error("Failed to login");
	}

	const result = await res.json();
	return result;
};

// Get User List
export const getUser = async () => {
	const res = await fetch(process.env.URL + "/api/user", {
		method: "GET",
	});

	if (!res.ok) {
		throw new Error("Failed to fetch users");
	}

	const result = await res.json();
	return result;
};

// Delete User by ID
export const deleteUser = async (userId: string) => {
	const response = await fetch(process.env.URL + `/api/user/${userId}`, {
		method: "DELETE",
	});

	if (!response.ok) {
		throw new Error("Failed to delete user");
	}

	return response.json();
};

// Clear All Users
export const clearUser = async () => {
	const response = await fetch(process.env.URL + `/api/user/clear`, {
		method: "DELETE",
	});

	if (!response.ok) {
		throw new Error("Failed to delete all users");
	}

	return response.json();
};

// Add Ticket (Buy a Ticket)
export const addTicket = async (data: any) => {
	const res = await fetch(process.env.URL + "/api/ticket", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!res.ok) {
		throw new Error("Failed to add ticket");
	}

	const result = await res.json();
	return result;
};

// Create Order (Place an order for a ticket)
export const createOrder = async (userId: string, ticketId: string) => {
	const orderData = {
		userId: userId,
		ticketId: ticketId,
		orderDate: new Date(),
		status: "pending",
	};

	const res = await fetch(process.env.URL + "/api/order", {
		method: "POST",
		body: JSON.stringify(orderData),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!res.ok) {
		throw new Error("Failed to create order");
	}

	const result = await res.json();
	return result;
};

// Record History of Ticket Purchase
export const recordHistory = async (userId: string, ticketId: string) => {
	const historyData = {
		userId: userId,
		ticketId: ticketId,
		rentDate: new Date(),
		status: "purchased", // Trạng thái "purchased" khi đã mua vé
	};

	const res = await fetch(process.env.URL + "/api/history", {
		method: "POST",
		body: JSON.stringify(historyData),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!res.ok) {
		throw new Error("Failed to record history");
	}

	const result = await res.json();
	return result;
};

// Flow to Register User, Buy Ticket, and Record History
export const purchaseTicketFlow = async (userData: any, ticketData: any) => {
	try {
		// Add user
		const newUser = await addUser(userData);
		console.log("User created:", newUser);

		// Add ticket
		const newTicket = await addTicket(ticketData);
		console.log("Ticket created:", newTicket);

		// Create an order
		const order = await createOrder(newUser._id, newTicket._id);
		console.log("Order created:", order);

		// Record history of the purchase
		const history = await recordHistory(newUser._id, newTicket._id);
		console.log("History recorded:", history);

		return {
			user: newUser,
			ticket: newTicket,
			order,
			history,
		};
	} catch (error) {
		console.error("Error in ticket purchase flow:", error);
		throw new Error("Ticket purchase flow failed");
	}
};
