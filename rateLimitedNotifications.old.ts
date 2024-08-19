export function checkPolicies(type: string, userId: string) {
  if(policies[type]) {
    const calls = callHistory.filter(call => {
      if (call.userId == userId && call.type == type && checkTimeValid(call.timestamp, policies[type].timerate)) {
        return true;
      }
      return false;
    }).length;
    if (calls > policies[type].maxQuantity)
      return false;
    callHistory.push({type, userId, timestamp: Date.now()});
    return true;
  }
  return false;
}

function checkTimeValid(time, policyrate) {
  const startTime = Date.now().valueOf() - policyrate;
  const endTime = Date.now().valueOf()
  if (time < endTime && time > startTime) {
    return true;
  }
  return false;
}

const callHistory: Array<{type: string, userId: string, timestamp: number}> = [];

const policies = {
  "status": {
    timerate: 3600,
    maxQuantity: 2
  },
  "news": {
    timerate: 360000,
    maxQuantity: 3
  },
  "marketing": {
    timerate: 36000,
    maxQuantity: 4
  },
}