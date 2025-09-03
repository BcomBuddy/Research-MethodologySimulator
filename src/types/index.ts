export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface CalculationStep {
  label: string;
  formula?: string;
  substitution?: string;
  calculation?: string;
  result: string | number;
}

export interface StatisticalResult {
  steps: CalculationStep[];
  testStatistic: number;
  degreesOfFreedom: number | number[];
  pValue?: number;
  criticalValue?: number;
  decision: string;
  conclusion: string;
}

export interface TTestData {
  type: 'one-sample' | 'independent' | 'paired';
  sample1: number[];
  sample2?: number[];
  populationMean?: number;
  alpha: number;
}

export interface ANOVAData {
  groups: number[][];
  alpha: number;
}

export interface ChiSquareData {
  observed: number[][];
  expected?: number[][];
  alpha: number;
}