import { createContext, useReducer } from "react";
import { BlockConstants } from "../constants/BlockConstants";
import dayjs from "dayjs";

export const BlocksContext = createContext();

export const blocks_reducer = (state, action) => {
    switch (action.type) {
        case BlockConstants.SET_BLOCKS:
            const blocks = action.payload.blocks;
            blocks.forEach((block) => {
                const idx = state.time_slots.findIndex(
                    (e) => block.timestamp === e.date
                );
                state.time_slots[idx] = {
                    ...state.time_slots[idx],
                    title: block.title,
                };
            });
            return { ...state };
        case BlockConstants.SEED_BLOCKS:
            return { time_slots: [...action.payload] };
        case BlockConstants.UPDATE_BLOCK:
            return { time_slots: [...action.payload] };
        case BlockConstants.LIGHT_UP:
            const time_slots = state.time_slots.map((u) => {
                if (
                    dayjs(u.date).utc().date() ===
                        dayjs(action.payload.date).utc().date() ||
                    dayjs(u.date).utc().hour() ===
                        dayjs(action.payload.date).utc().hour()
                ) {
                    return { ...u, lit: true };
                } else {
                    return { ...u, lit: false };
                }
            });
            return { time_slots: [...time_slots] };

        case BlockConstants.LIGHTS_OFF:
            return {
                time_slots: [
                    ...state.time_slots.map((e) => {
                        return { ...e, lit: false };
                    }),
                ],
            };

        default:
            throw new Error(`Unhandled type ${action.type} in blocks_reducer`);
    }
};

export const BlocksContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(blocks_reducer, {
        time_slots: [],
    });
    return (
        <BlocksContext.Provider value={{ ...state, dispatch }}>
            {children}
        </BlocksContext.Provider>
    );
};
