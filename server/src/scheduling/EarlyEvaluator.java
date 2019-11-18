package scheduling;

class EarlyEvaluator implements Evaluator {
    private int start;
    private double weight;

    public EarlyEvaluator(int s, double w)
    {
        start = s;
        weight = w;
    }

    @Override
    public double evaluate(Schedule s) {
        TimeRange[][] timeTable = s.getTimeTable();
        double cost = 0;
        for (int i = 0; i < 7; i++) {
            int firstSectionBegins = timeTable[i].length > 0 ? timeTable[i][0].start : 24 * 60;
            if(firstSectionBegins < start)
            {
                cost += weight * (start - firstSectionBegins);
            }
        }
        return cost;
    }
}
