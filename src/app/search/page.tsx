'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function SearchContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get('q') || '';

    useEffect(() => {
        // Redirect to blogs page with search query
        if (query) {
            router.replace(`/blogs?search=${encodeURIComponent(query)}`);
        } else {
            router.replace('/blogs');
        }
    }, [query, router]);

    return (
        <div className="w-full flex flex-col items-center min-h-screen justify-center">
            <p className="text-green-400">Redirecting to search results...</p>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="w-full flex flex-col items-center min-h-screen justify-center">
                <p className="text-green-400">Loading...</p>
            </div>
        }>
            <SearchContent />
        </Suspense>
    );
}

