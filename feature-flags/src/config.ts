import type { FeatureFlagRule } from "./types";
import type { FeatureFlags } from "./types";


let prodFeatureFlags: FeatureFlags = {};
let devFeatureFlags: FeatureFlags = {};

const env = process.env.NODE_ENV || "development";

if (env === "production") {
    prodFeatureFlags = {
        "new-dashboard": {
            id: "new-dashboard",
            name: "New Dashboard",
            description: "Enable the new dashboard for all users.",
            enabled: true,
            conditions: [
                { type: "percentage", percentage: 20 }
            ]
        },
        "beta-feature": {
            id: "beta-feature",
            name: "Beta Feature",
            description: "Enable the beta feature for admin users.",
            enabled: true,
            conditions: [
                { type: "roles", allowed: ["admin"] }
            ]
        }
        ,
        "payment-new-ui": {
            id: "payment-new-ui",
            name: "Payment New UI",
            description: "Enable the new payment UI for VIP users.",
            enabled: true,
            conditions: [
                { type: "percentage", percentage: 50 , allowed: ["admin"] , }
            ]
        }
    };
    
}
if (env === "development") {
    // test features in development those will be injected in runtime or from a db 
    devFeatureFlags = {
        "new-dashboard": {
            id: "new-dashboard",
            name: "New Dashboard",
            description: "Enable the new dashboard for all users.",
            enabled: true,
            conditions: [
                { type: "percentage", percentage: 20 }
            ]
        },
        "beta-feature": {
            id: "beta-feature",
            name: "Beta Feature",
            description: "Enable the beta feature for admin users.",
            enabled: true,
            conditions: [
                { type: "roles", allowed: ["admin"] }
            ]
        }
        ,
        "payment-new-ui": {
            id: "payment-new-ui",
            name: "Payment New UI",
            description: "Enable the new payment UI for VIP users.",
            enabled: true,
            conditions: [
                { type: "percentage", percentage: 50 , allowed: ["admin"] , }
            ]
        }
    };
    
}
const currentEnv = process.env.NODE_ENV || "development";

export default {
  env: currentEnv,
  flags: currentEnv === "production" ? prodFeatureFlags : devFeatureFlags
};  