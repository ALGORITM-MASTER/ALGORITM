package org.example.bj;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SharkSchool {

	private static int[][] DIR = new int[][]{{-1, 0}, {0, -1}, {1, 0}, {0, 1}};

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		int N = Integer.parseInt(br.readLine());
		int total = N * N;
		String[][] students = new String[total][5];
		for (int i = 0; i < total; i++) {
			students[i] = br.readLine().split(" ");
		}

		new SharkSchool().solution(N, students);
	}

	public void solution(int N, String[][] students) {
		String[][] room = new String[N][N];

		for (String[] row : students) {
			List<Point> points = mostLikeSpace(room, row);
			if (points.size() == 1) {
				room[points.get(0).y][points.get(0).x] = row[0];
				continue;
			}

			points = mostEmptySpace(room, points);

			room[points.get(0).y][points.get(0).x] = row[0];
		}

		Map<String, String[]> likeMap = new HashMap<>();
		for (String[] row : students) {
			likeMap.put(row[0], row);
		}
		System.out.println(sum(room, likeMap));
	}

	private int sum(String[][] room, Map<String, String[]> likeMap) {

		int total = 0;
		for (int i = 0; i < room.length; i++) {
			for (int j = 0; j < room[i].length; j++) {
				int likeCount = nearLike(room, i, j, likeMap.get(room[i][j]));
				switch (likeCount) {
					case 0: total += 0; break;
					case 1: total += 1; break;
					case 2: total += 10; break;
					case 3: total += 100; break;
					case 4: total += 1000; break;
				}
			}
		}

		return total;
	}

	private List<Point> mostLikeSpace(String[][] room, String[] row) {
		List<Point> points = new ArrayList<>();
		int maxCount = 0;
		for (int i = 0; i < room.length; i++) {
			for (int j = 0; j < room[i].length; j++) {
				if (!(room[i][j] == null || room[i][j].isEmpty())) {
					continue;
				}

				int count = nearLike(room, i, j, row);
				if (count < maxCount) {
					continue;
				}

				if (count > maxCount) {
					maxCount = count;
					points = new ArrayList<>();
				}
				points.add(new Point(i, j));
			}
		}

		return points;
	}

	private int nearLike(String[][] room, int y, int x, String[] row) {
		int count = 0;
		for (int[] dir : DIR) {
			int nextY = y + dir[0];
			int nextX = x + dir[1];

			if (outOfRange(room.length, nextY, nextX)) {
				continue;
			}

			count = isLike(row, room[nextY][nextX]) ? count + 1 : count;
		}
		return count;
	}

	private boolean isLike(String[] row, String comparePerson) {
		for (int i = 1; i < row.length; i++) {
			if (row[i].equals(comparePerson)) {
				return true;
			}
		}
		return false;
	}

	private List<Point> mostEmptySpace(String[][] room, List<Point> points) {
		List<Point> result = new ArrayList<>();
		int maxCount = 0;
		for (Point point : points) {
			int count = nearCount(room, point.y, point.x);

			if (count < maxCount) {
				continue;
			}

			if (count > maxCount) {
				maxCount = count;
				result = new ArrayList<>();
			}
			result.add(new Point(point.y, point.x));
		}

		return result;
	}

	private int nearCount(String[][] room, int y, int x) {
		int count = 0;
		for (int[] dir : DIR) {
			int nextY = y + dir[0];
			int nextX = x + dir[1];

			if (outOfRange(room.length, nextY, nextX)) {
				continue;
			}

			if (room[nextY][nextX] == null || room[nextY][nextX].isEmpty()) {
				count++;
			}
		}
		return count;
	}

	private boolean outOfRange(int N, int y, int x)	{
		return N <= y || y < 0 || x >= N || x < 0;
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
