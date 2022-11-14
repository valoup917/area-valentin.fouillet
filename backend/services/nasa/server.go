package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"github.com/joho/godotenv"
	"log"
	"os"
)


func main() {
	router := gin.Default()
	errors := godotenv.Load()
	if errors !=nil {
		log.Println(errors)
		return
	}

	router.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H {
			"message": "pong",
		})
	})

	router.Run(":9025")
}