package org.example.level2;

public class TwoCirclePair {
	public static long solution(int r1, int r2) {
		long answer = 0;

		double rr1 = Math.pow(r1,2);
		double rr2 = Math.pow(r2,2);

		for (int i = 0; i <= r2; i++) {
			int bigY = (int)findY(rr2, i);
			double smallY = 0;
			if (r1 > i) {
				smallY = findY(rr1, i);
			}

			answer += (int)(bigY - smallY) + 1;
		}

		return answer * 4 - (r2-r1+1)*4;
	}

	private static double findY(double rr, int x) {
		return Math.sqrt(rr - Math.pow(x,2));
	}
}
