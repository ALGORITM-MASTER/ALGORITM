package org.example.level2;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.params.provider.Arguments.*;

import java.util.stream.Stream;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.MethodSource;
import org.junit.jupiter.params.provider.ValueSource;

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
}