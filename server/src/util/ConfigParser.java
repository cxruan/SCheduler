package util;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Properties;

public class ConfigParser {
	String DBconnection;
	String DBusername;
	String DBpassword;
	
	public ConfigParser(String filename) {
		FileReader reader = null;
		Properties property = null;
		try {
			reader = new FileReader(filename);
			property = new Properties();
			property.load(reader);
			DBconnection = property.getProperty("DBconnection");
			DBusername = property.getProperty("DBusername");
			DBpassword = property.getProperty("DBpassword");
		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	
	public String GetURL() {
		return DBconnection + "&user=" + DBusername + 
				"&password=" + DBpassword;
	}
}
