package org.example.level2;

import java.util.LinkedList;
import java.util.Queue;

public class TargetNumber {

	public int solution(int[] numbers, int target) {
		Equation e = new Equation(numbers, target);
		e.make();
		return e.getResult();
	}
}

class Equation {
	private Queue<Data> queue;
	private int[] numbers;
	private int target;
	private int result;

	public Equation (int[] numbers, int target) {
		this.queue = new LinkedList<>();
		this.numbers = numbers;
		this.target = target;
		this.result = 0;
	}

	public void make() {
		queue.add(new Data(0, numbers[0]));
		queue.add(new Data(0, -1 * numbers[0]));

		while (!queue.isEmpty()) {
			Data data = queue.remove();
			int index = data.getIndex();

			if (index == numbers.length-1) {
				checkFinish(data.getTotal());

				continue;
			}

			queue.add(new Data(index+1, data.getTotal() + numbers[index+1]));
			queue.add(new Data(index+1, data.getTotal() + -1 * numbers[index+1]));
		}
	}

	public void checkFinish(int total) {
		if (total == this.target) {
			this.result++;
		}
	}

	public int getResult() {
		return this.result;
	}
}

class Data {
	private int index;
	private int total;

	public Data(int index, int total) {
		this.index = index;
		this.total = total;
	}

	public int getIndex() {
		return index;
	}
	public int getTotal() {
		return total;
	}
}
