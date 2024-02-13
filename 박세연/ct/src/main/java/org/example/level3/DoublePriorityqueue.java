package org.example.level3;

import java.util.Collections;
import java.util.PriorityQueue;

public class DoublePriorityqueue {

	public static void main(String[] args) {
		PriorityQueue<Integer> enQueue = new PriorityQueue<>(Collections.reverseOrder());
		enQueue.add(1);
		enQueue.add(3);
		System.out.println(enQueue.peek());
	}

	public int[] solution(String[] operations) {
		int[] answer = {};

		PriorityQueue<Integer> enQueue = new PriorityQueue<>();
		PriorityQueue<Integer> deQueue = new PriorityQueue<>(Collections.reverseOrder());

		for (String operation : operations) {
			String[] opers = operation.split(" ");

			switch (opers[0]) {
				case "I": insert(enQueue, deQueue, opers[1]);
					break;
				case "D": delete(enQueue, deQueue, opers[1]);
					break;
				default:
					break;
			}

			System.out.println(enQueue);
			System.out.println(deQueue);
		}

		int min = 0;
		int max = 0;

		if (!enQueue.isEmpty()) {
			min = enQueue.peek();
		}

		if (!deQueue.isEmpty()) {
			max = deQueue.peek();
		}
		return new int[]{max, min};
	}

	private void insert(PriorityQueue<Integer> enQueue, PriorityQueue<Integer> deQueue, String data) {
		int value = Integer.parseInt(data);

		enQueue.add(value);
		deQueue.add(value);
	}

	private void delete(PriorityQueue<Integer> enQueue, PriorityQueue<Integer> deQueue, String data) {
		if ("-1".equals(data)) {
			deleteData(enQueue, deQueue);

			return;
		}

		deleteData(deQueue, enQueue);
	}

	private void deleteData(PriorityQueue<Integer> mainQueue, PriorityQueue<Integer> subQueue) {
		if (mainQueue.isEmpty()) {
			return;
		}

		int data = mainQueue.poll();
		subQueue.remove(data);
	}
}
