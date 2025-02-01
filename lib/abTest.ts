import { Variant } from "@/types";

export const getVariant = (): Variant => {
    return Math.random() < 0.5 ? "A" : "B";
};
