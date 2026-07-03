import type { ReactNode } from "react";

export type DemoValue = number | string;

export type DemoParams = Record<string, DemoValue>;

export type DemoControlDefinition = {
  label: string;
} & (
  | {
      kind?: "range";
      min: number;
      max: number;
      step?: number;
    }
  | {
      kind: "select";
      options: Array<{
        label: string;
        value: string;
      }>;
    }
);

export type DemoPreset<TParams extends DemoParams> = {
  id: string;
  label: string;
  params: Partial<TParams>;
};

export type DemoDefinition<TParams extends DemoParams> = {
  id: string;
  title: string;
  description?: string;
  defaultParams: TParams;
  presets: DemoPreset<TParams>[];
  controls?: Partial<Record<keyof TParams, DemoControlDefinition>>;
  explanation: (params: TParams) => string[];
  renderStage?: (params: TParams) => ReactNode;
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
