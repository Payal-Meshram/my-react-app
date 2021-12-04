import { INC, DEC } from '../actions/counter';

const UPDATE_NAME = 'UPDATE_NAME';

const initial = {
    name: 'Ritesh',
    email: '',
    counter: 0
};

const Test = (state = initial, actions) => {

    switch (actions.type) {
        case UPDATE_NAME:
            return {
                ...state, name: actions.data
            }
        case INC:
            return {
                ...state, counter: actions.data
            }
        case DEC:
            return {
                ...state, counter: actions.data
            }
        default: return state;
    }
};
export default Test;