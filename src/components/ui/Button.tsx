"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CustomButton() {
    const router = useRouter();

    return (
        <Link href='/' className="mx-auto px-6 py-2 rounded-lg hover:scale-105 duration-300 ease-linear bg-secondary text-primary flex items-center space-x-3 group">
            <Icon className="flex-none w-6 h-6 group-hover:mr-2 duration-300 ease-linear" icon="mingcute:delete-back-fill" width="1.2em" height="1.2em" />
            <span className="flex">Home</span>
        </Link>
    );
}
