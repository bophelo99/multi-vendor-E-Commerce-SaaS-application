'use client';

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import React, { useState } from 'react';

/*
  // ======================================================
//  REACT QUERY PROVIDER-
// ======================================================
//
// WHAT THIS DOES:
// 1. Creates a "global data manager" for your entire app
// 2. Makes React Query features available to all child components
// 3. Manages API data caching, loading states, and automatic refetching
//
// REAL-LIFE ANALOGY:
// Think of this as hiring a HEAD CHEF (QueryClient) once and making
// his instructions available to ALL WAITERS (your components).
// The customers ({children}) receive efficient service!
//
// HOW TO USE:
// 1. Wrap your entire app with this in app/layout.tsx:
//    <Providers><YourAppHere/></Providers>
//
// 2. Then in any component, you can use React Query hooks like:
//    const { data, isLoading } = useQuery({...})
//
// IMPORTANT NOTES:
// - 'use client' = runs in browser only (React Query needs browser APIs)
// - useState(() => new QueryClient()) = creates QueryClient ONCE and remembers it
//   (Without useState, new QueryClient would be created on every render = BAD!)
// - {children} MUST be rendered inside QueryClientProvider or nothing will show!
//
// 🎁 BENEFITS YOU GET:
// ✅ Automatic data caching (no duplicate API calls)
// ✅ Background data refreshing
// ✅ Built-in loading & error states
// ✅ No more useEffect for data fetching!
// ======================================================
*/
const Providers = ({children}:{children:React.ReactNode}) => {
    const [queryClient] =  useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
    </QueryClientProvider>
  );
};

export default Providers;