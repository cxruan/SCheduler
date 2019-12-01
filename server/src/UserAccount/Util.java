package UserAccount;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Util 
{
	private static String DEFAULT_ENCODING = "UTF-8";
	private static String SHA_256 = "SHA-256";
	
	public static String sha256Digest(String str) 
	{
		return digest(str, SHA_256, DEFAULT_ENCODING);
		
	}
	
	public static String bytesToHex(byte[] hash) 
	{
		StringBuffer hexString = new StringBuffer();
		for (int i = 0; i < hash.length; i++) 
		{
			String hex = Integer.toHexString(0xff & hash[i]);
			if (hex.length() == 1)
				hexString.append('0');
			hexString.append(hex);
		}
		return hexString.toString();
	}
	
	public static String Str2HexHash(String str) 
	{
		MessageDigest digest = null;
		
		try
		{
			digest = MessageDigest.getInstance("SHA-256");
		}
		catch (NoSuchAlgorithmException e)
		{
			System.out.println(e.getMessage());
			return null;
		}
		
		byte[] encodedhash = digest.digest(str.getBytes(StandardCharsets.UTF_8));
		return bytesToHex(encodedhash);
	}
	
	public static String digest(String str, String alg, String charencoding) 
	{
		try 
		{
			byte[] data = str.getBytes(charencoding);
			MessageDigest md = MessageDigest.getInstance(alg);
			return bytesToHex(md.digest(data));
		} 
		catch (Exception var5) 
		{
			throw new RuntimeException("digest fail!", var5);
		}
	}
}
