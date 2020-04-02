# abode-similar-homes-monthly-cost-neighborhood-facts

CRUD API ROUTES:

    GET:
        -app.get('/api/neighborhoods)
        Takes a neighborhood name and returns all of the data
        attatched to that neighborhood

        -app.get('/api/house)
        if a neighborhood is specified in the request, returns all of the houses for 
        that neighborhood
        else if a house id is specified in the request, returns the heartdata for that house
        else returns all of the house data

    POST:
        -app.post('/api/houses)
        takes a house object as a request and then adds the house and all of its 
        properties to the houses table

    UPDATE:
        -app.put('api/houses)
        parses houseID from request body and updates heart_filled at the house with that id

    DELETE:
        -app.delete('api/houses)
        parses houseId from request body and deletes row in houses table with that id
    
