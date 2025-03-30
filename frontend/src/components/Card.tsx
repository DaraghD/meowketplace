import styled from "styled-components";

interface CardProps {
    title: string;
    onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, onClick }) => {
    return (
        <StyledWrapper>
            <div className="card" onClick={onClick}>
                <p className="heading">{title}</p>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    .card {
        position: relative;
        width: 190px;
        height: 254px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 12px;
        border-radius: 8px;
        cursor: pointer;
        color: black;
        text-align: center;
    }

    .card::before {
        content: "";
        position: absolute;
        inset: 0;
        left: -5px;
        margin: auto;
        width: 200px;
        height: 264px;
        border-radius: 10px;
        background: linear-gradient(
            -45deg,
            #ffa500 0%,
            /* Orange */ #ffff00 100% /* Yellow */
        );
        z-index: -10;
        pointer-events: none;
        transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .card::after {
        content: "";
        z-index: -1;
        position: absolute;
        inset: 0;
        background: linear-gradient(
            -45deg,
            #ffa500 0%,
            /* Orange */ #ffff00 100% /* Yellow */
        );
        transform: translate3d(0, 0, 0) scale(0.95);
        filter: blur(20px);
    }

    .heading {
        font-size: 20px;
        text-transform: capitalize;
        font-weight: 700;
        margin: 0;
    }

    .card:hover::after {
        filter: blur(30px);
    }

    .card:hover::before {
        transform: rotate(-90deg) scaleX(1.34) scaleY(0.77);
    }
`;

export default Card;
