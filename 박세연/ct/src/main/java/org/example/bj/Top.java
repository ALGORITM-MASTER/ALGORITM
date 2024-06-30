package org.example.bj;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.Stack;

public class Top {

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		// 5
		// 6 9 5 7 4
		// 0 0
		int n = Integer.parseInt(br.readLine());
		String[] inputs = br.readLine().split(" ");

		new Top().solution(inputs);
	}

	private void solution(String[] inputs) {
		Integer[] datas = Arrays.stream(inputs)
			.map(Integer::parseInt)
			.toArray(Integer[]::new);

		Stack<Tower> stack = new Stack<>();
		int[] result = new int[datas.length];

		for (int i = 0; i < datas.length; i++) {
			if (stack.isEmpty()) {
				stack.add(new Tower(i, datas[i]));
				continue;
			}

			while (!stack.isEmpty()) {
				if (stack.peek().height < datas[i]) {
					stack.pop();
					continue;
				}

				result[i] = stack.peek().index+1;
				break;
			}
			stack.add(new Tower(i, datas[i]));
		}

		System.out.println(String.join(" ", Arrays.stream(result).mapToObj(Integer::toString).toArray(String[]::new)));
	}

	class Tower {
		int index;
		int height;

		public Tower(int index, int height) {
			this.index = index;
			this.height = height;
		}
	}
}
