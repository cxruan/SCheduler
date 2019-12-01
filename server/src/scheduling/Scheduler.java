package scheduling;

import java.util.ArrayList;
import java.util.PriorityQueue;
import java.util.Collections;
import com.google.gson.Gson;

import scheduling.json.RequestJson;
import scheduling.json.ReservedSetting;
import scheduling.json.SchedulingResponse;

public class Scheduler {

    static final public int MAX_SCHEDULE_COUNT = 50;
    
    private Evaluator early, late, breaks, reserved;
    private Course[] courses;

    public SchedulingResponse makeSchedules(String json) {
    	
        RequestJson request = RequestJson.deserialize(json);
        
        SchedulingResponse response = new SchedulingResponse();
        
        if(request == null)
        {
        	response.error = "malformed request";
        	return response;
        }
        
        Schedule[] schedules = null;
        
        if(request.courses == null)
        {
        	response.error = "missing courses attribute";
        	return response;
        }
        courses = request.courses;
        
        if(request.preferences == null)
        {
        	response.error = "missing preferences attribute";
        	return response;
        }
        if(request.preferences.early == null || 
        		request.preferences.late == null || 
        		request.preferences.breaks == null || 
        		request.preferences.reserved == null)
        {
        	response.error = "incomplete preferences setting";
        	return response;
        }
        
        early = new EarlyEvaluator(request.preferences.early.time, request.preferences.early.weight);
        late = new LateEvaluator(request.preferences.late.time, request.preferences.late.weight);
        ArrayList<ReservedTimeSlot> reservedArrayList = new ArrayList<ReservedTimeSlot>();
        for (ReservedSetting rs : request.preferences.reserved) {
            reservedArrayList.add(new ReservedTimeSlot(rs.start, rs.end, rs.length, rs.weight));
        }
        ReservedTimeSlot[] reservedSlots = reservedArrayList.toArray(new ReservedTimeSlot[] {});
        breaks = new BreakEvaluator(request.preferences.breaks.time, request.preferences.breaks.weight, reservedSlots);
        reserved = new ReserveEvaluator(reservedSlots);

        ArrayList<Section> selected = new ArrayList<Section>();
        ArrayList<ArrayList<TimeRange>> timeTable = new ArrayList<ArrayList<TimeRange>>(7);
        for(int i = 0; i < 7; i++)
        {
        	timeTable.add(new ArrayList<TimeRange>());
        }
        PriorityQueue<Schedule> schedulesQueue = new PriorityQueue<Schedule>();

        solve(0, 0, selected, timeTable, schedulesQueue);

        ArrayList<Schedule> results = new ArrayList<Schedule>();

        while (!schedulesQueue.isEmpty()) {
            results.add(schedulesQueue.remove());
        }
        Collections.reverse(results);
        for(int i = 0; i < results.size(); i++)
        {
        	results.get(i).id = i + 1;
        }

        response.results = results.toArray(new Schedule[] {});
        
        return response;
    }

    private void solve(int courseNum, int componentNum, ArrayList<Section> selected,
            ArrayList<ArrayList<TimeRange>> timeTable, PriorityQueue<Schedule> schedulesQueue) {
        if (courseNum >= courses.length) {
            Schedule s = new Schedule(selected.toArray(new Section[] {}));
            s.early = early.evaluate(s);
            s.late += late.evaluate(s);
            s.breaks += breaks.evaluate(s);
            s.reserved += reserved.evaluate(s);
            s.total = s.early + s.late + s.breaks + s.reserved;

            if (schedulesQueue.size() < MAX_SCHEDULE_COUNT) {
                schedulesQueue.add(s);
            } else {
                schedulesQueue.add(s);
                schedulesQueue.remove();
            }

            return;
        }
        if (componentNum >= courses[courseNum].elements.length) {
            solve(courseNum + 1, 0, selected, timeTable, schedulesQueue);
            return;
        }

        for (Section curr : courses[courseNum].elements[componentNum].elements) {

            if (!curr.include)
                continue;
                
            boolean valid = true;
            for (int day : curr.days) {
                int index = Collections.binarySearch(timeTable.get(day - 1), curr.time);
                if (index >= 0) {
                    valid = false;
                    break;
                } else {
                    int insertAt = -(index + 1);
                    if (insertAt > 0 && timeTable.get(day - 1).get(insertAt - 1).overlaps(curr.time)) {
                        valid = false;
                        break;
                    }
                    if (insertAt < timeTable.get(day - 1).size()
                            && timeTable.get(day - 1).get(insertAt).overlaps(curr.time)) {
                        valid = false;
                        break;
                    }
                }
            }
            if (valid) {
                selected.add(curr);
                for (int day : curr.days) {
                    int index = Collections.binarySearch(timeTable.get(day - 1), curr.time);
                    int insertAt = -(index + 1);
                    timeTable.get(day - 1).add(insertAt, curr.time);
                }

                solve(courseNum, componentNum + 1, selected, timeTable, schedulesQueue);

                selected.remove(selected.size() - 1);
                for (int day : curr.days) {
                    timeTable.get(day - 1).remove(curr.time);
                }
            }
        }
    }

    public String makeJsonSchedules(String json) {

    	SchedulingResponse result = makeSchedules(json);

        Gson gson = new Gson();

        return gson.toJson(result);
    }
}
