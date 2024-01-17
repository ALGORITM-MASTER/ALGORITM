package org.example.level3;

public class BestSet {

	public int[] solution(int n, int s) {
		int[] answer = new int[n];

		int avg = s / n;
		int add = s % n;

		if (avg == 0) {
			return new int[]{-1};
		}

		for (int i = 0; i< n-add; i++) {
			answer[i] = avg;
		}
		for (int i = n-add; i < n; i ++) {
			answer[i] = avg+1;
		}

		return answer;
	}
}
