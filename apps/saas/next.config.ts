import type { NextConfig } from "next";

const nextConfig = {
	cacheComponents: true,
	reactCompiler: true,
} as const satisfies NextConfig;

export default nextConfig;
