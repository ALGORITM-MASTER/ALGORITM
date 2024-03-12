package org.example.level3;

import java.util.*;
import java.util.stream.*;

public class BestAlbum {
	public int[] solution(String[] genres, int[] plays) {
		int[] answer = {};

		Map<String, Genre> genreMap = new HashMap<>();

		for (int i = 0; i < genres.length; i++) {
			put(genreMap, genres[i], plays[i], i);
		}

		List<Genre> genreList = genreMap.values().stream()
			.sorted((genre1, genre2) -> genre1.totalViews < genre2.totalViews ? 1 : -1)
			.collect(Collectors.toList());

		List<Integer> results = new ArrayList<>();
		for (Genre genre : genreList) {
			List<Integer> best = genre.best();
			if (!Objects.isNull(best)) {
				results.addAll(best);
			}
		}

		return results.stream()
			.mapToInt(Integer::intValue)
			.toArray();
	}

	private void put(Map<String, Genre> genreMap, String genreString, int play, int id) {
		Genre genre;
		if (!genreMap.containsKey(genreString)) {
			genre = new Genre(genreString);
			genreMap.put(genreString, genre);
		} else {
			genre = genreMap.get(genreString);
		}

		genre.addRecord(new Record(id, play));
	}

	class Genre {
		public String genre;
		public PriorityQueue<Record> records = new PriorityQueue<>();
		public int totalViews;

		public Genre(String genre) {
			this.genre = genre;
			this.totalViews = 0;
		}

		public List<Integer> best() {
			List<Integer> result = new ArrayList<>();
			int count = 0;

			while (!records.isEmpty() && count < 2) {
				result.add(records.remove().id);
				count++;
			}

			return result;
		}

		public void addRecord(Record record) {
			this.totalViews += record.views;
			records.add(record);
		}

		@Override
		public boolean equals(Object object) {
			if (Objects.isNull(object)) {
				return false;
			}

			if (!(object instanceof Genre)) {
				return false;
			}

			Genre genre = (Genre) object;
			return genre.genre == this.genre;
		}

		@Override
		public int hashCode() {
			return Objects.hash(genre);
		}
	}

	class Record implements Comparable<Record> {
		public int id;
		public int views;

		public Record(int id, int views) {
			this.id = id;
			this.views = views;
		}

		@Override
		public int compareTo(Record record) {
			if (views < record.views) {
				return 1;
			} else if (views > record.views) {
				return -1;
			}

			return id > record.id ? 1 : -1;
		}
	}
}