package scheduling;

class LateEvaluator implements Evaluator {
    private int end;
    private double weight;

    public LateEvaluator(int e, double w)
    {
        end = e;
        weight = w;
    }

    @Override
    public double evaluate(Schedule s) {
        TimeRange[][] timeTable = s.getTimeTable();
        double cost = 0;
        for (int i = 0; i < 7; i++) {
            int lastSectionEnds = timeTable[i].length > 0 ? timeTable[i][timeTable[i].length - 1].end : 0;
            if (lastSectionEnds > end) {
                cost += weight * (lastSectionEnds - end);
            }
        }
        return cost;
    }
}
