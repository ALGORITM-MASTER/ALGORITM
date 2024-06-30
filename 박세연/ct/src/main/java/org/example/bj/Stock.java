package org.example.bj;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;

public class Stock {

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		int t = Integer.parseInt(br.readLine());

		for (int i = 0; i < t; i++) {

			int N = Integer.parseInt(br.readLine());
			Integer[] nList = Arrays.stream(br.readLine().split(" "))
				.map(data -> Integer.parseInt(data))
				.toArray(Integer[]::new);
			new Stock().solution(N, nList);
		}
	}

	private void solution(int n, Integer[] nList) {
		Rank[] ranks = new Rank[n];
		for (int i = 0; i < n; i++) {
			ranks[i] = new Rank(i, nList[i]);
		}

		Rank[] sortedRanks = Arrays.stream(ranks)
			.sorted((rank1, rank2) -> {
				return rank2.data.compareTo(rank1.data);
			})
			.toArray(Rank[]::new);

		long sum = 0;
		int rankIndex = 0;
		long cost = 0;
		long count = 0;
		for (int i = 0; i < n; i++) {
			if (i == sortedRanks[rankIndex].index) {
				sum += nList[i] * count - cost;

				while (rankIndex < n && i >= sortedRanks[rankIndex].index) {
					rankIndex++;
				}

				cost = 0;
				count = 0;
			} else {
				count++;
				cost += nList[i];
			}
		}

		sum += nList[n-1] * count - cost;
		System.out.println(sum);
	}

	class Rank {
		int index;
		Integer data;

		public Rank(int index, int data) {
			this.index = index;
			this.data = data;
		}
	}
}

/**
 *
 *
 * -10, 1 -20, 2
 * 0, 0
 * 0, 0
 */