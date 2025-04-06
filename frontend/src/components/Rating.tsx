import styled from "styled-components";

interface RatingProps {
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Rating = ({ onChange, value }: RatingProps) => {
    return (
        <StyledWrapper>
            <div className="rating">
                <input
                    type="radio"
                    id="star5"
                    name="rate"
                    value={5}
                    checked={value === "5"}
                    onChange={onChange}
                />
                <label title="Excellent!" htmlFor="star5">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 576 512"
                    >
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                    </svg>
                </label>
                <input
                    type="radio"
                    name="rate"
                    id="star4"
                    value={4}
                    checked={value === "4"}
                    onChange={onChange}
                />
                <label title="Great!" htmlFor="star4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 576 512"
                    >
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                    </svg>
                </label>
                <input
                    type="radio"
                    name="rate"
                    id="star3"
                    value={3}
                    checked={value === "3"}
                    onChange={onChange}
                />
                <label title="Good" htmlFor="star3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 576 512"
                    >
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                    </svg>
                </label>
                <input
                    type="radio"
                    name="rate"
                    id="star2"
                    value={2}
                    checked={value === "2"}
                    onChange={onChange}
                />
                <label title="Okay" htmlFor="star2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 576 512"
                    >
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                    </svg>
                </label>
                <input
                    type="radio"
                    name="rate"
                    id="star1"
                    value={1}
                    checked={value === "1"}
                    onChange={onChange}
                />
                <label title="Bad" htmlFor="star1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 576 512"
                    >
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                    </svg>
                </label>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    padding-top: 8px;

    .rating > label {
        margin-right: 4px;
    }

    .rating:not(:checked) > input {
        display: none;
    }

    .rating:not(:checked) > label {
        float: right;
        cursor: pointer;
        font-size: 20px;
    }

    .rating:not(:checked) > label > svg {
        fill: #666;
        transition: fill 0.3s ease;
    }

    /* All selected stars - using brighter yellow (#ffcc00) */
    .rating > input:checked ~ label > svg,
    .rating > input:checked + label > svg {
        fill: #ffcc00;
    }

    /* All hover states */
    .rating:not(:checked) > label:hover > svg,
    .rating:not(:checked) > label:hover ~ label > svg {
        fill: #ffcc00;
    }
`;

export default Rating;
