package org.example.level3;

import java.util.*;

public class GoToSchool {

	private int[][] directions = {{0,1}, {1,0}};
	int N;
	int M;

	public int solution(int m, int n, int[][] puddles) {
		N = n;
		M = m;

		int[][] road = new int[N][M];
		road[0][0] = 1;

		puddlesSet(road, puddles);

		return find(road);
	}

	public void puddlesSet(int[][] road, int[][] puddles) {
		for (int[] puddle: puddles) {
			road[puddle[1]-1][puddle[0]-1] = -1;
		}
	}

	public int find(int[][] road) {
		for (int i = 1; i < N; i++) {
			if (road[i][0] == -1) {
				continue;
			}

			road[i][0] = road[i-1][0];
		}

		for (int i = 1; i < M; i++) {
			if (road[0][i] == -1) {
				continue;
			}

			road[0][i] = road[0][i-1];
		}

		for (int i = 1; i < N; i++) {
			for (int j = 1; j < M; j++) {
				if (road[i][j] == -1) {
					continue;
				}

				int up = 0;
				if (road[i-1][j] != -1) {
					up = road[i-1][j];
				}
				int left = 0;
				if (road[i][j-1] != -1) {
					left = road[i][j-1];
				}

				road[i][j] = (up + left) % 1000000007;
			}
		}

		return road[N-1][M-1];
	}
}
