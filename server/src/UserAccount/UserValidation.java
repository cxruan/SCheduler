package UserAccount;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

import entity.Credential;
import repositories.DatabaseManager;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.mysql.jdbc.PreparedStatement;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/UserValidation")
public class UserValidation extends HttpServlet 
{
	private static final long serialVersionUID = 1L;
	
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		HttpSession session = request.getSession();
		Status status = new Status();
		GsonBuilder builder = new GsonBuilder();
		builder.setPrettyPrinting();
		Gson gson = builder.create();
		
		boolean next = true;
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		
		if(username.isEmpty())
		{
			status.setSuccess(false);
			status.setMessage("Username cannot be blank.");
			next = false;
		}
		
		if(password.isEmpty()&&next)
		{
			status.setSuccess(false);
			status.setMessage("Password cannot be blank.");
			next = false;
		}
		
		String test = "test";
		boolean ValidUser = DatabaseManager.validateUsername(test);
		System.out.println("username: "+test);
		System.out.println("valid user123: "+ValidUser);
		
		if(next)
		{
			if(ValidUser)
			{
				Credential cr = DatabaseManager.getHashAndSalt(username);
				boolean Validpassword = cr.getHash().equals(Util.sha256Digest(password + cr.getSalt()));
				
				if(Validpassword)
				{
					status.setSuccess(true);
					status.setMessage("Success");
					session.setAttribute("username", username);
				}
				else
				{
					status.setSuccess(false);
					status.setMessage("Password is wrong");
				}
			}
			else
			{
				status.setSuccess(false);
				status.setMessage("User does not exist.");
			}
		}
		
		String json = gson.toJson(status);
		response.getWriter().append(json);
	}
}
















