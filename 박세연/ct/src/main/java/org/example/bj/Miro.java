package org.example.bj;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.Queue;

public class Miro {

	private static int[][] DIR = new int[][]{{-1,0}, {0,-1}, {1,0}, {0,1}};

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		String[] mapSize = br.readLine().split(" ");
		int N = Integer.parseInt(mapSize[0]);
		int M = Integer.parseInt(mapSize[1]);

		String[] map = new String[N];
		for (int i = 0; i < N; i++) {
			map[i] = br.readLine();
		}

		new Miro().solution(N, M, map);
	}

	private void solution(int N, int M, String[] map) {
		System.out.println(findRoad(N, M, map));
	}

	private int findRoad(int N, int M, String[] map) {
		Queue<Point> points = new LinkedList<>();
		points.add(new Point(0, 0, 1));

		boolean[][] visited = new boolean[N][M];
		visited[0][0] = true;

		Point lastPoint = new Point(N-1, M-1,0);


		while (!points.isEmpty()) {
			Point currPoint = points.remove();

			if (currPoint.equals(lastPoint)) {
				return currPoint.index;
			}

			for (int i = 0; i < DIR.length; i++) {
				int nextY = DIR[i][0] + currPoint.y;
				int nextX = DIR[i][1] + currPoint.x;

				if (outOfRange(N, M, nextY, nextX)) {continue;}
				if (visited[nextY][nextX]) {continue;}

				if (map[nextY].charAt(nextX) == '1') {
					points.add(new Point(nextY, nextX, currPoint.index+1));
				}
				visited[nextY][nextX] = true;
			}
		}
		return 0;
	}

	private boolean outOfRange(int N, int M, int y, int x) {
		return y < 0 || y >= N || x < 0 || x >= M;
	}

	class Point {
		int y;
		int x;
		int index;

		public Point(int y, int x, int index) {
			this.y = y;
			this.x = x;
			this.index = index;
		}

		@Override
		public boolean equals(Object obj) {
			if (obj == null) {
				return false;
			}

			if (! (obj instanceof Point)) {
				return false;
			}

			Point p = (Point) obj;
			return p.y == this.y && p.x == this.x;
		}
	}

}

