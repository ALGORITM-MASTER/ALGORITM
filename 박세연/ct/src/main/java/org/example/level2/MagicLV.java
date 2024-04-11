package org.example.level2;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.Set;

public class MagicLV {

	public static void main(String[] args) {
		MagicLV magicLV = new MagicLV();
		magicLV.solution(2554);
	}
	public int solution(int storey) {
		int size = valueSize(storey);

		// maxIndex를 구하기 위한 값, 16이면 100, 2556이면 10,000
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

			// 다음 값들, 즉 내림이나 올림값들을 가져온다.
			List<Number> nexts = curr.getNexts();

			for (Number next : nexts) {
				// 다음 값의 index가 최대의 100배보다 크면 0으로 갈 수 없는 것
				if (curr.getIndex() > maxIndex*100) {
					continue;
				}

				// 0이 아니면 결과 값이 아니므로 queue에 더하고
				if (next.getData() != 0) {
					numbers.add(next);
					continue;
				}

				// 최소 값 찾는다.
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

	// 일의 자리수부터 index를 올려가면서 값을 확인하는 메서드
	// 따라서 1~2개의 값이 반환된다.
	public List<Number> getNexts() {
		List<Number> results = new ArrayList<>();

		int remain = data % index; // 16 => 6, 260 => 60

		int mock = index/10; // index는 10, 100, 1000인데 거기서 다시 10으로 나눈 값들, 즉 갯수를 구하기 위한 값
		int up = index - remain; // remain은 남는 값, up은 반대 상승 값

		// 내림하여 다음 값
		results.add(new Number(data-remain, index*10, count+remain/mock));

		// 올려서 다음 값 확인
		if (remain != 0 || data == index) {
			results.add(new Number(data+up, index*10, count+up/mock));
		}

		return results;
	}
}
