package org.example.level3;

import java.util.*;

public class Network {

	public static void main(String[] args) {
		Network network = new Network();

		network.solution2(5,
			new int[][] {{1, 0, 0, 0, 1}, {0, 1, 1, 0, 0},
				{0, 1, 1, 1, 0}, {0, 0, 1, 1, 1}, {1, 0, 0, 1, 1}});
	}

	public int solution2(int n, int[][] computers) {
		int[] parents = new int[n];

		for (int i = 0 ; i < n; i++) {
			parents[i] = i;
		}

		for (int i = 0; i < computers.length; i++) {
			for (int j = 0; j < computers[i].length; j++) {
				if (computers[i][j] == 0) {
					continue;
				}

				union(parents, i,j);
			}
		}

		return 0;
	}

	private int find(int[] parents, int index) {
		if (parents[index] == index) {
			return index;
		}

		parents[index] = find(parents, parents[index]);
		return parents[index];
	}

	private void union(int[] parents, int start, int end) {
		int s = find(parents, start);
		int e = find(parents, end);

		if (s < e) {
			parents[e] = s;
		} else {
			parents[s] = e;
		}
	}

	public int solution(int n, int[][] computers) {
		int answer = 0;

		Map<Integer, Set<Integer>> map = new HashMap<>();

		for (int[] computer : computers) {
			int temp = -1;
			for (int i = 0; i < computer.length; i++) {
				if (computer[i] == 0) {
					continue;
				}

				if (temp == -1) {
					temp = i;
					continue;
				}

				Set<Integer> origin = map.getOrDefault(temp, new HashSet<>());
				origin.add(i);
				map.putIfAbsent(temp, origin);
				Set<Integer> other = map.getOrDefault(i, new HashSet<>());
				other.add(temp);
				map.putIfAbsent(temp, other);
			}
		}

		Set<Integer> visit = new HashSet<>();

		for (Integer data : map.keySet()) {
			if (visit.contains(data)) {
				continue;
			}

			Queue<Integer> queue = new LinkedList<>();
			queue.add(data);

			while (!queue.isEmpty()) {
				Integer now = queue.poll();

				if (visit.contains(now)) {
					continue;
				}

				visit.add(now);
				queue.addAll(map.get(data));
			}
			answer++;
		}

		return answer + n - visit.size();
	}
}
