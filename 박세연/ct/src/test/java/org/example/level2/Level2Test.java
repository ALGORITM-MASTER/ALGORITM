package org.example.level2;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.params.provider.Arguments.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.MethodSource;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class Level2Test {

	@ParameterizedTest
	@MethodSource("parametersProvider")
	void 리코쳇_로봇_테스트(String[] board, int result) {
		assertThat(Recochatrobot.solution(board)).isEqualTo(result);
	}

	Stream<Arguments> parametersProvider() {
		return Stream.of(
			arguments(new String[] {"...D..R", ".D.G...", "....D.D", "D....D.", "..D...."}, 7),
			arguments(new String[] {".D.R", "....", ".G..", "...D"}, -1)
		);
	}

	@DisplayName("디펜스 게임 테스트")
	@ParameterizedTest
	@MethodSource("defense_gaem_parameter")
	void defense_game_test(int n, int k, int[] enemy, int result) {
		DefenseGame defenseGame = new DefenseGame();

		assertThat(defenseGame.solution(n, k, enemy)).isEqualTo(result);
	}

	Stream<Arguments> defense_gaem_parameter() {
		return Stream.of(
			arguments(7, 3, new int[] {4, 2, 4, 5, 3, 3, 1}, 5),
			arguments(2, 4, new int[] {3,3,3,3}, 4)
		);
	}


	@DisplayName("광물 캐기")
	@ParameterizedTest
	@MethodSource("mineral_param")
	void mineral(int[] picks, String[] minerals, int result) {
		assertThat(Mineral.solution(picks, minerals)).isEqualTo(result);
	}

	Stream<Arguments> mineral_param() {
		return Stream.of(
			arguments(new int[] {1, 3, 2},
				new String[] {"diamond", "diamond", "diamond", "iron", "iron", "diamond", "iron", "stone"},
				12),
			arguments(new int[] {0, 1, 1}, new String[] {"diamond", "diamond", "diamond", "diamond", "diamond",
				"iron", "iron", "iron", "iron", "iron", "diamond"},
				50)
		);
	}

	@DisplayName("두 원 사이의 정수 쌍")
	@ParameterizedTest
	@CsvSource("2, 3, 20")
	void two_circle_pair(int r1, int r2, int result) {
	    // Given, When, Then
		assertThat(TwoCirclePair.solution(r1,r2)).isEqualTo(result);
	}

	@DisplayName("우박수열 정적분")
	@ParameterizedTest
	@MethodSource("uParkIntegral_param")
	void uParkIntegral_test(int k, int[][] ranges, double[] result) {
	    // Given, When, Then
		assertThat(UParkIntegral.solution(k, ranges)).isEqualTo(result);
	}

	Stream<Arguments> uParkIntegral_param() {
		return Stream.of(
			arguments(5,new int[][] {{0,0}, {0,-1}, {2,-3}, {3,-3}},
				new double[] {33.0,31.5,0.0,-1.0}),
			arguments(3, new int[][] {{0,0}, {1,-2}, {3,-3}},
				new double[] {47.0,36.0,12.0})
		);
	}
}