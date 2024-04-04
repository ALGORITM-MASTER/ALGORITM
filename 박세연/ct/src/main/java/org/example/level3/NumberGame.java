package org.example.level3;

import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

public class NumberGame {
	public int solution(int[] A, int[] B) {
		int answer = 0;

		Arrays.sort(A);
		Arrays.sort(B);

		Deque<Integer> queue = new ArrayDeque<>();

		for(int i = B.length-1; i >= 0; i--) {
			queue.add(B[i]);
		}

		for (int i = A.length-1; i >= 0; i--) {
			if (A[i] < queue.peek()) {
				queue.poll();
				answer++;
			} else {
				queue.removeLast();
			}
		}

		return answer;
	}
}
