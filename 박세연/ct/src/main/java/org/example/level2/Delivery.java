package org.example.level2;

public class Delivery {
	public long solution(int cap, int n, int[] deliveries, int[] pickups) {
		long answer = 0;

		int deliveryCount = 0;
		int pickUpCount = 0;

		for (int i = n-1; i >= 0; i--) {
			deliveryCount -= deliveries[i];
			pickUpCount -= pickups[i];

			while (deliveryCount < 0 || pickUpCount < 0) {
				deliveryCount += cap; // 4 6 5 5
				pickUpCount += cap;   // 4 8 8
				answer += (i+1);
			}

			System.out.println(deliveryCount + "_" + pickUpCount + ":"+answer);
		}

		return answer * 2;
	}
}
