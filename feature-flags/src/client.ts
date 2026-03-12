import type { FeatureFlags, User, FeatureFlagRule } from "./types";
import { evaluateFlag } from "./evaluators";

export class FeatureFlagClient {
  private flags: FeatureFlags;

  constructor(flags: FeatureFlags = {}) {
    this.flags = flags;
  }

  getFlags(): FeatureFlags {
    return this.flags;
  }

  isEnabled(flagId: string, user: User): boolean {
    const flag = this.flags[flagId];
    if (!flag) return false;
    return evaluateFlag(flag, user);
  }

  setFlag(flagId: string, flag: FeatureFlagRule): void {
    this.flags[flagId] = flag;
  }

  getFlag(flagId: string): FeatureFlagRule | undefined {
    return this.flags[flagId];
  }
}
