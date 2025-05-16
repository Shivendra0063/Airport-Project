import { LightningElement, track } from 'lwc';
import searchAirports from '@salesforce/apex/AirportService.searchAirports';
import getAirportByIATA from '@salesforce/apex/AirportService.getAirportByIATA';
import getAirlines from '@salesforce/apex/AirlineService.getAirlineByName';


export default class SearchAirport extends LightningElement {
    @track searchKey = '';
    @track airportResults = [];
    @track selectedAirportData = [];
    @track showDropdown = false;
    @track selectedAirportIATA = '';
    @track showAirportTable = false;
    @track showAirlineTable = false;
    @track airlineData = [];

    // Airport table columns
    columns = [
        { label: 'Name', fieldName: 'name' },
        { label: 'IATA', fieldName: 'iata' },
        { label: 'ICAO', fieldName: 'icao' },
        { label: 'City', fieldName: 'city' },
        { label: 'Country', fieldName: 'country' },
        { label: 'Latitude', fieldName: 'latitude' },
        { label: 'Longitude', fieldName: 'longitude' }
    ];

    // Airline table columns
 airlineColumns = [
    { label: 'Airline Name', fieldName: 'name' },
    { label: 'IATA', fieldName: 'iata' },
    { label: 'ICAO', fieldName: 'icao' },
    { label: 'Total Fleet', fieldName: 'totalFleet', type: 'number' },
    { label: 'Fleet Details', fieldName: 'fleetDetails' },
    {
        label: 'Logo',
        fieldName: 'logo',
        type: 'customImage',
        typeAttributes: {
            value: { fieldName: 'logo' }
        }
    }
];


    async handleInputChange(event) {
        this.searchKey = event.target.value;

        if (this.searchKey.length > 2) {
            try {
                const result = await searchAirports({ searchTerm: this.searchKey });
                this.airportResults = JSON.parse(result);
                this.showDropdown = this.airportResults.length > 0;
            } catch (error) {
                console.error('Error fetching airports:', error);
                this.airportResults = [];
                this.showDropdown = false;
            }
        } else {
            this.airportResults = [];
            this.showDropdown = false;
        }
    }

    async handleAirportSelect(event) {
        const selectedIata = event.currentTarget.dataset.iata;

        try {
            const result = await getAirportByIATA({ iataCode: selectedIata });
            this.selectedAirportData = JSON.parse(result);
            this.showAirportTable = true;
            this.showDropdown = false;
            this.selectedAirportIATA = selectedIata;
            this.showAirlineTable = false;
        } catch (error) {
            console.error('Error fetching airport details:', error);
        }
    }

   async handleClick() {
    try {
        const result = await getAirlines();
        console.log('Raw Apex result:', result); // <--- Important!

        const airlines = JSON.parse(result);
        console.log('Parsed airlines:', airlines); // <--- Important!

        this.airlineData = airlines.map(airline => {
            const fleet = airline.fleet || {};

            return {
                ...airline,
                totalFleet: fleet.total || 0,
                fleetDetails: Object.entries(fleet)
                    .filter(([key]) => key !== 'total')
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(', ') || 'No details available',
                logo:'https://api-ninjas.com/images/airline_logos/singapore_airlines.jpg'
            };
        });

          this.showAirlineTable = true;
        this.activeTab = 'airlineTab'; 
        console.log('Airline Data (Final):', this.airlineData);

        this.showAirlineTable = true;
    } catch (error) {
        console.error('Error fetching airlines:', error);
    }
}



}