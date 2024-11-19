import { useNavigate } from "react-router-dom";
import { ButtonBase } from "./ButtonBase";

export const NavigationButton = ({ to, ...props }) => {
    const navigate = useNavigate();
    return (
        <ButtonBase
            onClick={() => navigate(to)}
            {...props}
        />
    );
};

export default NavigationButton;