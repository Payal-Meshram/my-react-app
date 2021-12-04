export const INC = 'INCREMENT';
export const DEC = 'DECREMENT';


export const increment = (data) => {
    return {
        type: INC,
        data
    };
};

export const decrement = (data) => {
    return {
        type: DEC,
        data
    };
};