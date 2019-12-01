package servlets;

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
        System.out.println(websocketSession.getId() + "Connected.");
    }

    @OnMessage
    public void onMessage(String message) {
        System.out.println(message);
        for(WSEndpoint wse : endpoints)
        {
        	wse.sendMessage(message);
        }
    }
 
    @OnClose
    public void onClose(Session session) throws IOException {
    	 endpoints.remove(this);
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
