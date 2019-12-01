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

import entity.BroadcastResponse;
import repositories.DatabaseManager;
import scheduling.Schedule;

// https://stackoverflow.com/questions/21888425/accessing-servletcontext-and-httpsession-in-onmessage-of-a-jsr-356-serverendpo

@ServerEndpoint(value="/api/broadcast-schedules", configurator=ServletAwareConfig.class)
public class WSEndpoint {
	
    private Session websocketSession;
    HttpSession httpSession = null;
    private static Set<WSEndpoint> endpoints = new CopyOnWriteArraySet<WSEndpoint>();
    
    private EndpointConfig config;
    
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

    @OnMessage
    public void onMessage(String message) {
    	String username = (String)httpSession.getAttribute("username");
    	if(username != null)
    	{
    		Schedule s = Schedule.fromJson(message);
    		
    		if(s != null && s.isValid())
    		{
    			BroadcastResponse bRes = null;
    			if(!s.inDatabase)
    			{
    				int pk = DatabaseManager.addSchedule(username, s.toJson(), true);
    				bRes = new BroadcastResponse("BROADCAST", Integer.toString(pk));
    			}
    			else
    			{
    				bRes = new BroadcastResponse("BROADCAST", Integer.toString(s.id));
    			}
        		for(WSEndpoint wse : endpoints)
                {
        			if(!wse.equals(this))
        			{
                    	wse.sendMessage(bRes.toJson());	
        			}
                }
        		sendMessage(new BroadcastResponse("OK", null).toJson()); 
    		}
    		else
    		{
    			sendMessage(new BroadcastResponse("ERROR", "invalid request").toJson()); 
    		}

    	}
    	else
    	{
    		sendMessage(new BroadcastResponse("ERROR", "not logged in").toJson()); 
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
