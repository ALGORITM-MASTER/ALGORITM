package org.example.level2;

import java.util.*;

public class Recochatrobot {

	public static int solution(String[] board) {
		Solution solution = new Solution();
		return solution.solution(board);
	}
}


/**
 * findPoint : 100 * 100 = 10000
 * BFS
 */
class Solution {
	public int solution(String[] board) {
		Point startPoint = findStartPoint(board);

		return min(board, startPoint);
	}

	private int min(String[] board, Point startPoint) {
		int[][] direction = {{1, 0}, {0, 1}, {-1, 0}, {0, -1}};

		Set<Point> visit = new HashSet<>();
		visit.add(startPoint);
		Deque<Point> find = new LinkedList<>();
		find.add(startPoint);

		while (!find.isEmpty()) {
			Point point = find.pop();

			for (int[] dir : direction) {
				Point newPoint = move(board, dir, point);

				if (newPoint == null || visit.contains(newPoint)) {
					continue;
				}

				if (board[newPoint.y].charAt(newPoint.x) == 'G'){
					return newPoint.count;
				}

				find.add(newPoint);
				visit.add(newPoint);
			}
		}

		return -1;
	}

	private Point move(String[] board, int[] dir, Point initPoint) {
		int index = 1;
		int maxY = board.length;
		int maxX = board[0].length();

		while (true) {
			int nextX = initPoint.x + dir[1] * index;
			int nextY = initPoint.y + dir[0] * index;
			index++;

			if (outOfRange(nextY, nextX, maxY, maxX) || board[nextY].charAt(nextX) == 'D') {
				return new Point(nextY - dir[0], nextX - dir[1], initPoint.count + 1);
			}
		}
	}

	private boolean outOfRange(int y, int x, int maxY, int maxX) {
		return x < 0 || y < 0
			|| x >= maxX || y >= maxY;
	}

	private Point findStartPoint(String[] board) {
		for (int  i = 0; i < board.length; i++) {
			for (int j = 0; j < board[i].length(); j++) {
				if (board[i].charAt(j) == 'R') {
					return new Point(i, j,0);
				}
			}
		}

		return null;
	}
}

class Point {
	public int x;
	public int y;
	public int count = 0;

	public Point(int y, int x, int count) {
		this.y = y;
		this.x = x;
		this.count = count;
	}

	@Override
	public boolean equals(Object obj) {
		Point point = (Point) obj;
		return point.x == x && point.y == y;
	}

	@Override
	public int hashCode() {
		int prime = 31;
		int result = 1;
		return (result * prime * x) * prime + y;
	}
}