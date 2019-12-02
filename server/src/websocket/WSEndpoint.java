package websocket;

import java.io.IOException;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.servlet.http.HttpSession;
import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import com.google.gson.Gson;

import entity.JsonResponse;
import repositories.DatabaseManager;
import scheduling.Schedule;

// https://stackoverflow.com/questions/21888425/accessing-servletcontext-and-httpsession-in-onmessage-of-a-jsr-356-serverendpo

@ServerEndpoint(value="/api/broadcast-schedules", configurator=ServletAwareConfig.class)
public class WSEndpoint {
	
    private Session websocketSession;
    HttpSession httpSession = null;
    private static Set<WSEndpoint> endpoints = new CopyOnWriteArraySet<WSEndpoint>();
    
      
    @OnOpen
    public void onOpen(Session websocketSession, EndpointConfig config) {
    	this.websocketSession = websocketSession;
    	if(config.getUserProperties().containsKey("httpSession"))
    	{
    		this.httpSession = (HttpSession) config.getUserProperties().get("httpSession");
    	}
        endpoints.add(this);
        System.out.println("WS: " + websocketSession.getId() + " connected.");
    }

	// The schedule to be published is sent as a websocket message. Whether if
	// the schedule needs to be saved into the database is determined by the
	// inDatabase attribute of the schedule. If inDatabase is false or missing
	// in the request, the schedule will be saved as a public schedule in the 
	// database, otherwise the corresponding schedule entry will be updated to
	// be public.
    @OnMessage
    public void onMessage(String message) {
    	String username = null;
    	if(httpSession != null) {
    		username = (String)httpSession.getAttribute("username");
    	}
    	if(username != null)
    	{
    		Schedule s = Schedule.fromJson(message);
    		
    		if(s != null && s.isValid())
    		{
    			s.username = username;
    			JsonResponse bRes = null;
    			if(!s.inDatabase)
    			{
    				int pk = DatabaseManager.addSchedule(username, s.toJson(true), true);
    				if(pk > 0)
    				{
    					bRes = new JsonResponse("scheduleID", new UsernameScheduleID(username, pk).toJson());
    				}
    				else
    				{
    					sendMessage(new JsonResponse("error", "cannot inset into table").toJson());
    				}
    			}
    			else
    			{
    				if(DatabaseManager.setPublic(username, s.id) > 0)
    				{
    					bRes = new JsonResponse("scheduleID", new UsernameScheduleID(username, s.id).toJson());
    				}
    				else
    				{
    					sendMessage(new JsonResponse("error", "username does not match").toJson());
    				}
    			}
    			if(bRes != null)
    			{
            		for(WSEndpoint wse : endpoints)
                    {
            			if(!wse.equals(this))
            			{
                        	wse.sendMessage(bRes.toJson());	
            			}
                    }
            		sendMessage(new JsonResponse("ok", null).toJson()); 
    			}
    		}
    		else
    		{
    			sendMessage(new JsonResponse("error", "invalid request").toJson()); 
    		}

    	}
    	else
    	{
    		sendMessage(new JsonResponse("error", "not logged in").toJson()); 
    	}      
    }
 
    @OnClose
    public void onClose(Session session) throws IOException {
    	 endpoints.remove(this);
    	 System.out.println("WS: " + websocketSession.getId() + " disconnected.");
    }
 
    @OnError
    public void onError(Throwable throwable) {
        throwable.printStackTrace();
    }
    
    private void sendMessage(String message)  {  
    	        
        try {
        	websocketSession.getBasicRemote().sendText(message);
        } catch (IOException e) {
            e.printStackTrace();
        }
        
    }
}

class UsernameScheduleID {
	public UsernameScheduleID(String username, int scheduleId)
	{
		username = this.username;
		scheduleId = this.scheduleId;
	}
	
	String username;
	int scheduleId;
	
    public String toJson()
    {
    	Gson gson = new Gson();
    	return gson.toJson(this);
    }
}
