import { useContext } from "react";
import { BlocksContext } from "../context/BlockContext";

export const useBlocksContext = () => {
    const context = useContext(BlocksContext);

    if (!context) {
        throw Error(
            "useBlocksContext must me used inside a BlocksContextProvider"
        );
    }

    return context;
};
