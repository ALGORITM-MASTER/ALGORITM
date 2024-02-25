package org.example.level2;

import java.util.ArrayList;
import java.util.List;

public class hanoi {
	public int[][] solution(int n) {
		int[][] answer = {};
		Hanoi hanoi = new Hanoi();
		hanoi.hanoi(n, 1, 3, 2);
		return hanoi.getResult();
	}

	class Hanoi {
		private List<List<Integer>> result;

		public Hanoi() {
			result = new ArrayList<>();
		}

		public void hanoi(int n, int start, int end, int mid) {
			if (n == 1) {
				add(start, end);
				return;
			}

			hanoi(n-1, start, mid, end);
			add(start,end);
			hanoi(n-1, mid, end, start);
		}

		public void add(int start, int end) {
			result.add(List.of(start, end));
		}

		public int[][] getResult() {
			int[][] ret = new int[result.size()][2];
			for (int i = 0; i < result.size(); i++) {
				ret[i] = result.get(i).stream().mapToInt(Integer::intValue).toArray();
			}
			return ret;
		}
	}
}
