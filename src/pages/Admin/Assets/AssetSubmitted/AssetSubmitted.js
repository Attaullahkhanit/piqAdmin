import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.scss";

function AssetSubmitted() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            // Redirect to the new page after 5 seconds
            navigate('/profile/dashboard/' + location.state.businessId);
        }, 5000); // 5000 milliseconds = 5 seconds

        return () => {
            // Clear the timer if the component unmounts
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="gif-container">
            <img src={"/checkmark-animated.gif"} alt="loading..." />
            <div className="text-style">Submitted for Review!</div>
        </div>
    );
}

export default AssetSubmitted;