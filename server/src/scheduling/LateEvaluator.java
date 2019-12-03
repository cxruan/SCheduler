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
            int lastSectionEnds = 0;
            for(int j = timeTable[i].length - 1; j >= 0; j--)
            {
            	if(timeTable[i][j] != null)
            	{
            		lastSectionEnds = timeTable[i][j].end;
            		break;
            	}
            }
            if (lastSectionEnds > end) {
                cost += weight * (lastSectionEnds - end);
            }
        }
        return cost;
    }
}
