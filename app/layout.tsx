import type { Metadata } from "next";
import { Inter } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
import { AntdRegistry } from "@ant-design/nextjs-registry";

import "./globals.css";
import { Provider } from "@/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "METRO TICKET",
	description: "",
	icons: [
		"https://upload.wikimedia.org/wikipedia/commons/b/b9/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_H%E1%BB%8Dc_S%C6%B0_Ph%E1%BA%A1m_K%E1%BB%B9_Thu%E1%BA%ADt_TP_H%E1%BB%93_Ch%C3%AD_Minh.png",
	],
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
