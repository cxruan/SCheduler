package UserAccount;

import java.io.IOException;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import entity.Credential;
import repositories.DatabaseManager;

public class UserRegister extends HttpServlet
{
	private static final long serialVersionUID = 1L;
		
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		HttpSession session = request.getSession();
		Status status = new Status();
		GsonBuilder builder = new GsonBuilder();
		builder.setPrettyPrinting();
		Gson gson = builder.create();
		
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		String confirmation = request.getParameter("confirmation");
		
		if(username.trim().isEmpty())
		{
			status.setSuccess(false);
			status.setMessage("Username cannot be blank.");
		}
		
		if(password.trim().isEmpty())
		{
			status.setSuccess(false);
			status.setMessage("Password cannot be blank.");
		}
		
		if(confirmation.trim().isEmpty())
		{
			status.setSuccess(false);
			status.setMessage("You need to confirm password.");
		}
	
		
		if(!confirmation.trim().equals(password.trim()))
		{
			status.setSuccess(false);
			status.setMessage("Fail to confirm password.");
		}
		
		
		boolean ValidUser = DatabaseManager.validateUsername(username);
		
		if(ValidUser)
		{
			status.setSuccess(false);
			status.setMessage("User already exists.");
		}
		else
		{
			String salt = UUID.randomUUID().toString();
			String hash = Util.sha256Digest(password + salt);
			DatabaseManager.register(username, hash, salt);
			status.setSuccess(true);
			status.setMessage("Successs.");
			
			session.setAttribute("username", username);
		}
		
		String json = gson.toJson(status);
		response.getWriter().append(json);
	}
}









