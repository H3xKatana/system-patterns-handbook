import type { User, Condition, FeatureFlagRule } from "./types";



function evaluateBoolean(_condition: Condition, _user: User): boolean {
  return true;
}

/*
    we are using a hash bucket apporach users based on thier id are split into buckets from 0 - 99 
    and we take the 20% of those buckets it is deterministic and not resource heavy and assure ussers will
    have the same result 
*/
function evaluatePercentage(condition: Condition, user: User): boolean {
  if (!condition.percentage) return false;
  const hash = hashUserId(user.id);
  return hash < condition.percentage;
}

function evaluateUserList(condition: Condition, user: User): boolean {
  if (!condition.users || condition.users.length === 0) return false;
  return condition.users.includes(user.id);
}

function evaluateRoles(condition: Condition, user: User): boolean {
  if (!condition.allowed || condition.allowed.length === 0) return false;
  const userRoles = user.roles || [];
  return userRoles.some((role) => condition.allowed!.includes(role));
}

function hashUserId(userId: string): number {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = ((hash << 5) - hash + userId.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % 100;
}

export function evaluateFlag(flag: FeatureFlagRule, user: User): boolean {
  if (!flag.enabled) return false;
  if (flag.conditions.length === 0) return true;
  /*
    we are validating user and flag and return if he has access to this feature
    we loop on every condition and if one is false we return false direcly 
  */ 
  return flag.conditions.every((condition) => {
    switch (condition.type) {
      case "boolean":
        return evaluateBoolean(condition, user);
      case "percentage":
        return evaluatePercentage(condition, user);
      case "userList":
        return evaluateUserList(condition, user);
      case "roles":
        return evaluateRoles(condition, user);
      default:
        return false;
    }
  });
}
