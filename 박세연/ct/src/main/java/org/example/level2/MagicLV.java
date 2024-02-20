package org.example.level2;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.Set;

public class MagicLV {
	public int solution(int storey) {
		int size = valueSize(storey);

		int maxIndex = 10;
		for (int i = 1; i < size; i++) {
			maxIndex *= 10;
		}

		Queue<Number> numbers = new LinkedList<>();
		numbers.add(new Number(storey, 10, 0));

		Set<Integer> visit = new HashSet<>();
		int min = -1;

		while (!numbers.isEmpty()) {
			Number curr = numbers.remove();

			List<Number> nexts = curr.getNexts();

			for (Number next : nexts) {
				if (curr.getIndex() > maxIndex*100) {
					continue;
				}

				if (next.getData() != 0) {
					numbers.add(next);
					continue;
				}

				if (min == -1 || min > next.getCount()) {
					min = next.getCount();
				}
			}
		}

		return min;
	}

	public int valueSize(int value) {
		return String.valueOf(value).length();
	}
}

class Number {
	private int data;
	private int count;
	private int index;

	public Number(int data, int index, int count) {
		this.data = data;
		this.index = index;
		this.count = count;
	}

	public int getData() {
		return data;
	}

	public int getCount() {
		return count;
	}

	public int getIndex() {
		return index;
	}

	public List<Number> getNexts() {
		List<Number> results = new ArrayList<>();

		int remain = data % index;

		int mock = index/10;
		int up = index - remain;

		results.add(new Number(data-remain, index*10, count+remain/mock));

		if (remain != 0 || data == index) {
			results.add(new Number(data+up, index*10, count+up/mock));
		}

		return results;
	}
}
