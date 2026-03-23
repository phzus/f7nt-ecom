// 404 Page
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center py-32"
      style={{ backgroundColor: "#000", minHeight: "60vh" }}
    >
      <h1
        className="text-8xl font-black mb-4"
        style={{ color: "#ff0000" }}
      >
        404
      </h1>
      <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">
        Page Not Found
      </h2>
      <p className="text-base mb-8" style={{ color: "rgba(255,255,255,0.75)" }}>
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="btn-cta px-10 py-4 text-base font-bold"
        style={{ borderRadius: "4px" }}
      >
        Go Home
      </Link>
    </div>
  );
}
