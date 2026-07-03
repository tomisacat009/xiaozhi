import type {
  DemoDefinition,
  DemoParams,
  DemoState,
  DemoStore,
} from "@/engine/core/types";

function cloneParams<TParams extends DemoParams>(params: TParams): TParams {
  return { ...params };
}

export function createDemoStore<TParams extends DemoParams>(
  definition: DemoDefinition<TParams>,
): DemoStore<TParams> {
  let state: DemoState<TParams> = {
    params: cloneParams(definition.defaultParams),
  };

  return {
    getState() {
      return {
        params: cloneParams(state.params),
      };
    },
    setParam(key, value) {
      state = {
        params: {
          ...state.params,
          [key]: value,
        },
      };
    },
    reset() {
      state = {
        params: cloneParams(definition.defaultParams),
      };
    },
    applyPreset(presetId) {
      const preset = definition.presets.find((entry) => entry.id === presetId);

      if (!preset) {
        return;
      }

      state = {
        params: {
          ...definition.defaultParams,
          ...preset.params,
        },
      };
    },
  };
}
