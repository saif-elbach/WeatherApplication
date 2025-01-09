import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather-service.service';

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.css']
})
export class WeatherPageComponent implements OnInit {

  weekDays = [
    { date: 'Monday', temp: 25.3 },
    { date: 'Tuesday', temp: 25.4 },
    { date: 'Wednesday', temp: 24.9 },
    { date: 'Thursday', temp: 23.9 },
    { date: 'Friday', temp: 23.7 },
    { date: 'Saturday', temp: 23.5 },
    { date: 'Sunday', temp: 25.1 },
  ];

  currentPageTwo: number = 0; // Start at the first page
  itemsPerPageTwo: number = 14; // Show 14 items per page (2 lines of 7 items each)

  selectedLocation: string = '';

  isError = false;
  weather: string = '';
  minTemp: number | null = null;
  maxTemp: number | null = null;
  filteredTrends: any[] = [];


  selectedStation: any = null;
  weatherArrayLength:number = 0;
  paginatedWeatherData: any[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 3;
  maxPages: number = 0;

  currentPageDataTwo: any[] = [];
  selectedRegion: any;
  weatherData: any[] = [];
  bikes: any[] = [];
  trends: any[] = [];
  weatherTrends: any[] = [];
  weatherToBikesDistance: any[] = [];
  stationByBikeType: any[] = [];
  recommendations: any[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.fetchWeatherData();
    this.fetchWeatherTrends();
    this.fetchTrends();
   // this.getStationsByBikeType("mountain-bike-child");
   // this.fetchRecommendations();
   //this.weatherToBikeDistances("Bolzano, Überetsch and Unterland");
    this.maxPages = Math.ceil(this.weatherData.length / this.itemsPerPage) - 1;
    
  }

  fetchWeatherData() {
    
    this.weatherService.getWeatherData().subscribe(
      (data) => {
        this.weatherData = data;
        console.log("data from /api/weather:", this.weatherData);
        console.log("lets see "+ this.weatherData[5].DistrictName);
        this.weatherArrayLength= this.weatherData.length;
        this.updatePagination();
        this.maxPages = Math.ceil(this.weatherData.length / this.itemsPerPage) - 1;
      },
      (error) => {
        console.error('Error fetching from /api/weather', error);
      }
    );
    
  }

  fetchBikes() {
    this.weatherService.getBikesData().subscribe(
      (data: any[]) => {
        this.bikes = data;
        console.log("data from /api/bikes:", this.bikes);
      },
      (error: any) => {
        console.error('Error fetching bikes', error);
      }
    );
  }
  
  fetchTrends() { 
    this.fetchBikes();
    this.weatherService.getTrendsData().subscribe(
      (data: any[]) => {
        this.trends = data;
        console.log("data from /api/Trends:", this.trends);
      },
      (error: any) => {
        console.error('Error fetching Trends', error);
      }
    );
  }


  fetchWeatherTrends() {
    this.weatherService.getWeatherTrendData().subscribe(
      (data: any[]) => {
        this.weatherTrends = data;
        console.log("data from /api/weatherTrends:", this.weatherTrends);
      },
      (error: any) => {
        console.error('Error fetching weatherTrends', error);
      }
    );
  }
  
  weatherToBikeDistances(weatherStationName: string) {
    console.log("our req : " + this.selectedLocation);
    this.weatherService.getWeatherToBikeDistancedData(weatherStationName).subscribe(
      (data: any) => {
        // Make sure the response has distancesToBikeStations and assign it
        this.weatherToBikesDistance = data.distancesToBikeStations;
        console.log("data from /api/weather-to-bike-distances:", this.weatherToBikesDistance);
      },
      (error: any) => {
        console.error('Error fetching /api/weather-to-bike-distances', error);
      }
    );
  }

  getStationsByBikeType(bikeType: string) {
    console.log("Requesting bike type availability for: " + this.selectedLocation);
    this.weatherService.getBikeTypeAvailabilityData(bikeType).subscribe(
      (data: any[]) => {
        this.currentPageDataTwo = data.map(item => ({
          bikeStationName: item.stationName,
          availableBikes: item.bikeTypes[bikeType],
          municipality: item.municipality,
          distance: 'N/A' // Placeholder for distance, replace with actual value if available
        }));
        console.log("Data mapped for display:", this.currentPageDataTwo);
      },
      (error: any) => {
        console.error('Error fetching /api/bike-types/availability', error);
      }
    );
  }
  
  

/*  fetchRecommendations() {
    this.weatherService.getRecommendationData(userPreferences).subscribe(
      (data: any[]) => {
        this.recommendations = data;
        console.log("data from /api/recommendations:", this.recommendations);
      },
      (error: any) => {
        console.error('Error fetching weatherTrends', error);
      }
    );
  } */

  getWeatherIcon(weatherDesc: string): string {
    if (weatherDesc === 'Sunny') {
      return 'assets/sun (1).png';
    } else if (weatherDesc === 'Partly cloudy' || weatherDesc === 'Partly Cloudy' || weatherDesc === 'partly cloudy') {
      return 'assets/cloudy (2).png';
    }
    else if (weatherDesc === 'Very cloudy' || weatherDesc === 'Very Cloudy' || weatherDesc === 'Cloudy' || weatherDesc === 'Cloudy, sleet') {
      return 'assets/clouds.png';
    }
    else if (weatherDesc === 'Dull') {
      return 'assets/cloud.png';
    }
    else if (weatherDesc === 'Dull, sleet'  || weatherDesc === 'Dull, moderate rain' || weatherDesc === 'Cloudy, moderate rain') {
      return 'assets/rain.png';
    }
    else if (weatherDesc === 'Dull, slightly snowfall' || weatherDesc === 'Dull, moderate snowfall') {
      return 'assets/snow.png';
    }
    return 'assets/default.png'; // Fallback image
  }

  // Method to get the label for each forecast box
  getForecastLabel(index: number): string {
    if (index === 0) {
      return 'Today';
    } else if (index === 1) {
      return 'Tomorrow';
    } else if (index === 2) {
      return 'In Two Days';
    }
    return `In ${index} Days`; // Default label for any other forecasts
  }

  selectRegion(region: any) {
    this.selectedRegion = region;
  }

  updatePagination() {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedWeatherData = this.weatherData.slice(startIndex, endIndex);
    //console.log("paginated dataaa : "+JSON.stringify(this.weatherData))
  }

  previousPage() {
    console.log('Current Page:', this.currentPage);
    if (this.currentPage > 0) {
        this.currentPage--;
        this.updatePagination();
    }
  }

  nextPage() {
    console.log('Current Page:', this.currentPage, 'Max Pages:', this.maxPages);
    if (this.currentPage < this.maxPages) {
        this.currentPage++;
        this.updatePagination();
    }
  }

  onStationSelect(event: any) {
    const stationName = event.target.value;
    this.selectedStation = this.trends.find(trend => trend.stationName === stationName);
  }


  onSubmit() {
    // Create the UserPreferences object from the form data
    const userPreferences = {
      preferredWeather: this.weather,
      minTemperature: this.minTemp,
      maxTemperature: this.maxTemp
    };

    // Check if any user preferences are empty or null
    if (!userPreferences.preferredWeather || userPreferences.minTemperature === null || userPreferences.maxTemperature === null) {
      this.isError = true;
    } else {
      this.isError = false;
      
      console.log("our user : " + JSON.stringify(userPreferences));

      // Fetch recommendations based on the user's preferences
      this.weatherService.getRecommendationData(userPreferences).subscribe(
        (data: any[]) => {
          this.filteredTrends = data;
          console.log("Filtered trends:", this.filteredTrends);
          this.isError = data.length === 0; // Show error if no data returned
        },
        (error: any) => {
          this.isError = true;
          console.error('Error fetching recommendations:', error);
        }
      );
    }
}


// Get the current page data
get currentPageData(): any[] {
  const startIndex = this.currentPageTwo * this.itemsPerPageTwo;
  return this.weatherToBikesDistance.slice(startIndex, startIndex + this.itemsPerPageTwo);
}


// Move to the next page
nextPageTwo() {
  if ((this.currentPageTwo + 1) * this.itemsPerPageTwo < this.weatherToBikesDistance.length) {
    this.currentPageTwo++;
  }
}

// Move to the previous page
previousPageTwo() {
  if (this.currentPageTwo > 0) {
    this.currentPageTwo--;
  }
}
// Check if there is any data to paginate through
get hasData(): boolean {
  return this.weatherToBikesDistance.length > 0;
}
onBikeTypeChange(event: Event) {
  const selectedBikeType = (event.target as HTMLSelectElement).value;
  if (selectedBikeType) {
    this.getStationsByBikeType(selectedBikeType);
  }
}

/* map */

}
