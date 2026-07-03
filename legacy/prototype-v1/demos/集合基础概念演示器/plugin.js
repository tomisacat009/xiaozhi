import { buildSetBasicsModel } from "../shared/set-plugin-base.mjs";

export const plugin = {
  build({ params }) {
    return buildSetBasicsModel(params);
  },
};
