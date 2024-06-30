package org.example.bj;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class LostBrackets {

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		String expression = br.readLine();

		new LostBrackets().solution(expression);
	}

	private void solution(String expression) {
		StringBuilder sb = new StringBuilder();

		boolean minusStart = false;
		int result = 0;
		for (int i = 0; i < expression.length(); i++) {
			if (expression.charAt(i) >= '0' && expression.charAt(i) <= '9') {
				sb.append(expression.charAt(i));
				continue;
			}

			if (!sb.isEmpty()) {
				result = calc(result, sb.toString(), minusStart);
				sb = new StringBuilder();
			}

			if (expression.charAt(i) == '-') {
				minusStart = true;
			}
		}

		if (sb.length() != 0) {
			result = calc(result, sb.toString(), minusStart);
		}

		System.out.println(result);
	}

	private int calc(int result, String data, boolean minusStart) {
		if (minusStart) {
			return  result - Integer.parseInt(data.toString());
		}

		return result + Integer.parseInt(data.toString());
	}
}
