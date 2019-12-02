package scheduling;

class BreakEvaluator implements Evaluator {
    private int length;
    private double weight;
    private ReservedTimeSlot[] reserved;

    public BreakEvaluator(int l, double w, ReservedTimeSlot[] r)
    {
        length = l;
        weight = w;
        reserved = r;
    }

    public double evaluate(Schedule s) {
        TimeRange[][] timeTable = s.getTimeTable();
        double cost = 0;
        for (int i = 0; i < 7; i++) {
            for (int j = 0; j < timeTable[i].length - 1; j++) {
                TimeRange currBreak = new TimeRange(timeTable[i][j].end, timeTable[i][j + 1].start);
                boolean isReserved = false;
                for (ReservedTimeSlot r : reserved) {
                    if (r.satisifies(currBreak)) {
                        isReserved = true;
                        break;
                    }
                }
                if (isReserved)
                    continue;
                int breakLen = currBreak.length();
                if(breakLen > length)
                {
                    cost += weight * (breakLen - length);
                }
            }
        }
        return cost;
    }
}
