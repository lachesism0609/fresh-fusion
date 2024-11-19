import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

export const ButtonBase = ({ 
    text,
    variant = "primary",
    onClick,
    className = "",
    animate = true
}) => {
    const variants = {
        primary: "bg-pink700 text-white all-[unset] box-border rounded-[10px]",
        secondary: "bg-white text-black border-2 border-pink700"
    };

    const animation = animate ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: {
            type: "spring",
            mass: 1,
            stiffness: 711.1,
            damping: 40
        },
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 }
    } : {};

    return (
        <motion.button
            className={`
                w-[143px] h-[46px]
                ${variants[variant]}
                ${className}
            `}
            onClick={onClick}
            {...animation}
        >
            <div className="relative w-[151px] h-[54px] -left-1">
                <div className="absolute w-[110px] top-[7px] left-5 font-jost font-normal text-xl text-center">
                    {text}
                </div>
            </div>
        </motion.button>
    );
};

ButtonBase.propTypes = {
    text: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(["primary", "secondary"]),
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    animate: PropTypes.bool
};