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

	// The schedule to be published is sent as a websocket message.
    @OnMessage
    public void onMessage(String message) {
    	String username = null;
    	if(httpSession != null) {
    		username = (String)httpSession.getAttribute("username");
    	}
    	if(username != null)
    	{
    		Schedule s = Schedule.fromJson(message);
    		
    		if(s != null)
    		{
    			s.username = username;
    			WSResponse bRes = null;
    			
				if(DatabaseManager.setPublic(username, s.id) > 0)
				{
					bRes = new WSResponse(username, s.id, s.scheduleName);
					sendMessage(new WSResponse().toJson()); 
				}
				else
				{
					sendMessage(new WSResponse("Username does not match").toJson());
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
    			}
    		}
    		else
    		{
    			sendMessage(new WSResponse("Invalid request.").toJson()); 
    		}

    	}
    	else
    	{
    		sendMessage(new WSResponse("You must login first.").toJson()); 
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

class WSResponse {
	public WSResponse(String username, int scheduleId, String scheduleName)
	{
		this.status = "success";
		this.username = username;
		this.scheduleId = scheduleId;
		this.scheduleName = scheduleName;
	}
	
	public WSResponse(String message)
	{
		this.status = "error";
		this.message = message;
	}
	
	public WSResponse()
	{
		this.status = "ok";
	}
	
	String status, username, scheduleName, message;
	int scheduleId;
	
    public String toJson()
    {
    	Gson gson = new Gson();
    	return gson.toJson(this);
    }
}
