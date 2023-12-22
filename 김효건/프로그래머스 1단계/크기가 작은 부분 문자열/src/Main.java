public class Main {

	public static class substringSamllNum {
		public int solution(String t, String p) {
			int length = p.length();
			Integer num = Integer.parseInt(p);
			int answer = 0;

			for (int i=0; i<t.length()- length + 1; i++){
				Integer compare = Integer.parseInt(t.substring(i, i+length));
				if (compare <= num) {
					answer++;
				}
			}
			return answer;
		}

		public static void main(String[] args) {
			substringSamllNum substringSamllNum = new substringSamllNum();
			System.out.println(substringSamllNum.solution("3141592", "271"));  // 2
			System.out.println(substringSamllNum.solution("500220839878", "7"));  // 8
			System.out.println(substringSamllNum.solution("10203", "15"));  // 3
		}
	}
}