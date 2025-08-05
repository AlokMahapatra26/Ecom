import React from 'react'
import { Button } from '@/components/ui/button'
import { Loader2Icon } from 'lucide-react'
import { cn } from '@/lib/utils';

interface ButtonLoadingProps {
  type?: "button" | "submit" | "reset";
  text: string;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className: string
}

const ButtonLoading: React.FC<ButtonLoadingProps> = ({ type = "button", text, loading = false, onClick , className ,...props }) => {
  return (
    <Button 
        type={type} 
        disabled={loading} 
        onClick={onClick}
        className={cn("", className)}
        {...props}>
      {loading && <Loader2Icon className="animate-spin" />}
      {text}
    </Button>
  );
};

export default ButtonLoading;
