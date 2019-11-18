package scheduling;

class ReserveEvaluator implements Evaluator {

    private ReservedTimeSlot[] reserved;

    public ReserveEvaluator(ReservedTimeSlot[] r) {
        reserved = r;
    }

    @Override
    public double evaluate(Schedule s) {
        TimeRange[][] timeTable = s.getTimeTable();
        double cost = 0;
        for (int i = 0; i < 7; i++) { // iter over days
            for(ReservedTimeSlot r : reserved) // for all the reserved slots
            {
                boolean statisfied = false;
                for (int j = 0; j < timeTable[i].length - 1; j++) { // all breaks
                    TimeRange currBreak = new TimeRange(timeTable[i][j].end, timeTable[i][j + 1].start);
                    if(r.satisifies(currBreak)) // if is satisfied
                    {
                        statisfied = true;
                        break;
                    }
                }
                if(!statisfied)
                {
                    cost += r.weight;
                }
            }
        }
        return cost;
    }
}
