package org.example.bj;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;

public class Rope {

	public static void main(String[] args) throws IOException {
		BufferedReader bf = new BufferedReader( new InputStreamReader(System.in));

		int n = Integer.parseInt(bf.readLine());

		int[] nList = new int[n];
		for (int i = 0; i < n; i++) {
			nList[i] = Integer.parseInt(bf.readLine());
		}

		new Rope().solution(n, nList);
	}

	private void solution(int n, int[] nList) {
		int[] datas = Arrays.stream(nList).sorted().toArray();

		int result = 0;

		for (int i = 0; i < n; i++) {
			int data = datas[i];

			int min = data * (n - i);
			result = result > min ? result : min;
		}
		System.out.println(result);
	}
}
