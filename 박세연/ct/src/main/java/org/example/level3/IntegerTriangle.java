package org.example.level3;

public class IntegerTriangle {
	public int solution(int[][] triangle) {
		int answer = 0;

		int[][] result = new int[triangle.length][triangle.length];

		result[0][0] = triangle[0][0];
		for (int i = 1; i < triangle.length; i++) {
			result[i][0] = result[i-1][0] + triangle[i][0];
			for (int j = 1; j < triangle[i].length; j++) {
				int a = result[i-1][j] + triangle[i][j];
				int b = result[i-1][j-1] + triangle[i][j];

				result[i][j] = a > b ? a : b;
			}
		}

		int max = result[triangle.length-1][0];
		for (int i = 1; i < triangle.length; i++) {
			max = max > result[triangle.length-1][i] ? max :result[triangle.length-1][i];
		}
		return max;
	}
}
