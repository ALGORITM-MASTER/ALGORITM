package org.example.bj;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class EggToEgg {

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		int n = Integer.parseInt(br.readLine());

		Egg[] eggs = new Egg[n];
		for (int i = 0; i < n; i++) {
			String[] input = br.readLine().split(" ");
			eggs[i] = new Egg(Integer.parseInt(input[0]), Integer.parseInt(input[1]));
		}

		new EggToEgg().solution(eggs);
	}

	private void solution(Egg[] eggs) {
		System.out.println(dfs(eggs, 0));

	}

	private int dfs(Egg[] eggs, int eggIndex) {
		if (eggIndex == eggs.length ) {
			return calc(eggs);
		}

		int result = 0;
		for (int i = 0; i < eggs.length; i++) {
			if (eggs[eggIndex].durability <= 0) {
				int temp = dfs(eggs, eggIndex+1);
				result = result < temp ? temp : result;
				continue;
			}

			if (eggIndex == i || eggs[i].durability <= 0) {
				continue;
			}

			eggs[eggIndex].durability -= eggs[i].weight;
			eggs[i].durability -= eggs[eggIndex].weight;
			int temp = dfs(eggs, eggIndex+1);
			result = result < temp ? temp : result;
			eggs[eggIndex].durability += eggs[i].weight;
			eggs[i].durability += eggs[eggIndex].weight;
		}

		int total = calc(eggs);

		return result < total ? total : result;
	}

	private int calc(Egg[] eggs) {
		int total = 0;
		for (int i = 0; i < eggs.length; i++) {
			if (eggs[i].durability <= 0) {
				total++;
			}
		}

		return total;
	}

	static class Egg {
		int durability;
		int weight;

		public Egg(int durability, int weight) {
			this.durability = durability;
			this.weight = weight;
		}
	}
}
