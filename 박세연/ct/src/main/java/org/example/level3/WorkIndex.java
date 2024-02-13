package org.example.level3;
import java.util.*;
import java.util.stream.*;

public class WorkIndex {
	public long solution(int n, int[] works) {
		long answer = 0;

		PriorityQueue<Integer> queue = new PriorityQueue<>(Collections.reverseOrder());
		initQueue(queue, works);
		remove(queue, n);

		return findResult(queue);
	}

	public void initQueue(PriorityQueue<Integer> queue, int[] works) {
		for (int work : works) {
			queue.add(work);
		}
	}

	public void remove(PriorityQueue<Integer> queue, int n) {
		while(n > 0) {
			if (queue.isEmpty()) {
				break;
			}

			int max = queue.poll() - 1;

			if (max > 0) {
				queue.add(max);
			}
			n--;
		}
	}

	public long findResult(PriorityQueue<Integer> queue) {
		long result = 0;
		while (!queue.isEmpty()) {
			int temp = queue.poll();
			result += temp * temp;
		}

		return result;
	}
}
