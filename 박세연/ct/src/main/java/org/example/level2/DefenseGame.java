package org.example.level2;

import java.util.*;

public class DefenseGame {

	public int solution(int n, int k, int[] enemy) {
		int lastIndex = 0;
		int remain = n;

		PriorityQueue<Integer> sortedBigEnemy =  new PriorityQueue<>(Collections.reverseOrder());

		while (lastIndex < enemy.length) {
			// 남아있는 병사 수 >= 적
			if (enemy[lastIndex] <= remain) {
				remain -= enemy[lastIndex];
				sortedBigEnemy.add(enemy[lastIndex]);
				lastIndex++;
				continue;
			}

			// 남아있는 병사 수 < 적
			// 무적권 없다
			if (k == 0) {
				break;
			}

			// 무적권이 있다.
            /*
              리스트가 비어있다 = 모든 값을 넣었단느 것, 근데 남은 병수의 수가 적보다 적다? 무적권을 사용해야한다.
              리스트가 있다. = 이전에 최고 값이 있다.
                - 현재 적과 이전 최고 값 중 하나에 무적권을 사용해야 한다.
                - 현재 적 > 이전 최고 값 = 현재 적에 무적권 사용, 이전 값 그대로 놔둠
                - 이전 최고 값 > 현재 적 = 이전 최고 값에 무적권 사용, remain 복구, 현재 값은 더해준다.
            */
			if (!sortedBigEnemy.isEmpty() && sortedBigEnemy.peek() > enemy[lastIndex]) {
				remain = remain + (sortedBigEnemy.poll() - enemy[lastIndex]);
				sortedBigEnemy.add(enemy[lastIndex]);
			}

			k--;
			lastIndex++;
		}

		return lastIndex;
	}
}
