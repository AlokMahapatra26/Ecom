

"use client"

import useFetch from '@/hooks/useFetch';
// Make sure your route imports are correct
import { ADMIN_CATEGORY_SHOW, ADMIN_COUSTOMERS_SHOW, ADMIN_PRODUCT_SHOW } from '@/routes/AdminPanleRoute';
import Link from 'next/link';
import React from 'react';
import { BiCategory } from 'react-icons/bi';
import { IoShirtOutline } from 'react-icons/io5';
import { LuUserRound } from 'react-icons/lu';
import { MdOutlineShoppingBag } from 'react-icons/md';

// Type definition for the reusable card props
type StatCardProps = {
  title: string;
  count: number;
  icon: React.ElementType;
  href: string;
  // Props for unique styling
  iconBgClass: string;
  iconColorClass: string;
};

/**
 * A reusable stat card with a unique split design.
 */
const StatCard: React.FC<StatCardProps> = ({ title, count, href, icon: Icon, iconBgClass, iconColorClass }) => {
  return (
    <Link href={href} className="group" passHref>
      <div className="flex h-full overflow-hidden rounded-lg border bg-card shadow-sm transition-all duration-300 ease-in-out group-hover:-translate-y-1 group-hover:shadow-lg group-hover:border-primary/50">
        {/* Left Side: Icon Panel */}
        <div className={`flex w-20 items-center justify-center ${iconBgClass}`}>
          <Icon className={`h-8 w-8 ${iconColorClass}`} />
        </div>
        {/* Right Side: Content Panel */}
        <div className="flex flex-col justify-center p-4">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="mt-1 text-2xl font-bold">{count}</p>
        </div>
      </div>
    </Link>
  );
};


/**
 * The main component to display an overview of key counts.
 */
const CountOverview = () => {
    const { data: countData } = useFetch('/api/dashboard/admin/count');

    // Define card data in an array for easy mapping.
    // We include specific classes for styling each card uniquely.
    const stats = [
        {
            title: "Total Categories",
            count: countData?.data?.category || 0,
            icon: BiCategory,
            href: ADMIN_CATEGORY_SHOW,
            iconBgClass: "bg-sky-500/10",
            iconColorClass: "text-sky-500",
        },
        {
            title: "Total Products",
            count: countData?.data?.product || 0,
            icon: IoShirtOutline,
            href: ADMIN_PRODUCT_SHOW,
            iconBgClass: "bg-emerald-500/10",
            iconColorClass: "text-emerald-500",
        },
        {
            title: "Total Customers",
            count: countData?.data?.customer || 0,
            icon: LuUserRound,
            href: ADMIN_COUSTOMERS_SHOW,
            iconBgClass: "bg-amber-500/10",
            iconColorClass: "text-amber-500",
        },
        {
            title: "Total Orders",
            count: countData?.data?.order || 0,
            icon: MdOutlineShoppingBag,
            href: "",
            iconBgClass: "bg-rose-500/10",
            iconColorClass: "text-rose-500",
        },
    ];

    // if (isLoading) {
    //     // Loading skeleton matching the new design
    //     return (
    //         <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
    //             {[...Array(4)].map((_, i) => (
    //                 <div key={i} className="flex h-24 overflow-hidden rounded-lg border bg-card shadow-sm animate-pulse">
    //                     <div className="w-20 bg-muted"></div>
    //                     <div className="flex flex-col justify-center p-4 space-y-2">
    //                         <div className="h-4 w-24 rounded bg-muted"></div>
    //                         <div className="h-8 w-12 rounded bg-muted"></div>
    //                     </div>
    //                 </div>
    //             ))}
    //         </div>
    //     );
    // }

    return (
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {stats.map((stat) => (
                <StatCard key={stat.title} {...stat} />
            ))}
        </div>
    );
};

export default CountOverview;