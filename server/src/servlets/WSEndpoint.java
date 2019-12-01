package servlets;


import java.io.IOException;
import java.util.HashMap;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpSession;
import javax.websocket.EncodeException;
import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
//import javax.websocket.me

@ServerEndpoint(value = "/api/broadcast-schedules", configurator=ServletAwareConfig.class)
public class WSEndpoint {
	
    private Session websocketSession;
    HttpSession httpSession;
    private static Set<WSEndpoint> endpoints = new CopyOnWriteArraySet<WSEndpoint>();
    private static HashMap<String, String> users = new HashMap<>();
    
    private EndpointConfig config;

    @OnOpen
    public void onOpen(Session websocketSession, EndpointConfig config) {
    	this.websocketSession = websocketSession;
        this.httpSession = (HttpSession) config.getUserProperties().get("httpSession");
        endpoints.add(this);
        System.out.println(websocketSession.getId() + "Connected.");
    }

    @OnMessage
    public void onMessage(String message) {
        System.out.println(message);
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
        	websocketSession.getBasicRemote().sendObject(message);
        } catch (IOException | EncodeException e) {
            e.printStackTrace();
        }
        
    }
}
