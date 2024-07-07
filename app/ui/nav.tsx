import Link from 'next/link';

export default function Nav() {
    return (
        <div className="flex h-full flex-col px-3 py-2 md:px-2">
            <Link
                className="mb-2 flex h-20 items-end justify-start rounded-md bg-gray-200 p-4"
                href="/"
            >
                <div className="w-50 text-gray-800 md:w-60 text-[30px]">
                    ACADEMIC NOTE
                </div>
            </Link>
        </div>
    );
}