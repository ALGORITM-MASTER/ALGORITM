package org.example.level3;

import java.util.*;

public class Camera {
	public int solution(int[][] routes) {
		List<Range> ranges = setRanges(routes);

		if (ranges.size() == 1) {
			return 1;
		}

		ranges.sort((range1, range2) -> {
			if (range1.start() != range2.start()) {
				return range1.start() - range2.start();
			}

			return range1.end() - range2.end();
		});

		return updateRanges(ranges);
	}

	public int updateRanges(List<Range> ranges) {
		Stack<Range> stacks = new Stack<>();
		stacks.add(ranges.get(0));

		for (int i = 1; i < ranges.size(); i++) {
			Range comp = ranges.get(i);
			Range peek = stacks.peek();

			if (contain(comp, peek)) {
				if (peek.start() < comp.start()) {
					peek.updateStart(comp.start());
				}
				if (peek.end() > comp.end()) {
					peek.updateEnd(comp.end());
				}

				continue;
			}

			stacks.add(comp);
		}

		return stacks.size();
	}

	private boolean contain(Range comp, Range origin) {
		return origin.end() >= comp.start();
	}

	public List<Range> setRanges(int[][] routes) {
		List<Range> ranges = new ArrayList<>();

		for (int[] route : routes) {
			ranges.add(new Range(route[0], route[1]));
		}

		return ranges;
	}

	class Range {
		private int start;
		private int end;

		public Range(int start, int end) {
			this.start = start;
			this.end = end;
		}

		public int start() {
			return start;
		}

		public int end() {
			return end;
		}

		public void updateStart(int newStart) {
			this.start = newStart;
		}

		public void updateEnd(int newEnd) {
			this.end = newEnd;
		}

		public String toString() {
			return start+":"+end;
		}
	}
}
