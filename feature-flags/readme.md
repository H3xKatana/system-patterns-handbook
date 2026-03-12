# Feature Flags

A **feature flag** (also known as a feature toggle) is a software development technique that allows teams to enable or disable features at runtime without deploying new code.

---

## Use Cases

### Kill Switch
Quickly disable problematic features in production without requiring a rollback or new deployment.

### Beta Testing
Gradually roll out new features to a subset of users for testing and feedback before full release.

### A/B Testing
Serve different feature variations to different user groups to measure impact and optimize user experience.

### Easier Deployment
Decouple deployment from release. Deploy code with hidden features and enable them when ready.

---

## Trade-offs

### Advantages
- **Risk Mitigation**: Quickly disable features if issues arise
- **Gradual Rollout**: Control exposure to new features
- **Continuous Deployment**: Ship code independently of feature releases
- **Experimentation**: Enable data-driven decisions through A/B testing

### Disadvantages
- **Increased Complexity**: Additional logic and configuration management
- **Code Overhead**: More conditional branches and flag checks
- **Maintenance Burden**: Flags need to be tracked and removed when no longer needed
- **Potential Failure Points**: Flag evaluation logic can introduce bugs or performance issues

---

## Project Plan: Simple Feature Flags Implementation

### Overview
Build a lightweight feature flags system that supports basic enable/disable functionality with user targeting.

### Proposed Structure

```
feature-flags/
├── readme.md
├── package.json              # Bun project configuration
├── tsconfig.json             # TypeScript configuration
├── src/
│   ├── index.ts              # Main entry point, exports FeatureFlagClient
│   ├── FeatureFlagClient.ts  # Core client for flag evaluation
│   ├── FlagStore.ts          # In-memory or file-based flag storage
│   └── evaluators/
│       ├── BooleanEvaluator.ts    # Simple on/off flags
│       └── PercentageEvaluator.ts # Rollout percentage flags
├── config/
│   └── flags.json            # Default flag configurations
├── tests/
│   ├── FeatureFlagClient.test.ts
│   └── evaluators/
│       ├── BooleanEvaluator.test.ts
│       └── PercentageEvaluator.test.ts
└── examples/
    └── basic-usage.ts        # Usage examples
```

### Core Components

#### 1. FeatureFlagClient (`src/FeatureFlagClient.ts`)
- Initialize with flag configuration
- `isEnabled(flagName: string, userId?: string): boolean` - Check if a flag is enabled for a user
- `getAllFlags(userId?: string): Record<string, boolean>` - Get all flag states for a user
- `setFlag(flagName: string, enabled: boolean): void` - Update flag state (runtime)

#### 2. FlagStore (`src/FlagStore.ts`)
- Store flag definitions and states
- Support for different flag types (boolean, percentage, user-list)
- Persistence layer (file-based or in-memory)

#### 3. Evaluators (`src/evaluators/`)
- **BooleanEvaluator**: Simple true/false flags
- **PercentageEvaluator**: Rollout to X% of users
- **UserListEvaluator**: Enable for specific user IDs

### Configuration Format (`config/flags.json`)

```json
{
  "flags": {
    "new_dashboard": {
      "enabled": true,
      "type": "boolean"
    },
    "beta_feature": {
      "enabled": true,
      "type": "percentage",
      "rollout": 50
    },
    "admin_only": {
      "enabled": true,
      "type": "userList",
      "users": ["user123", "user456"]
    }
  }
}
```

### Implementation Phases

| Phase | Task | Description |
|-------|------|-------------|
| 1 | Core Client | Build `FeatureFlagClient` with basic `isEnabled()` method |
| 2 | Flag Store | Implement in-memory storage with JSON config loading |
| 3 | Evaluators | Add boolean and percentage-based evaluators |
| 4 | Testing | Write unit tests for all components |
| 5 | Documentation | Add usage examples and API documentation |

### Future Enhancements
- Remote flag fetching (API-based)
- Real-time flag updates (WebSocket)
- Analytics and tracking
- Admin dashboard for flag management
- Database persistence

---

## Quick Start (Planned)

```typescript
import { FeatureFlagClient } from './src/index.js';

const client = new FeatureFlagClient('./config/flags.json');

// Check if feature is enabled
if (client.isEnabled('new_dashboard', userId)) {
  // Show new dashboard
} else {
  // Show old dashboard
}
```
