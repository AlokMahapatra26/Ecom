import { ADMIN_CATEGORY_ADD, ADMIN_COUPON_ADD, ADMIN_MEDIA_SHOW, ADMIN_PRODUCT_ADD } from '@/routes/AdminPanleRoute';
import Link from 'next/link';
import React from 'react';
import { BiCategory, BiPlus } from 'react-icons/bi';
import { IoShirtOutline } from 'react-icons/io5';
import { MdOutlinePermMedia } from 'react-icons/md';
import { RiCoupon2Line } from 'react-icons/ri';

// Define a type for the props for type safety and clarity
type QuickLinkProps = {
  href: string;
  title: string;
  icon: React.ElementType;
};


const QuickLink: React.FC<QuickLinkProps> = ({ href, title, icon: Icon }) => {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed bg-card p-6 text-muted-foreground transition-all duration-200 ease-in-out hover:border-[#009a8a] hover:text-primary"
    >
      <Icon className="h-8 w-8 transition-transform group-hover:scale-110" />
      <span className="text-sm font-semibold">{title}</span>
    </Link>
  );
};

/**
 * A section for providing quick access to common "add" actions.
 */
const QuickAdd = () => {
  // Define actions in an array to easily map over them, keeping the return statement clean.
  const quickActions = [
    {
      href: ADMIN_PRODUCT_ADD,
      title: "Add Product",
      icon: IoShirtOutline,
    },
    {
      href: ADMIN_CATEGORY_ADD,
      title: "Add Category",
      icon: BiCategory,
    },
    {
      href: ADMIN_COUPON_ADD,
      title: "Add Coupon",
      icon: RiCoupon2Line,
    },
    {
      href: ADMIN_MEDIA_SHOW,
      title: "Upload Media",
      icon: MdOutlinePermMedia,
    },
  ];

  return (
    <div className="mt-10">
      <h3 className="mb-4 text-lg font-semibold tracking-tight">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {quickActions.map((action) => (
          <QuickLink
            key={action.title}
            href={action.href}
            title={action.title}
            icon={action.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default QuickAdd;