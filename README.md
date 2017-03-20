# sphere
Back-end code for Sphere.

## To Keep Server Running on EC2 Instance
-> Start server and press ctrl+z to pause the process
-> You should see list of paused background processes now
```
$ bg %1
$ exit
```

-When a new vendor is created, they input their corresponding venue location
  -If this new vendor is the first vendor of this venue, we need to create a new venue in the db
  -Else, we need to update the venue's musicTaste to reflect the musicTaste of the new vendor
    -We also need to update the venue's musicTaste if any explorer submits a tag for the venue
  
