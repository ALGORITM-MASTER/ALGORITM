package org.example.bj;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.Queue;

// 1926
public class Picture {

	public static int[][] DIR = new int[][]{{-1, 0}, {0, -1}, {1, 0}, {0, 1}};

	public static void main(String[] args) throws IOException {
		BufferedReader reader= new BufferedReader(new InputStreamReader(System.in));

		String[] size = reader.readLine().split(" ");
		int n = Integer.parseInt(size[0]);
		int m = Integer.parseInt(size[1]);

		String[][] map = new String[n][m];

		for (int i = 0; i < n; i++) {
			 map[i] = reader.readLine().split(" ");
		}

		new Picture().solution(n, m, map);
	}

	public void solution(int n, int m, String[][] map) {
		boolean[][] visit = new boolean[n][m];
		int count = 0;
		int maxSize = 0;

		for (int i = 0; i < n; i++) {
			for (int j = 0; j < m; j++) {
				if (visit[i][j]) {
					continue;
				}

				visit[i][j] = true;
				if (map[i][j].equals("0")) {
					continue;
				}

				int size = findPicture(visit, i, j, map);

				if (size != 0) {
					count++;
					maxSize = maxSize > size ? maxSize : size;
				}
			}
		}

		System.out.println(count);
		System.out.println(maxSize);
	}

	public int findPicture(boolean[][] visit, int y, int x, String[][] map) {
		Queue<Point> points = new LinkedList<>();
		points.add(new Point(y,x));
		int maxSize = 0;

		while (!points.isEmpty()) {
			Point current = points.remove();

			maxSize++;
			for (int i = 0; i < DIR.length; i++) {
				int nextY = DIR[i][0] + current.y;
				int nextX = DIR[i][1] + current.x;

				if (outOfRange(map.length, map[0].length, nextY, nextX)) {
					continue;
				}

				if (visit[nextY][nextX]) {
					continue;
				}

				if (map[nextY][nextX].equals("1")) {
					points.add(new Point(nextY, nextX));
				}

				visit[nextY][nextX] = true;
			}
		}

		return maxSize;
	}

	public boolean outOfRange(int maxY, int maxX, int y, int x) {
		return y < 0 || y >= maxY || x < 0 || x >= maxX;
	}

	class Point {
		int y;
		int x;

		public Point(int y, int x) {
			this.y = y;
			this.x = x;
		}
	}
}


