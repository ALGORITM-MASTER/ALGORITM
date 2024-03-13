package org.example.level3;

public class AntenaInstall {
	public int solution(int n, int[] stations, int w) {
		int answer = 0;

		int start = 1;
		int width = w * 2 + 1;

		for (int station : stations) {
			answer += solve(start, station - w -1, width);
			start = station + w + 1;
		}

		answer += solve(start, n, width);

		return answer;
	}

	public int solve(int start, int end, int width) {
		if (end < 0) {
			return 0;
		}

		if (start > end) {
			return 0;
		}

		int size = end - start + 1;

		int result = size / width;

		return result * width == size ? result : result + 1;
	}
}
