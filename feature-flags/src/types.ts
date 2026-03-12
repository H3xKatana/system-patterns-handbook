export type User = {
  id: string;
  roles?: string[];
};

export type Condition = {
  type: "boolean" | "percentage" | "userList" | "roles";
  percentage?: number;
  users?: string[];
  allowed?: string[];
};

export type FeatureFlagRule = {
  id: string;
  name: string;
  description?: string;
  enabled: boolean;
  conditions: Condition[];
};

export type FeatureFlags = Record<string, FeatureFlagRule>;
