"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
];

/** Magnetic hover wrapper (subtle) */
function Magnetic({ children, strength = 10, className = "" }) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let raf = 0;

        const onMove = (e) => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - (rect.left + rect.width / 2);
                const y = e.clientY - (rect.top + rect.height / 2);
                const dx = (x / rect.width) * strength;
                const dy = (y / rect.height) * strength;
                el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
            });
        };

        const onLeave = () => {
            cancelAnimationFrame(raf);
            el.style.transform = "translate3d(0,0,0)";
        };

        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);

        return () => {
            cancelAnimationFrame(raf);
            el.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseleave", onLeave);
        };
    }, [strength]);

    return (
        <div ref={ref} className={`transition-transform duration-200 ease-out ${className}`}>
            {children}
        </div>
    );
}

export default function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // close on route change
    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    // scroll shrink + elevate
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 14);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const activeIndex = useMemo(() => {
        const i = NAV_ITEMS.findIndex((it) =>
            it.href === "/" ? pathname === "/" : pathname?.startsWith(it.href)
        );
        return i >= 0 ? i : 0;
    }, [pathname]);

    return (
        <header className="fixed inset-x-0 top-0 z-50">
            {/* Ambient glow behind navbar */}
            <div className="pointer-events-none absolute left-1/2 top-2 -translate-x-1/2">
                <div className="h-12 w-130 rounded-full bg-linear-to-r from-blue-500 via-black/10 to-cyan-400 blur-2xl" />
            </div>

            <div className={`mx-auto w-full ${scrolled ? "pt-3" : "pt-5"} transition-all duration-300`}>
                <nav className="mx-auto w-[92%] max-w-6xl">
                    {/* Glass pill */}
                    <div
                        className={[
                            "relative rounded-full",
                            "bg-white/8 backdrop-blur-2xl",
                            "border border-white/12",
                            "shadow-[0_10px_50px_-20px_rgba(0,0,0,0.65)]",
                            scrolled ? "py-2.5" : "py-3.5",
                            "transition-all duration-300 ease-out",
                        ].join(" ")}
                    >
                        {/* Premium gradient border overlay */}
                        <div className="pointer-events-none absolute inset-0 rounded-full p-px">
                            <div className="absolute inset-0 rounded-full bg-linear-to-r from-white/15 via-blue-400/20 to-cyan-300/15 opacity-100" />
                            <div className="absolute inset-px rounded-full bg-linear-to-b from-white/8 to-black/20" />
                        </div>

                        <div className={`relative flex items-center justify-between ${scrolled ? "px-5" : "px-6"} transition-all`}>
                            {/* Left: Logo */}
                            <Link href="/" className="group flex items-center gap-2">
                                <span className="relative grid h-9 w-9 place-items-center rounded-full bg-white/10 border border-white/15">
                                    <span className="absolute inset-0 rounded-full bg-linear-to-br from-blue-400/25 to-cyan-300/15 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                                    <span className="relative text-white font-bold">C</span>
                                </span>
                                <span className="text-white font-semibold tracking-tight text-lg">
                                    Care<span className="text-[#2e9e93]">Nest</span>
                                </span>
                            </Link>

                            {/* Center: Desktop nav */}
                            <div className="hidden lg:block">
                                <div className="relative">
                                    {/* Active pill indicator */}
                                    <div
                                        className="absolute top-1/2 -translate-y-1/2 h-10 rounded-full bg-white/10 border border-white/10 shadow-inner transition-all duration-300"
                                        style={{
                                            left: `${activeIndex * 112}px`,
                                            width: "104px",
                                        }}
                                    />
                                    <ul className="relative flex items-center gap-2">
                                        {NAV_ITEMS.map((item) => {
                                            const isActive =
                                                item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);

                                            return (
                                                <li key={item.href} className="w-28">
                                                    <Magnetic strength={10}>
                                                        <Link
                                                            href={item.href}
                                                            className={[
                                                                "relative flex h-10 items-center justify-center rounded-full",
                                                                "text-sm font-medium",
                                                                "transition-all duration-200",
                                                                isActive ? "text-white" : "text-white/80 hover:text-white",
                                                            ].join(" ")}
                                                        >
                                                            {/* subtle shimmer */}
                                                            <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 bg-linear-to-r from-transparent via-white/10 to-transparent" />
                                                            <span className="relative">{item.label}</span>
                                                        </Link>
                                                    </Magnetic>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>

                            {/* Right: Actions */}
                            <div className="flex items-center gap-2">
                                <Magnetic strength={12} className="hidden lg:block">
                                    <button
                                        className={[
                                            "group relative overflow-hidden rounded-full px-4 py-2",
                                            "border border-white/15 bg-white/10",
                                            "text-white text-sm font-medium",
                                            "hover:bg-white/12 active:scale-[0.98] transition",
                                        ].join(" ")}
                                    >
                                        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-r from-blue-400/15 via-white/10 to-cyan-300/15" />
                                        <span className="relative inline-flex items-center gap-2">
                                            <LogOut size={16} className="opacity-80" />
                                            Logout
                                        </span>
                                    </button>
                                </Magnetic>

                                {/* Mobile menu button */}
                                <button
                                    onClick={() => setOpen((v) => !v)}
                                    className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/12 transition"
                                    aria-label="Toggle menu"
                                >
                                    {open ? <X size={20} /> : <Menu size={20} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile dropdown */}
                    <div
                        className={[
                            "lg:hidden overflow-hidden transition-all duration-300 ease-out",
                            open ? "mt-3 max-h-130 opacity-100" : "mt-0 max-h-0 opacity-0",
                        ].join(" ")}
                    >
                        <div className="relative rounded-3xl bg-white/8 backdrop-blur-2xl border border-white/12 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.75)] p-3">
                            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-b from-white/10 to-black/15" />

                            <div className="relative flex flex-col gap-1 p-2">
                                {NAV_ITEMS.map((item) => {
                                    const isActive =
                                        item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={[
                                                "flex items-center justify-between rounded-2xl px-4 py-3",
                                                "border border-transparent",
                                                "transition",
                                                isActive
                                                    ? "bg-white/12 border-white/10 text-white"
                                                    : "text-white/85 hover:text-white hover:bg-white/10",
                                            ].join(" ")}
                                        >
                                            <span className="font-medium">{item.label}</span>
                                            <span className="text-white/40">›</span>
                                        </Link>
                                    );
                                })}

                                <button className="mt-2 rounded-2xl px-4 py-3 border border-white/15 bg-white/10 text-white font-medium hover:bg-white/12 transition inline-flex items-center justify-center gap-2">
                                    <LogOut size={16} className="opacity-80" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            {/* Spacer so content doesn't hide under fixed header */}
            <div className="h-24" />
        </header>
    );
}