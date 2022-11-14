package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"strconv"
	"os"
	"github.com/joho/godotenv"
)

type weatherInfo struct {
	Coord struct {
		Lon	float64 `json:"lon"`
		Lat	float64 `json:"lat"`
	} `json:"coord"`
	Weather [] struct {
		Id int `json:"id"`
		Main string `json:"main"`
		Description string `json:"description"`
		Icon string `json:"icon"`
	} `json:"weather"`
	Base string `json:"base"`
	Main struct {
		Temp float64 `json:"temp"`
		Feels_like float64 `json:"feels_like"`
		Temp_min float64 `json:"temp_min"`
		Temp_max float64 `json:"temp_max"`
		Pressure int `json:"pressure"`
		Humidity float64`json:"humidity"`
		Sea_level int `json:"sea_level"`
		Grnd_level int `json:"grnd_level"`
	} `json:"main"`
	Visibility int `json:"visibility"`
	Wind struct {
		Speed float64 `json:"speed"`
		Deg int `json:"deg"`
		Gust float64 `json:"gust"`
	} `json:"wind"`
	Clouds struct {
		cloudiness int `json:"all"`
	} `json:"clouds"`
	Rain struct {
		onehour float64 `json:"1h"`
		threehour float64 `json:"3h"`
	} `json:"rain"`
	Snow struct {
		onehour float64 `json:"1h"`
		threehour float64 `json:"3h"`
	} `json:"snow"`
	Dt string `json:"dt"`
	Sys struct {
		Type int `json:"type"`
		Id  int `json:"id"`
		Country  string `json:"country"`
		Sunrise  int `json:"sunrise"`
		Sunset  int `json:"sunset"`
	} `json:"sys"`
	Timezone int  `json:"timezone"`
	Id int `json:"id"`
	Name string `json:"name"`
	Cod int `json:"cod"`
}
const (
	Host = "localhost"
	Port = "3003"
	API_URL = "https://api.openweathermap.org/data/2.5/weather"
	API_KEY = "c7b9710a18a6fa3aa3a975cfa5f8232a"
	LOCATION_CODE = "48.8534&lon=2.3488"
)

var FULL_API_URL = fmt.Sprintf("%s?lat=%s&appid=%s", API_URL, LOCATION_CODE, API_KEY);
var ListenTo = fmt.Sprintf("%s:%s", Host, Port);
var apiData weatherInfo;

func req_api () weatherInfo {
	var FULL_API_URL = fmt.Sprintf("%s?lat=%s&appid=%s", os.Getenv("API_URL"), os.Getenv("LOCATION_CODE"), os.Getenv("API_KEY"));
	responce, err := http.Get(FULL_API_URL)
	if err != nil {
		fmt.Print(err.Error())
		os.Exit(1)
	}
	responceData, err := ioutil.ReadAll(responce.Body)
	if err != nil {
		log.Fatal(err)
	}
	var result weatherInfo
	json.Unmarshal(responceData, &result);
	return result
}

func KelvintoDegree(kelvinVal float64) float64 {
	degreeVal := 0.0;
	degreeVal = kelvinVal - 273.15;
	return degreeVal
}

func ping(c *gin.Context) {
    c.JSON(200, gin.H{
		"message": "OK",
	})
}

func toHot(c *gin.Context) {
	apiData = req_api();
	temp := KelvintoDegree(apiData.Main.Temp)

	if (temp > 20) {
		c.JSON(200, gin.H{
			"message": "To hot",
		})
	} else {
		c.JSON(400, gin.H{
			"message": "Not to hot",
		})
	}
}

func toCold(c *gin.Context) {
	apiData = req_api();
	temp := KelvintoDegree(apiData.Main.Temp)

	if (temp < 10) {
		c.JSON(200, gin.H{
			"message": "To Cold ! ",
		})
	} else {
		c.JSON(400, gin.H{
			"message": "Not to cold",
		})
	}
}

func tempusercheckmore(c *gin.Context) {
	apiData = req_api();
	strtempuser := c.Query("usr")
	tempuser, err := strconv.ParseFloat(strtempuser, 64)
	actualtemp := KelvintoDegree(apiData.Main.Temp)

	if (err != nil) {
		c.JSON(400, gin.H{
			"message": "temp must be a temperature",
		})
	} else {
		if (actualtemp > tempuser) {
			c.JSON(200, gin.H{
				"message": "It's Hotter",
			})
		} else {
			c.JSON(400, gin.H{
				"message": "It's Colder",
			})
		}
	}
}

func tempusercheckless(c *gin.Context) {
	apiData = req_api();
	strtempuser := c.Query("usr")
	tempuser, err := strconv.ParseFloat(strtempuser, 64)
	actualtemp := KelvintoDegree(apiData.Main.Temp)

	if (err != nil) {
		fmt.Printf("here")
		c.JSON(400, gin.H{
			"message": "temp must be a temperature",
		})
	} else {
		if (actualtemp < tempuser) {
			c.JSON(200, gin.H{
				"message": "It's Colder",
			})
		} else {
			c.JSON(400, gin.H{
				"message": "It's Hotter",
			})
		}
	}
}

func toWet(c *gin.Context) {
	apiData = req_api();
	hum := float64(apiData.Main.Humidity);

	if (hum > 75) {
		c.JSON(200, gin.H{
			"message": "To Wet ! ",
		})
	} else {
		c.JSON(400, gin.H{
			"message": "Not to Wet",
		})
	}
}

func toDry(c *gin.Context) {
	apiData = req_api();
	hum := float64(apiData.Main.Humidity);

	if (hum < 40) {
		c.JSON(200, gin.H{
			"message": "To Dry ! ",
		})
	} else {
		c.JSON(400, gin.H{
			"message": "Not to Dry",
		})
	}
}

