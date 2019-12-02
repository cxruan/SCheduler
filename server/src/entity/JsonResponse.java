package entity;

import com.google.gson.Gson;

public class JsonResponse {
	public JsonResponse(String type, String message)
	{
		this.type = type;
		this.message = message;		
	}
	
	public String type = null, message = null;
	
    public String toJson()
    {
    	Gson gson = new Gson();
    	return gson.toJson(this);
    }
}
