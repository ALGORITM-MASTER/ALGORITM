package org.example.bj;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class MakeOne {

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		int N = Integer.parseInt(br.readLine());

		new MakeOne().solution(N);
	}

	public void solution(int N) {
		int[] nList = new int[N+1];
		nList[1] = 0;

		for (int i = 2; i <= N; i++) {
			int small = nList[i - 1] ;

			if (i % 3 == 0) {
				small = small < nList[i / 3] ? small : nList[i / 3];
			}

			if (i % 2 == 0) {
				small = small < nList[i / 2] ? small : nList[i / 2];
			}

			nList[i] = small +1;
		}

		System.out.println(nList[N]);
	}
}
