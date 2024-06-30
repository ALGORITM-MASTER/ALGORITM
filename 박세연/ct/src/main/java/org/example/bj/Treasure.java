package org.example.bj;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;

public class Treasure {

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		int n = Integer.parseInt(br.readLine());
		String[] data1 = br.readLine().split(" ");
		String[] data2 = br.readLine().split(" ");

		new Treasure().solution(n, data1, data2);
	}

	public void solution(int n, String[] data1, String[] data2) {

		Integer[] number1 = Arrays.stream(data1)
			.map(data -> Integer.parseInt(data))
			.sorted()
			.toArray(Integer[]::new);

		Integer[] number2 = Arrays.stream(data2)
			.map(data -> Integer.parseInt(data))
			.sorted((d1, d2) -> {
				return d2.compareTo(d1);
			})
			.toArray(Integer[]::new);

		int sum = 0;
		for (int i = 0; i < n; i++) {
			sum += number1[i] * number2[i];
		}

		System.out.println(sum);
	}
}
