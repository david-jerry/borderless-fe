"use client";

export default function CustomButton({ color, children }: CustomButtonProps) {

    const performClick = () => {
        console.log("working")
    }
    return (
        <button
            onClick={performClick}
            className={`flex items-center gap-3 ${color === 'warning' ? 'bg-secondary text-primary' : 'bg-primary text-secondary'} py-2 px-4 rounded-lg`}
        >
            {children}
        </button>
    );
}