func humusercheckmore(c *gin.Context) {
	apiData = req_api();
	strtempuser := c.Query("usr")
	tempuser, err := strconv.ParseFloat(strtempuser, 64)
	actualtemp := apiData.Main.Humidity

	if (err != nil) {
		c.JSON(400, gin.H{
			"message": "hum must be a percentage",
		})
	} else {
		if (actualtemp > tempuser) {
			c.JSON(200, gin.H{
				"message": "It's Wetter",
			})
		} else {
			c.JSON(400, gin.H{
				"message": "It's Dryer",
			})
		}
	}
}

func humusercheckless(c *gin.Context) {
	apiData = req_api();
	strtempuser := c.Query("usr")
	tempuser, err := strconv.ParseFloat(strtempuser, 64)
	actualtemp := apiData.Main.Humidity

	if (err != nil) {
		c.JSON(400, gin.H{
			"message": "hum must be a percentage",
		})
	} else {
		if (actualtemp < tempuser) {
			c.JSON(200, gin.H{
				"message": "It's Dryer",
			})
		} else {
			c.JSON(400, gin.H{
				"message": "It's Wetter",
			})
		}
	}
}

func below10(c *gin.Context) {
	apiData = req_api();
	actualtemp := KelvintoDegree(apiData.Main.Temp)

	if (actualtemp < 10) {
		c.JSON(200, gin.H{
			"message": "Below 10 degrees",
		})
	} else {
		c.JSON(400, gin.H{
			"message": "Not below 10 degrees",
		})
	}
	// fmt.Printf("%v\n\n", apiData)
	// fmt.Printf("Rain datas: %v\n",apiData.Rain)
	// if (apiData.Rain.onehour == 0) {
	// 	fmt.Print("No rain\n")
	// }
	// if (apiData.Snow.onehour == 0) {
	// 	fmt.Print("No snow\n")
	// }
	// fmt.Printf("Clouds datas: %v\n",apiData.Clouds)
	// fmt.Printf("Wind datas: %v\n",apiData.Wind)
	// c.JSON(200, gin.H{
	// 	"message": "Ok",
	// })
}

func below0(c *gin.Context) {
	apiData = req_api();
	actualtemp := KelvintoDegree(apiData.Main.Temp)

	if (actualtemp < 0) {
		c.JSON(200, gin.H{
			"message": "Below 0 degrees",
		})
	} else {
		c.JSON(400, gin.H{
			"message": "Not below 0 degrees",
		})
	}
}

func above20(c *gin.Context) {
	apiData = req_api();
	actualtemp := KelvintoDegree(apiData.Main.Temp)

	if (actualtemp > 20) {
		c.JSON(200, gin.H{
			"message": "Above 20 degrees",
		})
	} else {
		c.JSON(400, gin.H{
			"message": "Not above 20 degrees",
		})
	}
}

func above30(c *gin.Context) {
	apiData = req_api();
	actualtemp := KelvintoDegree(apiData.Main.Temp)

	if (actualtemp > 30) {
		c.JSON(200, gin.H{
			"message": "Above 30 degrees",
		})
	} else {
		c.JSON(400, gin.H{
			"message": "Not above 30 degrees",
		})
	}
}

func cloudy(c *gin.Context) {
	apiData = req_api();

	if (apiData.Clouds.cloudiness == 0) {
		c.JSON(400, gin.H{
			"message": "Not cloudy",
		})
	} else {
		c.JSON(200, gin.H{
			"message": "Cloudy",
		})
	}
}

func raining(c *gin.Context) {
	apiData = req_api();

	if (apiData.Rain.onehour == 0) {
		c.JSON(400, gin.H{
			"message": "Not raining",
		})
	} else {
		c.JSON(200, gin.H{
			"message": "Raining",
		})
	}
}

func snowing(c *gin.Context) {
	apiData = req_api();

	if (apiData.Snow.onehour == 0) {
		c.JSON(400, gin.H{
			"message": "Not Snowing",
		})
	} else {
		c.JSON(200, gin.H{
			"message": "Snowing",
		})
	}
}

func windy(c *gin.Context) {
	apiData = req_api();

	if (apiData.Wind.Gust * 3.6 > 12) {
		c.JSON(200, gin.H{
			"message": "Windy",
		})
	} else {
		c.JSON(400, gin.H{
			"message": "Not windy",
		})
	}
}

func main() {
	errors := godotenv.Load()
	if errors !=nil {
		log.Println(errors)
		return
	}
	fmt.Println("Server listen on port " + os.Getenv("PORT"))
	router := gin.Default()
	router.GET("/Weather/ping", ping)
	router.GET("/Weather/toHot", toHot)
	router.GET("/Weather/toCold", toCold)
	router.GET("/Weather/tempusercheckmore", tempusercheckmore)
	router.GET("/Weather/tempusercheckless", tempusercheckless)
	router.GET("/Weather/toWet", toWet)
	router.GET("/Weather/toDry", toDry)
	router.GET("/Weather/humusercheckmore", humusercheckmore)
	router.GET("/Weather/humusercheckless", humusercheckless)
	router.GET("/Weather/below10", below10)
	router.GET("/Weather/below0", below0)
	router.GET("/Weather/above20", above20)
	router.GET("/Weather/above30", above30)
	router.GET("/Weather/verycloudy", cloudy)
	router.GET("/Weather/snowing", snowing)
	router.GET("/Weather/raining", raining)
	router.GET("/Weather/windy", windy)

	err := router.Run()
	if err != nil {
	log.Println(err)
		os.Exit(1)
	}
}

