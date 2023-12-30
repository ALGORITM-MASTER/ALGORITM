package org.example.level2;

import java.util.*;

public class UParkIntegral {
	public static double[] solution(int k, int[][] ranges) {
		List<Integer> y = new ArrayList<>();
		y.add(k);

		while (k != 1) {
			k = nextStep(k);
			y.add(k);
		}

		List<Double> integralDp = calcIntegralDp(y);
		List<Double> result = new ArrayList<>();

		for(int[] range : ranges) {
			int last = (y.size() - 1) + range[1];
			int start = range[0];
			if (last < 0 || start > y.size() - 1 || last < start) {
				result.add(-1.0);
				continue;
			}

			result.add(integralDp.get(last) - integralDp.get(start));
		}

		return result.stream()
			.mapToDouble(Double::doubleValue)
			.toArray();
	}

	private static int nextStep(int data) {
		if (data % 2 == 0) {
			return data / 2;
		}

		return data * 3 + 1;
	}

	private static List<Double> calcIntegralDp(List<Integer> y) {
		List<Double> dp = new ArrayList<>();
		dp.add(0.0);

		for (int i = 1; i < y.size(); i++) {
			dp.add((double)(y.get(i-1) + y.get(i)) / 2 + dp.get(i-1));
		}
		return dp;
	}
}
