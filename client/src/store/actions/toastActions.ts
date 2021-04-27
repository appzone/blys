import { HIDE_TOAST, SHOW_TOAST } from "../actionTypes";

export const showToast = (text: string, variant: string) => ({
  type: SHOW_TOAST,
  payload: { text, variant },
});

export const hideToast = () => ({
  type: HIDE_TOAST,
});
