import { buildSetOperationsModel } from "../shared/set-plugin-base.mjs";

export const plugin = {
  build({ params }) {
    return buildSetOperationsModel(params);
  },
};
