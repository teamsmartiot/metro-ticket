"use client";
import { addUser, loginUser } from "@/apis/user";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

// Đăng ký Component
interface FormRegisterProps {
	onRegisterSuccess: () => void;
}
const FormRegister = ({ onRegisterSuccess }: FormRegisterProps) => {
	const { mutate: registerUser, isPending } = useMutation({
		mutationFn: (user: any) => addUser(user),
		mutationKey: ["register-user"],
		onSuccess: () => {
			toast.success("Đăng ký thành công!");
			onRegisterSuccess();
		},
		onError: (error: any) => {
			toast.error("Đăng ký không thành công, thử lại!");
			console.error("Error: ", error);
		},
	});

	const onFinish = async (values: any) => {
		registerUser(values);
	};

	return (
		<Form name='register' onFinish={onFinish} layout='vertical' initialValues={{ remember: true }}>
			<Form.Item
				label='Họ và Tên'
				name='name'
				rules={[{ required: true, message: "Vui lòng nhập họ!" }]}>
				<Input className='!border-main !rounded-full !h-10 !w-full' />
			</Form.Item>

			<Form.Item
				label='Email'
				name='email'
				rules={[
					{ required: true, message: "Vui lòng nhập email!" },
					{ type: "email", message: "Email không hợp lệ!" },
				]}>
				<Input className='!border-main !rounded-full !h-10 !w-full' />
			</Form.Item>

			<Form.Item
				label='Số điện thoại'
				name='phone'
				rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}>
				<Input className='!border-main !rounded-full !h-10 !w-full' />
			</Form.Item>

			<Form.Item
				label='Mật khẩu'
				name='password'
				rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
				<Input.Password className='!border-main !rounded-full !h-10 !w-full' />
			</Form.Item>

			<Form.Item>
				<Button
					type='primary'
					loading={isPending}
					className='!bg-main !rounded-full !h-10 !w-full'
					htmlType='submit'
					block>
					Đăng ký
				</Button>
			</Form.Item>
		</Form>
	);
};

// Đăng nhập Component
const FormLogin = () => {
	const router = useRouter();
	const { mutate: loginUserMutation, isPending: isLoggingIn } = useMutation({
		mutationFn: (user: any) => loginUser(user),
		mutationKey: ["login-user"],
		onSuccess: () => {
			toast.success("Đăng nhập thành công!");
			router.push("/trains");
		},
		onError: (error: any) => {
			toast.error("Đăng nhập không thành công, thử lại!");
			console.error("Error: ", error);
		},
	});

	const onFinish = async (values: any) => {
		loginUserMutation(values);
	};

	return (
		<Form name='login' onFinish={onFinish} layout='vertical'>
			<Form.Item
				label='Email'
				name='email'
				rules={[
					{ required: true, message: "Vui lòng nhập email!" },
					{ type: "email", message: "Email không hợp lệ!" },
				]}>
				<Input className='!border-main !rounded-full !h-10 !w-full' />
			</Form.Item>

			<Form.Item
				label='Mật khẩu'
				name='password'
				rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
				<Input.Password className='!border-main !rounded-full !h-10 !w-full' />
			</Form.Item>

			<Form.Item>
				<Button
					type='primary'
					loading={isLoggingIn}
					className='!bg-main !rounded-full !h-10 !w-full mt-4'
					htmlType='submit'
					block>
					Đăng nhập
				</Button>
			</Form.Item>
		</Form>
	);
};

// Form chính để chuyển đổi giữa Đăng ký và Đăng nhập
const FormLoginAndRegister = () => {
	const [activeButton, setActiveButton] = useState<"login" | "register" | null>("login");

	const handleButtonClick = (button: "login" | "register") => {
		setActiveButton(button);
	};

	return (
		<div className='flex flex-col gap-4 bg-white p-8 rounded-lg'>
			<div className='flex gap-4 mt-5'>
				<Button
					className={`!border-main !rounded-full !h-12 !w-[200px] ${
						activeButton === "login" ? "!bg-main !text-white" : "!bg-white !text-black"
					}`}
					onClick={() => handleButtonClick("login")}>
					Đăng nhập
				</Button>
				<Button
					className={`!border-main !rounded-full !h-12 !w-[200px] ${
						activeButton === "register" ? "!bg-main !text-white" : "!bg-white !text-black"
					}`}
					onClick={() => handleButtonClick("register")}>
					Đăng ký
				</Button>
			</div>

			{/* Add Tailwind transition classes */}
			<div className='relative w-full mt-4'>
				{activeButton === "login" && <FormLogin />}
				{activeButton === "register" && (
					<FormRegister onRegisterSuccess={() => handleButtonClick("login")} />
				)}
			</div>
		</div>
	);
};

export default FormLoginAndRegister;
