package org.example.level3;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

public class Naver1 {

	public static void main(String[] args) {
		solution(new int[]{2,4,1,2}, new int[]{3,1,2,1,4,1});
	}

	public static void solution(int[] plants, int[] waters) {
		PriorityQueue<Plant> plantsQueue = new PriorityQueue<>();
		a(plantsQueue, plants); // 주는 날이 짧은 애들을 앞으로, 주는 날이 긴애들 뒤로
		// 날짜 별로 하나씩 줄여야하는건데 -> 하나씩 줄이필요가 없고
		// 날짜에 맞게 이 날에 얘한테 줘야하는가?
		// 1일에 줘야하는가?
		// 2 -> 3-> 4-> 5->
		// waters-> 날짜 기반 1일~waters.length 날짜까지 하루에 하나씩 준다는건데


		List<Integer> results = find(plantsQueue, waters);
		System.out.println(results);
	}

	private static List<Integer> find(PriorityQueue<Plant> plantsQueue, int[] waters) {
		// 1 2 3 4 5 6 7 8 9
		// 2 4
		Map<Integer, Integer> cache = new HashMap<>();
		List<Integer> results = new ArrayList<>();

		for (int i = 0; i < waters.length; i++) { //; index == 날짜
			boolean giveWater = false;
			while (!plantsQueue.isEmpty()) { // 날짜에 맞게 다 빼주는거
				if (plantsQueue.peek().left > i+1) { // 1 0+1
					break;
				}

				// 물을 줘야하는 애지만, 안줄수도 줄수도 있는 상황
				Plant plant = plantsQueue.remove(); // 확인해야하는 애

				if (plant.index == waters[i]) { // 물을 줘야함
					plantsQueue.add(new Plant(plant.index, plant.left + plant.day, plant.day));
					giveWater = true;
					continue;
				}
				
				if (cache.containsKey(plant.index)) {
					plantsQueue.add(new Plant(plant.index, cache.get(plant.index) + plant.day, plant.day));
					cache.remove(plant.index);
					continue;
				}
			}

			if (!giveWater) {
				cache.put(waters[i], i+1);
			}

			results.add(plantsQueue.size());
		}

		return results;
	}

	private static void a(PriorityQueue<Plant> plantsQueue, int[] plants) {
		for (int i = 0; i < plants.length; i++) {
			plantsQueue.add(new Plant(i+1, plants[i], plants[i]));
		}
	}
}

class Plant implements Comparable<Plant> {

	public int day; // 주기
	public int left; // 현재 날짜 -> 미래에 물을 받을 날짜
	public int index; // 위치

	public Plant(int index, int left, int day) {
		this.index = index;
		this.left = left;
		this.day = day;
	}

	public Plant(int index, int left) {
		this.index = index;
		this.left = left;
	}

	public int compareTo(Plant plant) {
		if (left <plant.left) {
			return -1;
		}
		return 1;
	}

	public String toString() {
		return "[" + index+":"+left+"]";
	}
}
