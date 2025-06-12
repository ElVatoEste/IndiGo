import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "Cross-Origin-Opener-Policy",
                        value: "restrict-properties",
                    },
                    // Si en algún momento necesitas aislamiento completo:
                    // {
                    //   key: "Cross-Origin-Embedder-Policy",
                    //   value: "require-corp",
                    // },
                ],
            },
        ];
    },
};

export default nextConfig;
