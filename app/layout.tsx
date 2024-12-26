import type { Metadata } from "next";
import { Inter } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
import { AntdRegistry } from "@ant-design/nextjs-registry";

import "./globals.css";
import { Provider } from "@/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "IOT HÒN ĐÂT - KIÊN GIANG",
	description: "",
	icons: ["https://i.ibb.co/yPd0Rmm/cc43759b3c44861adf55-removebg-preview.png"],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<AntdRegistry>
					<Provider> {children}</Provider>
				</AntdRegistry>
			</body>
		</html>
	);
}
