package org.example.level3;

import java.util.*;

public class FarNode {

	// https://school.programmers.co.kr/learn/courses/30/lessons/49189
	public int solution(int n, int[][] edge) {
		Map<Integer, Set<Integer>> edgeMap = new HashMap<>();
		init(edgeMap, edge);

		return bfs(n, edgeMap);
	}

	private void init(Map<Integer, Set<Integer>> edgeMap, int[][] edges) {
		for (int[] edge : edges) {
			putData(edgeMap, edge[0], edge[1]);
			putData(edgeMap, edge[1], edge[0]);
		}
	}

	private void putData(Map<Integer, Set<Integer>> edgeMap, int key, int value) {
		Set<Integer> dataSet = edgeMap.get(key);

		if (dataSet == null) {
			dataSet = new HashSet();
			edgeMap.put(key, dataSet);
		}

		dataSet.add(value);
	}

	private int bfs(int n, Map<Integer, Set<Integer>> edgeMap) {
		int[] score = new int[n+1];

		score[1] = 1;
		for (int i = 2; i < score.length; i++) {
			score[i] = -1;
		}

		Queue<Integer> bfs = new LinkedList<>();
		bfs.add(1);

		while (!bfs.isEmpty()) {
			Integer node = bfs.remove();

			Set<Integer> nextNodes = edgeMap.get(node);

			for (Integer nextNode : nextNodes) {
				if (score[nextNode] == -1 || score[nextNode] > score[node] + 1) {
					bfs.add(nextNode);
					score[nextNode] = score[node] + 1;

					continue;
				}
			}
		}

		Integer[] result = Arrays.stream(score)
			.mapToObj(Integer::valueOf)
			.sorted((o1,o2) -> o2.compareTo(o1))
			.toArray(Integer[]::new);

		int count = 0;
		int max = result[0];

		for (int i = 0 ; i < result.length; i++) {
			if (max == result[i]) {
				count++;
				continue;
			}
			break;
		}

		return count;
	}
}



