package projectConfig;

public class ProjectConfig {
	static private int publicScheduleLimit = -1;
	static private final int defaultPublicScheduleLimit = 20;
	
	static public int getPublicScheduleLimit()
	{
		if(publicScheduleLimit < 0)
		{
			String limit = System.getenv("CS201_FINAL_PROJECT_PUBLIC_LIMIT");
			if(limit != null)
			{
				try
				{
					publicScheduleLimit = Integer.parseInt(limit);
				}
				catch(NumberFormatException nfe)
				{
					System.out.println(nfe.getMessage());
				}
			}
		}
		if(publicScheduleLimit < 0)
		{
			publicScheduleLimit = defaultPublicScheduleLimit;
		}
		return publicScheduleLimit;
	}
	
	static private int generateScheduleLimit = -1;
	static private final int defaultGenerateScheduleLimit = 20;
	
	static public int getGenerateScheduleLimit()
	{
		if(generateScheduleLimit < 0)
		{
			String limit = System.getenv("CS201_FINAL_PROJECT_GENERATE_LIMIT");
			if(limit != null)
			{
				try
				{
					generateScheduleLimit = Integer.parseInt(limit);
				}
				catch(NumberFormatException nfe)
				{
					System.out.println(nfe.getMessage());
				}
			}
		}
		if(generateScheduleLimit < 0)
		{
			generateScheduleLimit = defaultGenerateScheduleLimit;
		}
		return generateScheduleLimit;
	}
}
