public with sharing class AirportService {
    @AuraEnabled(cacheable=true)
    public static String searchAirports(String searchTerm) {
        // Mock result
        List<Map<String, Object>> results = new List<Map<String, Object>>();
        if (searchTerm != null && searchTerm.toLowerCase().contains('lhr')) {
            results.add(new Map<String, Object>{
                'name' => 'London Heathrow Airport',
                'iata' => 'LHR',
                'icao' => 'EGLL',
                'city' => 'London',
                'country' => 'GB'
            });
        }
        return JSON.serialize(results);
    }

    @AuraEnabled(cacheable=true)
    public static String getAirportByIATA(String iataCode) {
        return JSON.serialize(new List<Map<String, Object>>{
            new Map<String, Object>{
                'name' => 'London Heathrow Airport',
                'iata' => 'LHR',
                'icao' => 'EGLL',
                'city' => 'London',
                'country' => 'GB',
                'latitude' => 51.4706,
                'longitude' => -0.461941
            }
        });
    }
}