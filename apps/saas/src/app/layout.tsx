import type { Metadata } from "next";
import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
	title: "SaaS",
	description: "My SaaS Template",
} as const satisfies Metadata;

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="ja">
			<body>{children}</body>
		</html>
	);
}
