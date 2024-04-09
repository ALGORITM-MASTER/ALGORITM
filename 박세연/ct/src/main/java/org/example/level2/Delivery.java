package org.example.level2;

public class Delivery {
	public long solution(int cap, int n, int[] deliveries, int[] pickups) {
		long answer = 0;

		int deliveryCount = 0;
		int pickUpCount = 0;

		// 아이디어는 뒤에서 부터 확인하면 된다.
		// 먼곳부터 데이터를 어떻게 해결할것인가 -> 뒤에서 부터 데이터를 제거해야한다.
		// 그럼 어떻게 한번에 가져올 수 있는 것을 처리할 것인가 = while문으로 해결
		for (int i = n-1; i >= 0; i--) {
			// 마지막부터 확인하며 배달 개수를 먼저 뺀다.
			// 그럼 마이너스가 되는데, 이는 집에 갔다와야 한다느 ㄴ것이고
			// 0이상으로 만들면 다시 집에 들르지 않고 배달을 할 수 있다는 것
			// 이렇게 0이하로 떨어질 때까지 배달하게 한다.
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
