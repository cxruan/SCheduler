

import scheduling.Scheduler;
import scheduling.json.RequestJson;

public class Test {

	public static void main(String[] args) {
		
		String json = "{\r\n" + 
				"    \"courses\": [{\r\n" + 
				"            \"name\": \"CSCI 201\",\r\n" + 
				"            \"elements\": [{\r\n" + 
				"                    \"name\": \"Lecture\",\r\n" + 
				"                    \"elements\": [{\r\n" + 
				"                            \"ID\": \"test1\",\r\n" + 
				"                            \"time\": {\r\n" + 
				"                                \"start\": 600,\r\n" + 
				"                                \"end\": 710\r\n" + 
				"                            },\r\n" + 
				"                            \"days\": [1, 3],\r\n" + 
				"                            \"include\": true,\r\n" + 
				"                            \"penalize\": true\r\n" + 
				"                        },\r\n" + 
				"                        {\r\n" + 
				"                            \"ID\": \"test2\",\r\n" + 
				"                            \"time\": {\r\n" + 
				"                                \"start\": 720,\r\n" + 
				"                                \"end\": 830\r\n" + 
				"                            },\r\n" + 
				"                            \"days\": [1, 3],\r\n" + 
				"                            \"include\": true,\r\n" + 
				"                            \"penalize\": true\r\n" + 
				"                        }\r\n" + 
				"                    ]\r\n" + 
				"                },\r\n" + 
				"                {\r\n" + 
				"                    \"name\": \"Lab\",\r\n" + 
				"                    \"elements\": [{\r\n" + 
				"                            \"ID\": \"test2\",\r\n" + 
				"                            \"time\": {\r\n" + 
				"                                \"start\": 600,\r\n" + 
				"                                \"end\": 710\r\n" + 
				"                            },\r\n" + 
				"                            \"days\": [2, 4],\r\n" + 
				"                            \"include\": true,\r\n" + 
				"                            \"penalize\": true\r\n" + 
				"                        },\r\n" + 
				"                        {\r\n" + 
				"                            \"ID\": \"test3\",\r\n" + 
				"                            \"time\": {\r\n" + 
				"                                \"start\": 720,\r\n" + 
				"                                \"end\": 830\r\n" + 
				"                            },\r\n" + 
				"                            \"days\": [2, 4],\r\n" + 
				"                            \"include\": true,\r\n" + 
				"                            \"penalize\": true\r\n" + 
				"                        }\r\n" + 
				"                    ]\r\n" + 
				"                }\r\n" + 
				"            ]\r\n" + 
				"        },\r\n" + 
				"        {\r\n" + 
				"            \"name\": \"CSCI 201\",\r\n" + 
				"            \"elements\": [{\r\n" + 
				"                    \"name\": \"Lecture\",\r\n" + 
				"                    \"elements\": [\r\n" + 
				"                        {\r\n" + 
				"                            \"ID\": \"test4\",\r\n" + 
				"                            \"time\": {\r\n" + 
				"                                \"start\": 600,\r\n" + 
				"                                \"end\": 710\r\n" + 
				"                            },\r\n" + 
				"                            \"days\": [5],\r\n" + 
				"                            \"include\": true,\r\n" + 
				"                            \"penalize\": true\r\n" + 
				"                        },\r\n" + 
				"                        {\r\n" + 
				"                            \"ID\": \"test5\",\r\n" + 
				"                            \"time\": {\r\n" + 
				"                                \"start\": 720,\r\n" + 
				"                                \"end\": 830\r\n" + 
				"                            },\r\n" + 
				"                            \"days\": [5],\r\n" + 
				"                            \"include\": true,\r\n" + 
				"                            \"penalize\": true\r\n" + 
				"                        }\r\n" + 
				"                    ]\r\n" + 
				"                }\r\n" + 
				"            ]\r\n" + 
				"        }\r\n" + 
				"    ],\r\n" + 
				"    \"preferences\": {\r\n" + 
				"        \"early\": {\r\n" + 
				"            \"time\": 600,\r\n" + 
				"            \"weight\": 100\r\n" + 
				"        },\r\n" + 
				"        \"late\": {\r\n" + 
				"            \"time\": 900,\r\n" + 
				"            \"weight\": 60\r\n" + 
				"        },\r\n" + 
				"        \"breaks\": {\r\n" + 
				"            \"time\": 10,\r\n" + 
				"            \"weight\": 90\r\n" + 
				"        },\r\n" + 
				"        \"reserved\": [{\r\n" + 
				"                \"start\": 690,\r\n" + 
				"                \"end\": 750,\r\n" + 
				"                \"length\": 45,\r\n" + 
				"                \"weight\": 20\r\n" + 
				"            },\r\n" + 
				"            {\r\n" + 
				"                \"start\": 1050,\r\n" + 
				"                \"end\": 1110,\r\n" + 
				"                \"length\": 45,\r\n" + 
				"                \"weight\": 50\r\n" + 
				"            }\r\n" + 
				"        ]\r\n" + 
				"    }\r\n" + 
				"}";
		
		Scheduler sc = new Scheduler(json);
		String result = sc.makeJsonSchedules();
		System.out.print(result);
	}

}
