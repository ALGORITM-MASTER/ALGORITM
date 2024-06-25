package org.example.bj;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class SumOTT {

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		int T = Integer.parseInt(br.readLine());
		int[] datas = new int[T];
		for (int i = 0; i < T; i++) {
			datas[i] = Integer.parseInt(br.readLine());
		}

		new SumOTT().solution(T, datas);
	}

	public void solution(int T, int[] datas) {
		int[] dp = new int[12];

		for (int i = 0; i < T; i++) {
			System.out.println(findSum(datas[i], dp));

		}
	}

	public int findSum(int data, int[] dp) {
		if (dp[data] != 0) {return dp[data];}

		if (data == 1) {return 1;} // 1
		dp[1] = 1;
		if (data == 2) {return 2;} // 11 2
		dp[2] = 2;
		if (data == 3) {return 4;} // 1 1 1,  1 2, 2 1, 3
		dp[3] = 4;

		for (int i = 4; i <= data; i++) {
			dp[i] = dp[i-1] + dp[i-2] + dp[i-3];
		}
		return dp[data];
	}
}
