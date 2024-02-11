package org.example.level2;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.params.provider.Arguments.*;

import java.util.stream.Stream;

import org.assertj.core.api.Assertions;
import org.example.level3.BestSet;
import org.example.level3.DoublePriorityqueue;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class Level3Test {

	@DisplayName("최고의 집합")
	@MethodSource("parametersProvider")
	@ParameterizedTest
	void 최고의_집합_테스트(int n, int s, int[] result) {
		BestSet bestSet = new BestSet();
		assertThat(bestSet.solution(n,s)).isEqualTo(result);
	}

	Stream<Arguments> parametersProvider() {
		return Stream.of(
			arguments(2, 9, new int[] {4, 5}),
			arguments(2, 1, new int[] {-1}),
			arguments(2, 8, new int[] {4, 4})
		);
	}

	@DisplayName("")
	@MethodSource("doublePriorityProvider")
	@ParameterizedTest
	void double_queue(String[] operations, int[] answer) {
	    // Given
		DoublePriorityqueue doublePriorityQueue = new DoublePriorityqueue();

		// When
		int[] result = doublePriorityQueue.solution(operations);

	    // Then
		Assertions.assertThat(result).isEqualTo(answer);
	}

	Stream<Arguments> doublePriorityProvider() {
		return Stream.of(
			arguments(new String[] {"I 16", "I -5643", "D -1", "D 1", "D 1", "I 123", "D -1"}, new int[] {0,0}),
			arguments(new String[] {"I -45", "I 653", "D 1", "I -642", "I 45", "I 97", "D 1", "D -1", "I 333"}, new int[]{333, -45})
		);
	}
}
