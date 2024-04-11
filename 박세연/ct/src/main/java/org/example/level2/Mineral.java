package org.example.level2;

import java.util.*;

public class Mineral {
	private static final int MINERAL_COUNT = 5;

	public static int solution(int[] picks, String[] minerals) {
		int answer = 0;

		Map<String, int[]> mineralValue = new HashMap<>();
		mineralValue.put("diamond", new int[] {1, 5, 25});
		mineralValue.put("iron", new int[] {1, 1, 5});
		mineralValue.put("stone", new int[] {1, 1, 1});

		List<int[]> rounds = new ArrayList<>();
		for (int i = 0; i < minerals.length; i++) {
			if (i % MINERAL_COUNT == 0) {
				rounds.add(new int[3]);
			}

			rounds.get(i / MINERAL_COUNT)[0] +=  mineralValue.get(minerals[i])[0];
			rounds.get(i / MINERAL_COUNT)[1] +=  mineralValue.get(minerals[i])[1];
			rounds.get(i / MINERAL_COUNT)[2] +=  mineralValue.get(minerals[i])[2];
		}

		int totalPicks = picks[0] + picks[1] + picks[2];
		int matchSize = rounds.size();
		if (totalPicks < rounds.size()) {
			matchSize = totalPicks;
		}

		while (rounds.size() > matchSize) {
			rounds.remove(rounds.size() - 1);
		}

		rounds.sort((round1, round2) -> {
			if (round1[2] < round2[2]) {
				return 1;
			} else if (round1[2] > round2[2]) {
				return -1;
			}

			if (round1[1] < round2[1]) {
				return 1;
			} else if (round1[1] > round2[1]) {
				return -1;
			}

			return -1;
		});

		int pickIndex = 0;
		int roundIndex = 0;

		while (roundIndex < matchSize) {
			if (picks[pickIndex] == 0) {
				pickIndex++;
				continue;
			}

			answer += rounds.get(roundIndex)[pickIndex];
			roundIndex++;
			picks[pickIndex]--;
		}

		return answer;
	}
}
