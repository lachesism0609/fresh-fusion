import { ButtonBase } from "./ButtonBase";

export const ScrollButton = ({ targetId, ...props }) => {
    const handleScroll = () => {
        document.getElementById(targetId)?.scrollIntoView({ 
            behavior: 'smooth'
        });
    };

    return (
        <ButtonBase 
            className="w-[103px] h-9"
            onClick={handleScroll}
            animate={false}
            {...props}
        />
    );
};