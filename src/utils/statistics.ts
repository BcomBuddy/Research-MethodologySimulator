export const calculateMean = (data: number[]): number => {
  return data.reduce((sum, val) => sum + val, 0) / data.length;
};

export const calculateStandardDeviation = (data: number[]): number => {
  const mean = calculateMean(data);
  const squaredDifferences = data.map(val => Math.pow(val - mean, 2));
  const variance = calculateMean(squaredDifferences);
  return Math.sqrt(variance);
};

export const calculateVariance = (data: number[]): number => {
  const mean = calculateMean(data);
  const squaredDifferences = data.map(val => Math.pow(val - mean, 2));
  return calculateMean(squaredDifferences);
};

// t-distribution critical values (simplified table for common alpha levels)
export const getTCritical = (df: number, alpha: number): number => {
  const tTable: { [key: number]: { [key: number]: number } } = {
    1: { 0.05: 12.706, 0.01: 63.657 },
    2: { 0.05: 4.303, 0.01: 9.925 },
    3: { 0.05: 3.182, 0.01: 5.841 },
    4: { 0.05: 2.776, 0.01: 4.604 },
    5: { 0.05: 2.571, 0.01: 4.032 },
    10: { 0.05: 2.228, 0.01: 3.169 },
    15: { 0.05: 2.131, 0.01: 2.947 },
    20: { 0.05: 2.086, 0.01: 2.845 },
    30: { 0.05: 2.042, 0.01: 2.750 }
  };

  // Find closest df
  const availableDf = Object.keys(tTable).map(Number).sort((a, b) => a - b);
  let closestDf = availableDf[availableDf.length - 1];
  
  for (const dfValue of availableDf) {
    if (df <= dfValue) {
      closestDf = dfValue;
      break;
    }
  }

  return tTable[closestDf][alpha] || 1.96;
};

// F-distribution critical values (simplified)
export const getFCritical = (df1: number, df2: number, alpha: number): number => {
  // Simplified F critical values for common cases
  if (alpha === 0.05) {
    if (df2 >= 30) return 2.42;
    if (df2 >= 15) return 2.49;
    return 3.00;
  }
  return 2.00; // fallback
};

// Chi-square critical values (simplified)
export const getChiSquareCritical = (df: number, alpha: number): number => {
  const chiTable: { [key: number]: { [key: number]: number } } = {
    1: { 0.05: 3.841, 0.01: 6.635 },
    2: { 0.05: 5.991, 0.01: 9.210 },
    3: { 0.05: 7.815, 0.01: 11.345 },
    4: { 0.05: 9.488, 0.01: 13.277 },
    5: { 0.05: 11.070, 0.01: 15.086 },
    6: { 0.05: 12.592, 0.01: 16.812 }
  };

  return chiTable[df]?.[alpha] || 3.841;
};