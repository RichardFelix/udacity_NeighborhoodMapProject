'use strict';

//////////////////////////////
//         Model            //
//////////////////////////////
var locations = [
    {
      "name": "Empire State Building",
      "lat" : 40.7194689,
      "log" : -74.0316709,
      "info": "The Empire State Building is a 102-storty skyscraper located in Midtown Manhattan, New York City, on Fifth Avenue between West 33rd and 34th Streets."
    },
    {
      "name": "Statue of Liberty",
      "lat" : 40.6892534,
      "log" : -74.0466891,
      "info": "The Empire State Building is a 102-storty skyscraper located in Midtown Manhattan, New York City, on Fifth Avenue between West 33rd and 34th Streets."
    },
    {
      "name": "Times Square",
      "lat" : 40.758899,
      "log" : -73.9873197,
      "info": "The Empire State Building is a 102-storty skyscraper located in Midtown Manhattan, New York City, on Fifth Avenue between West 33rd and 34th Streets."
    },
    {
      "name": "The Museum of Modern Art",
      "lat" : 40.7614367,
      "log" : -73.9798103,
      "info": "The Empire State Building is a 102-storty skyscraper located in Midtown Manhattan, New York City, on Fifth Avenue between West 33rd and 34th Streets."
    },
    {
      "name": "Ellis Island Immigration Museum",
      "lat" : 40.6977041,
      "log" : 74.0391417,
      "info": "The Empire State Building is a 102-storty skyscraper located in Midtown Manhattan, New York City, on Fifth Avenue between West 33rd and 34th Streets."
    },
    {
      "name": "American Museum of Natural History",
      "lat" : 40.7813281,
      "log" : 73.9761769,
      "info": "The Empire State Building is a 102-storty skyscraper located in Midtown Manhattan, New York City, on Fifth Avenue between West 33rd and 34th Streets."
    },
    {
      "name": "Metropolitan Museum of Art",
      "lat" : 40.7794406,
      "log" : -73.9654327,
      "info": "The Empire State Building is a 102-storty skyscraper located in Midtown Manhattan, New York City, on Fifth Avenue between West 33rd and 34th Streets."
    },
    {
      "name": "Grand Central Terminal",
      "lat" : 40.7527302,
      "log" : -73.9794181,
      "info": "The Empire State Building is a 102-storty skyscraper located in Midtown Manhattan, New York City, on Fifth Avenue between West 33rd and 34th Streets."
    },
    {
      "name": "Central Park",
      "lat" : 40.7828687,
      "log" : -73.9675438,
      "info": "The Empire State Building is a 102-storty skyscraper located in Midtown Manhattan, New York City, on Fifth Avenue between West 33rd and 34th Streets."
    },
    {
      "name": "Rockefeller Center",
      "lat" : 40.7587442,
      "log" : -73.9808623,
      "info": "The Empire State Building is a 102-storty skyscraper located in Midtown Manhattan, New York City, on Fifth Avenue between West 33rd and 34th Streets."
    }
]

//////////////////////////////
//     Place Object         //
//////////////////////////////
var Place = function Place(data) {
  this.name = ko.observable(data.name);
  this.lat = ko.observable(data.lat);
  this.log = ko.observable(data.log);
  this.info = ko.observable(data.info);
  this.visibleBool = ko.observable(true);
  this.visibleInfo = ko.observable(false);
};

//////////////////////////////
//       View Model         //
//////////////////////////////
var ViewModel = function ViewModel() {
  var self = this,
      locationLength = locations.length;

  // add all locations to a ko array
  self.locationList = ko.observableArray([]);
  for(var x = 0; x < locationLength; x++) {
    self.locationList.push( new Place(locations[x]) );
  }

  // show infomation on Click of li also hide infomation if clicked li that
  // is already shown.
  self.showInfo = function(name) {
    var position = self.getLocationListObject(name());

    if(self.locationList()[position].visibleInfo()){
      self.locationList()[position].visibleInfo(false);
    }else{
      self.locationList()[position].visibleInfo(true);
    }
  };

  // figure out locationList object
  self.getLocationListObject = function(name) {
    for(var x = 0; x < locationLength; x++) {
      if(self.locationList()[x].name() === name) {
        return x;
      }
    }
  };


  // filter visible list items
  self.filter = function() {
    var inputLength = self.input().length,
        inputLowerCase = self.input().toLowerCase().substring(0,inputLength);

    // first lowercase all letters in locationList array item and user input from
    // text box.  Then see if both match if so show those items.  Otherwise turn visability
    // off for that item.  And if input is empty retun all items back to list.
    for(var x = 0; x < locationLength; x++) {
      var nameLowerCase = self.locationList()[x].name(),
          nameLowerCase = nameLowerCase.toLowerCase().substring(0,inputLength);

      if(inputLowerCase === nameLowerCase && inputLowerCase !== '') {
        self.locationList()[x].visibleBool(true);

      }else if(inputLowerCase === '') {
        self.locationList()[x].visibleBool(true);

      }else{
        self.locationList()[x].visibleBool(false);
      }
    }
  };

  // text value start
  self.input = ko.observable('');
};

ko.applyBindings(new ViewModel());
