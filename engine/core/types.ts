export type DemoParams = Record<string, number>;

export type DemoPreset<TParams extends DemoParams> = {
  id: string;
  label: string;
  params: Partial<TParams>;
};

export type DemoDefinition<TParams extends DemoParams> = {
  id: string;
  title: string;
  defaultParams: TParams;
  presets: DemoPreset<TParams>[];
  explanation: (params: TParams) => string[];
};

export type DemoState<TParams extends DemoParams> = {
  params: TParams;
};

export type DemoStore<TParams extends DemoParams> = {
  getState: () => DemoState<TParams>;
  setParam: <K extends keyof TParams>(key: K, value: TParams[K]) => void;
  reset: () => void;
  applyPreset: (presetId: string) => void;
};
