"use client";
import dynamic from "next/dynamic";

const PortfolioShell = dynamic(() => import("@/components/PortfolioShell"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-[#03050a]" />,
});

export default function Home() {
  return <PortfolioShell />;
}
