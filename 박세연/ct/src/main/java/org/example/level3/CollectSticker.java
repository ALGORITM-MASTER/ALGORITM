package org.example.level3;

public class CollectSticker {
	public int solution(int sticker[]) {
		if (sticker.length == 1) {
			return sticker[0];
		}

		if (sticker.length == 2) {
			return Math.max(sticker[0], sticker[1]);
		}

		int sticker2[] = sticker.clone();

		sticker[sticker.length-1] = 0;
		sticker2[0] = 0;

		int dp[] = new int[sticker.length];
		int dp2[] = new int[sticker.length];

		dp[0] = sticker[0];
		dp2[0] = sticker2[0];
		dp[1] = Math.max(dp[0], sticker[1]);
		dp2[1] = Math.max(dp2[0], sticker2[1]);

		for (int i = 2; i < sticker.length; i++) {
			dp[i] = Math.max(dp[i-1], dp[i-2] + sticker[i]);
			dp2[i] = Math.max(dp2[i-1], dp2[i-2] + sticker2[i]);
		}

		return Math.max(dp[sticker.length-1], dp2[sticker.length-1]);
	}
}
