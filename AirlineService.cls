public class AirlineService {
    
    public class Airline {
        public String name;
        public String iata;
        public String icao;
        public String callsign;
        public String country;
    }

    @AuraEnabled(cacheable=true)
    public static List<Airline> getAirlinesByIata(String iataCode) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:API_Ninjas/v1/airlines?iata=' + EncodingUtil.urlEncode(iataCode, 'UTF-8'));
        req.setMethod('GET');
        req.setHeader('X-Api-Key', 'drMrn3iymdw/aCVIMcOBww==vMzKicIGwb0SmiMv'); 

        Http http = new Http();
        HttpResponse res = http.send(req);
        
        if (res.getStatusCode() == 200) {
            return (List<Airline>) JSON.deserialize(res.getBody(), List<Airline>.class);
        } else {
            throw new CalloutException('Failed to fetch airline data: ' + res.getStatus());
        }
    }
@AuraEnabled(cacheable=true)
public static String getAirlineByName(String airportName) {
    List<Map<String, Object>> mockAirlines = new List<Map<String, Object>>();

    Map<String, Object> fleet = new Map<String, Object>{
        'A359' => 59,
        'A388' => 17,
        'B38M' => 15,
        'B738' => 9,
        'B744' => 7,
        'B772' => 1,
        'B773' => 2,
        'B77W' => 27,
        'B78X' => 18,
        'total' => 155
    };

    Map<String, Object> airline = new Map<String, Object>{
        'name' => 'Singapore Airlines',
        'iata' => 'SQ',
        'icao' => 'SIA',
        'fleet' => fleet,
        'logo_url' => 'https://api-ninjas.com/images/airline_logos/singapore_airlines.jpg'
    };

    mockAirlines.add(airline);

    return JSON.serialize(mockAirlines);
}

}