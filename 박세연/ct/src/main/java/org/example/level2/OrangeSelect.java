package org.example.level2;

import java.util.*;
import java.util.stream.*;

public class OrangeSelect {

	public static void main(String[] args) {
		OrangeSelect orangeSelect = new OrangeSelect();

		orangeSelect.solution(6, new int[]{1,3,2,5,4,5,2,3});
	}

	public int solution(int k, int[] tangerine) {
		int answer = 0;
		Map<Integer, Integer> countMap = new HashMap<>();

		// 각 값들의 갯수 화인
		for (int target : tangerine) {
			updateMap(countMap, target);
		}

		// map을 list로 변환 후 많은 수대로 정렬
		List<Entry> entryList = setEntry(countMap);

		// 큰 값부터 오기에 하나씩 확인하며 크거나 같을때까지 찾고 반환
		int kCount = 0;
		for (Entry entry : entryList) {
			answer++;
			kCount += entry.getValue();
			if (kCount >= k) {
				break;
			}
		}

		return answer;
	}

	public void updateMap(Map<Integer, Integer> countMap, int target) {
		if (!countMap.containsKey(target)) {
			countMap.put(target, 1);
			return;
		}

		countMap.put(target, countMap.get(target)+1);
	}

	public List<Entry> setEntry(Map<Integer, Integer> countMap) {
		List<Entry> entryList = new ArrayList<>();

		for(Integer key : countMap.keySet()) {
			entryList.add(new Entry(key, countMap.get(key)));
		}

		Collections.sort(entryList, (entry1, entry2)-> {
			if (entry1.getValue() > entry2.getValue()) {
				return -1;
			}
			if (entry1.getValue() < entry2.getValue()) {
				return 1;
			}
			return 0;
		});
		return entryList;
	}

	class Entry {
		private int key;
		private int value;

		public Entry(int key, int value) {
			this.key = key;
			this.value = value;
		}

		public int getValue() {
			return value;
		}
	}
}
