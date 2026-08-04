import { useEffect, useState } from "react";

function AuctionCountdown({ endTime }) {

    const calculateTime = () => {

        const difference =
            new Date(endTime) - new Date();

        if (difference <= 0) {

            return "Auction Ended";

        }

        const days =
            Math.floor(difference / (1000 * 60 * 60 * 24));

        const hours =
            Math.floor(
                (difference % (1000 * 60 * 60 * 24))
                /
                (1000 * 60 * 60)
            );

        const minutes =
            Math.floor(
                (difference % (1000 * 60 * 60))
                /
                (1000 * 60)
            );

        const seconds =
            Math.floor(
                (difference % (1000 * 60))
                /
                1000
            );

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    const [timeLeft, setTimeLeft] =
        useState(calculateTime());

    useEffect(() => {

        const timer = setInterval(() => {

            setTimeLeft(calculateTime());

        }, 1000);

        return () => clearInterval(timer);

    }, [endTime]);

    return (

        <span className="badge bg-warning text-dark">

            {timeLeft}

        </span>

    );

}

export default AuctionCountdown;