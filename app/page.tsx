'use client';

import { useEffect, useState } from 'react';
import Loader from './components/Loader/Loader';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!isLoaded) return;
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/users');
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || 'Failed to fetch users');
        if (mounted) setUsers((data.users || []).map((u: any) => u.username));
      } catch (e) {
        console.error('Failed to fetch users', e);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [isLoaded]);

  return (
    <>
      {!isLoaded && (
        <Loader
          duration={1000}
          titleMain="Osaka"
          titleAccent="Masjid"
          subtitle="YOUR SPIRITUAL HOME IN THE CITY"
          onLoaded={() => setIsLoaded(true)}
        />
      )}

      {isLoaded && (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black animate-in fade-in duration-1000">
          <div>Sample User Details</div>
          <div className="mt-4">
            <strong>Users:</strong> {users.length ? users.join(', ') : 'Loading...'}
          </div>
        </div>
      )}
    </>
  );
}
