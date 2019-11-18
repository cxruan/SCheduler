package scheduling;

class ReservedTimeSlot {
    TimeRange range;
    int length;
    double weight;

    ReservedTimeSlot(int start, int end, int len, double wei)
    {
        range = new TimeRange(start, end);
        length = len;
        weight = wei; 
    }

    boolean satisifies(TimeRange r)
    {
        return r.overlaps(range) && r.length() >= length;
    }
}
