package org.example.level3;

import java.util.*;

public class GemShpping {
	public int[] solution(String[] gems) {
		int[] answer = {};

		Map<String, Integer> dataMap = new HashMap<>();
		Set<String> dataSet = new HashSet<>();
		for (String gem : gems) {
			dataSet.add(gem);
		}

		dataMap.put(gems[0], 1);
		int start = 0;
		int end = 0;
		Result result = new Result(start, gems.length-1);

		while(start <= end) {
			int bStart = start;
			int bEnd = end;

			if (haveAll(dataMap.keySet(), dataSet)) {
				Result temp = new Result(bStart, bEnd);
				if (result.biggerThen(temp)) {
					result = temp;
				}
				startUp(dataMap, gems[start]);
				start++;
			} else {
				end++;
				if (end >= gems.length) {
					break;
				}
				endUp(dataMap, gems[end]);
			}
		}

		return new int[]{result.start+1, result.end+1};
	}

	private void startUp(Map<String, Integer> dataMap, String gem) {
		if (!dataMap.containsKey(gem)) {
			return;
		}

		Integer gemCount = dataMap.get(gem);
		if (gemCount == 1) {
			dataMap.remove(gem);
			return;
		}

		dataMap.put(gem, gemCount-1);
	}

	private void endUp(Map<String, Integer> dataMap, String gem) {
		Integer gemCount = 0;
		if (dataMap.containsKey(gem)) {
			gemCount = dataMap.get(gem);
		}

		dataMap.put(gem, gemCount + 1);
	}

	private boolean haveAll(Set<String> keySet, Set<String> dataSet) {
		return keySet.size() == dataSet.size();
	}
}

class Result {
	int start;
	int end;

	public Result(int start, int end) {
		this.start = start;
		this.end = end;
	}

	public boolean biggerThen(Result result) {
		return (end - start) > (result.end - result.start);
	}
}