public class Solution {
    public static void main(String[] args) {
        System.out.println("Program started");
        // int listOfNumbers[] = { 1, 4, 3 };
        // int lowerBound = 1;
        // int upperBound = 4;

        int listOfNumbers[] = { 1003, 1001, 1000 };
        int lowerBound = 1000;
        int upperBound = 1003;
        int result = findMissingNumber(listOfNumbers, upperBound, lowerBound);
        System.out.println("Result: " + result);
    }

    /*
     * 
     * 1,2,3,4,5
     * 3
     * 1,2,4,5 <- removing 3
     * 1,4,2,5 <- shuffling
     * 
     * Lokesh's methods
     * 1.
     * Mathematical way
     * sum of series = n * (n+1) / 2 = 1 + 2 + ... + n
     * 
     * You take the sum of series:
     * l, l+1, l+2, ...., u
     * 
     * where l = lower bound
     * u = upper bound
     * 
     * So for example, if l = 1, u = 4
     * 
     * expected = 1 + 2 + 3 + 4
     * 
     * Now take the sum of the actual array
     * {1,4,3}
     * actual = 1 + 4 + 3
     * 
     * Now diff = expected - actual = missing no
     * 
     * expected = 1 + 2 + 3 + 4 = 10
     * actual = 1 + 4 + 3 = 8
     * missing no = expected - actual = 10 - 8 = 2
     * 
     * 2.
     * count sort
     * create
     * Place every element in its own bucket
     * 
     */

    static int findMissingNumber(int qPaper[], int upperBound, int lowerBound) {
        // upperBound = 10
        // lowerBound = 1
        // totalNos = upperBound - lowerBound + 1
        /*
         * pseudo code for the solution
         * 
         * loop on the arrayOfIntegers[]
         */

        // 1,2,3,4,5...totalNos
        // 51, 52, 53, ..., 100; totalNos = 50
        // old logic: 1,2,3,4,5,...,50 (50 numbers)

        // 1000, 1001, 1003
        // lb = 1000, ub = 1003, missing = 1002
        // totalNos = ub - lb + 1 = 1003 - 1000 + 1 = 4
        // answerPaper = 1000, 1001, 1002, 1003
        // lb + 0, lb+1 lb+2 lb+3
        int totalNos = upperBound - lowerBound + 1;
        int answerPaper[] = new int[totalNos];
        for (int i = 0; i < answerPaper.length; i++) {
            answerPaper[i] = i + lowerBound;
            // 1,2,3,4,5,6...totalNos

            // lower = 50, lowerBound = 51, upper =100
            // answerPaper: 51, 52, 53, 54, ..., 100
        }
        /*
         * // qPaper: 1003, 1001, 1000
         * // lb = 1000, ub = 1003, missing = 1002
         * // totalNos = ub - lb + 1 = 1003 - 1000 + 1 = 4
         * // answerPaper = 1000, 1001, 1002, 1003
         */
        for (int i = 0; i < qPaper.length; i++) {
            int qNo = qPaper[i];
            // cancel qNo from answerPaper
            // i=0 iteration
            // qNo = 1003
            // How to cancel 1003 from answerPaper
            // Where is 1003 in answerPaper?
            // answerPaper[j] = 1003 , what is j?
            // j = 3
            // answerPaper[3] = 1003
            // find a relationship between this 3 and 1003
            // How to get 3 from 1003 (qNo)
            // How to get 3 from qNo
            // lowerbound + j = qNo
            // j = qNo - lowerBound
            int j = qNo - lowerBound;
            answerPaper[j] = -1;

            // qPaper: 1003, 1001, 1000
            // answerPaper: 1000, 1001, 1002, 1003
            // i=0, qNo = 1003, j = 1003-1000 = 3
            // answerPaper[3] = -1
            // answerPaper: 1000, 1001, 1002, -1

            // i=1, qNo = 1001, j = 1001-1000 = 1
            // answerPaper[1] = -1
            // answerPaper: 1000, -1, 1002, -1

            // i=2, qNo = 1000, j = 1000-1000 = 0
            // answerPaper[0] = -1
            // answerPaper: -1, -1, 1002, -1

            // Last step: get the missing number
        }
        for (int i = 0; i < answerPaper.length; i++) {
            // find the remaining element from answer paper
            if (answerPaper[i] != -1) {
                return answerPaper[i];
            }
        }
        return 0;
    }
}

// Question paper

// 4,5,6,7,8 1,2,3,10

// Answer paper

// 1,2,3,4,5,6,7,8,9,10

// Algorithm:
// call numbers
// from question
// paper and
// cancel same
// number from
// answer paper

// Question paper

// 4,5,6,7,8 1,2,3,10

// Answer paper 1,2,3,[4],[5]6,7,8,__9__,10

// 2
// nd approach

// Question paper

// [4],[5],[6],[7],[8][1],[2],[3],
// 10