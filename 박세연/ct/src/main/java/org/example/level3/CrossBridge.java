package org.example.level3;

import java.util.LinkedList;
import java.util.Queue;

public class CrossBridge {
	public int solution(int[] stones, int k) {
		int min = 200000000;
		int max = 1;

		while (min >= max) {
			int mid = (min + max) / 2;
			if (canCross(stones, mid, k)) {
				max = mid + 1;
			}  else {
				min = mid - 1;
			}
		}

		return max;
	}

	public boolean canCross(int[] stones, int mid, int k) {
		int count = 0;

		for (int stone : stones) {
			if (stone <= mid) {
				count++;
			} else {
				count = 0;
			}

			if (count >= k) {
				return false;
			}
		}

		return true;
	}
}
