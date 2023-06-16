import { forwardRef } from "react";
import { twMerge } from 'tailwind-merge';


interface AddButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {

    }

const AddButton = forwardRef<HTMLButtonElement, AddButtonProps>(({
    className,
    children,
    disabled,
    type = 'button',
    ...props
}, ref) => {
    return(
        <button
            type={type}
            className={twMerge(`rounded-full bg-white border border-transparent p-2 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition`, className)}
            disabled={disabled}
            ref={ref}
            {...props}
        >
            {children}
        </button>
    )
})

AddButton.displayName = 'AddButton';

export default AddButton;